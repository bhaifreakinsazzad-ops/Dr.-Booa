type ContactPayload = {
  subject?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  website?: unknown;
};

type ContactSubmission = {
  subject: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: string;
  source: string;
  ipAddress: string;
  userAgent: string;
};

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const DEFAULT_SOURCE = "meet-yusra-contact-form";

const rateLimitStore = new Map<string, RateLimitBucket>();

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
}

function checkRateLimit(ipAddress: string) {
  const now = Date.now();
  const bucket = rateLimitStore.get(ipAddress);

  if (!bucket || now > bucket.resetAt) {
    rateLimitStore.set(ipAddress, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { ok: true, retryAfterSeconds: 0 };
  }

  if (bucket.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfterSeconds = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
    return { ok: false, retryAfterSeconds };
  }

  bucket.count += 1;
  rateLimitStore.set(ipAddress, bucket);
  return { ok: true, retryAfterSeconds: 0 };
}

async function sendToWebhook(submission: ContactSubmission) {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    return false;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submission),
  });

  if (!response.ok) {
    throw new Error("Webhook provider rejected submission.");
  }

  return true;
}

async function sendToResend(submission: ContactSubmission) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const resendTo = process.env.CONTACT_EMAIL_TO;
  const resendFrom = process.env.CONTACT_EMAIL_FROM;
  if (!resendApiKey || !resendTo || !resendFrom) {
    return false;
  }

  const textBody = [
    "New inquiry from Meet Yusra",
    "",
    `Subject: ${submission.subject}`,
    `From: ${submission.email}`,
    `Phone: ${submission.phone || "N/A"}`,
    `Submitted: ${submission.submittedAt}`,
    `IP: ${submission.ipAddress}`,
    "",
    submission.message,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: resendFrom,
      to: [resendTo],
      subject: `[Meet Yusra] ${submission.subject}`,
      reply_to: submission.email,
      text: textBody,
    }),
  });

  if (!response.ok) {
    throw new Error("Email provider rejected submission.");
  }

  return true;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const subject = asTrimmedString(body.subject);
    const email = asTrimmedString(body.email);
    const phone = asTrimmedString(body.phone);
    const message = asTrimmedString(body.message);
    const website = asTrimmedString(body.website);
    const userAgent = request.headers.get("user-agent")?.trim() || "unknown";
    const ipAddress = getClientIp(request);

    // Honeypot field: bot submissions are accepted but silently dropped.
    if (website) {
      return Response.json({ success: true, message: "Thanks for your message." }, { status: 200 });
    }

    const rateLimitResult = checkRateLimit(ipAddress);
    if (!rateLimitResult.ok) {
      return Response.json(
        {
          error: `Too many submissions. Please retry in ${rateLimitResult.retryAfterSeconds} seconds.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimitResult.retryAfterSeconds),
          },
        },
      );
    }

    if (!subject || !email || !message) {
      return Response.json(
        { error: "Subject, email, and message are required." },
        { status: 400 },
      );
    }

    if (subject.length < 3 || subject.length > 120) {
      return Response.json(
        { error: "Subject must be between 3 and 120 characters." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (email.length > 254) {
      return Response.json({ error: "Email is too long." }, { status: 400 });
    }

    if (phone.length > 40) {
      return Response.json({ error: "Phone number is too long." }, { status: 400 });
    }

    if (message.length < 10 || message.length > 4000) {
      return Response.json(
        { error: "Message must be between 10 and 4000 characters." },
        { status: 400 },
      );
    }

    const submission: ContactSubmission = {
      subject,
      email,
      phone,
      message,
      submittedAt: new Date().toISOString(),
      source: DEFAULT_SOURCE,
      ipAddress,
      userAgent,
    };

    const deliveredToWebhook = await sendToWebhook(submission);
    const deliveredToEmail = await sendToResend(submission);

    console.log("New contact submission:", submission);

    if (deliveredToWebhook || deliveredToEmail) {
      return Response.json(
        { success: true, message: "Thanks. Your inquiry was delivered successfully." },
        { status: 200 },
      );
    }

    return Response.json(
      {
        success: true,
        message:
          "Thanks. Your message was received, but automatic delivery is not configured yet. The team can still retrieve it from server logs.",
      },
      { status: 202 },
    );
  } catch {
    return Response.json({ error: "Invalid request payload." }, { status: 400 });
  }
}
