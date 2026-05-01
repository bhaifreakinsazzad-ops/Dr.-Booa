type ContactPayload = {
  subject?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
};

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const subject = asTrimmedString(body.subject);
    const email = asTrimmedString(body.email);
    const phone = asTrimmedString(body.phone);
    const message = asTrimmedString(body.message);

    if (!subject || !email || !message) {
      return Response.json(
        { error: "Subject, email, and message are required." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const submission = {
      subject,
      email,
      phone,
      message,
      submittedAt: new Date().toISOString(),
      source: "meet-yusra-contact-form",
    };

    // For now we log submissions so requests are captured in server logs immediately after deploy.
    console.log("New contact submission:", submission);

    return Response.json({ success: true }, { status: 200 });
  } catch {
    return Response.json({ error: "Invalid request payload." }, { status: 400 });
  }
}
