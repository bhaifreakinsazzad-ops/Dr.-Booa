# Meet Yusra

Meet Yusra is a portfolio platform for Yusra's art and decor consulting work, built with Next.js App Router.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production checks

```bash
npm run lint
npm run build
```

## Contact form behavior

The contact page submits to `POST /api/contact`.  
Submissions are validated, rate-limited, and protected with a honeypot field.

Delivery channels:
- `CONTACT_WEBHOOK_URL` for webhook/CRM delivery.
- `RESEND_API_KEY`, `CONTACT_EMAIL_FROM`, and `CONTACT_EMAIL_TO` for email delivery via Resend.

If no delivery channel is configured, submissions still return success and are logged server-side with a warning message.

## Publish checklist

1. Set `NEXT_PUBLIC_SITE_URL` to your production domain.
2. Configure at least one contact delivery channel.
3. Run `npm run lint` and `npm run build`.
4. Deploy from `main` on Vercel.
