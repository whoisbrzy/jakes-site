# Jake's portfolio

A static portfolio with Vercel serverless API routes, Discord OAuth admin access, Upstash Redis persistence, and public Discord presence via Lanyard.

## Setup

See **[SETUP.md](./SETUP.md)** for the complete handover guide. It explains the required accounts, Discord OAuth configuration, Upstash Redis setup, Vercel deployment, and environment variables.

Copy `.env.example` as a reference for the variable names. Never commit real credentials.

## Admin access

Open `/admin.html` and sign in with Discord. Only this Discord user ID is authorized:

`1388360587590893649`

The admin panel can update the public bio, GitHub URL, projects, stack, setup, and music/activity text. Updates are stored in Upstash Redis.

## Discord presence

The public status/activity widget uses Lanyard's public API; it does not require an environment variable. Jake needs to join the Lanyard Discord community and enable the relevant Discord activity privacy settings for presence/activity to be visible.

## Security notes

- Keep `DISCORD_CLIENT_SECRET`, `UPSTASH_REDIS_REST_TOKEN`, and `SESSION_SECRET` private.
- Add secrets only in Vercel Project Settings → Environment Variables (or a local, ignored `.env.local` file).
- Do not put secrets in HTML, JavaScript served to the browser, screenshots, or commits.
- If a secret is ever exposed, rotate it in the provider dashboard.
