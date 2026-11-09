# Jake's portfolio

Static frontend with Vercel serverless API routes, Discord OAuth admin access, Upstash Redis persistence, and public Discord presence via Lanyard.

## Required Vercel environment variables

- `SITE_ORIGIN`: exact production origin, e.g. `https://your-domain.example` (no trailing slash).
- `DISCORD_CLIENT_ID`: Discord OAuth application client ID.
- `DISCORD_CLIENT_SECRET`: Discord OAuth application client secret.
- `DISCORD_REDIRECT_URI`: exact callback URL `https://your-domain.example/api/auth/callback`.
- `SESSION_SECRET`: long random secret, at least 32 characters.
- `UPSTASH_REDIS_REST_URL`: Upstash Redis REST URL.
- `UPSTASH_REDIS_REST_TOKEN`: Upstash Redis REST token.

In the Discord Developer Portal, add the exact `DISCORD_REDIRECT_URI` to OAuth2 Redirects. OAuth only requests the `identify` scope. The API only grants admin access to Discord user ID `1388360587590893649`.

## Discord presence

The public status widget uses Lanyard's public API. Jake must join the Lanyard Discord community for his presence to be shared. Activity visibility also depends on Discord activity privacy settings.

## Admin

Open `/admin.html` and sign in with the authorized Discord account. Content is stored in Upstash Redis and can be edited across devices. Never put OAuth secrets or Redis tokens in frontend files.
