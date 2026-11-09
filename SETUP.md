# Handover & deployment setup

This guide is for the person setting up Jake's portfolio. You need access to the GitHub repository, a Vercel project connected to it, a Discord application, and an Upstash Redis database.

## 1. Deploy the repository with Vercel

1. Sign in to [Vercel](https://vercel.com/).
2. Import the GitHub repository `whoisbrzy/jakes-site`.
3. Keep the project root as the repository root.
4. Deploy the project.
5. Copy the production domain shown by Vercel, for example `https://your-project.vercel.app`.

The website's API routes run on Vercel. Hosting it as a plain static site will not provide the Discord login or admin API.

## 2. Create/configure the Discord application

1. Open the [Discord Developer Portal](https://discord.com/developers/applications).
2. Create an application (or use the existing application intended for this site).
3. Open **OAuth2** and copy the **Client ID** and **Client Secret**.
4. Under **OAuth2 → Redirects**, add this exact URL, replacing the domain with the production Vercel domain:

   `https://YOUR-DOMAIN/api/auth/callback`

5. Save changes.

The site requests only the `identify` OAuth scope. The backend checks the Discord account ID and only grants admin access to Jake's account: `1388360587590893649`. Changing the display name or username does not change this allowlist.

## 3. Create the Upstash Redis database

1. Sign in to [Upstash](https://console.upstash.com/).
2. Create a Redis database.
3. Open its **REST API** section.
4. Copy the REST URL and REST token. Keep the token private.

The admin API stores editable site content in this database, so changes persist between visits and devices.

## 4. Add environment variables in Vercel

In Vercel, open the project → **Settings → Environment Variables**. Add the following variables for the **Production** environment (and Preview too only if you have separately configured preview OAuth URLs and matching origins).

| Name | Value |
|---|---|
| `SITE_ORIGIN` | The exact site origin, e.g. `https://your-project.vercel.app` — no trailing slash |
| `DISCORD_CLIENT_ID` | Client ID from the Discord Developer Portal |
| `DISCORD_CLIENT_SECRET` | Client Secret from the Discord Developer Portal |
| `DISCORD_REDIRECT_URI` | Exact callback URL: `https://YOUR-DOMAIN/api/auth/callback` |
| `SESSION_SECRET` | A randomly generated secret of at least 32 characters |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token |

Important:
- `SITE_ORIGIN` must match the browser's site origin exactly, including `https://`, and must not have a trailing slash.
- `DISCORD_REDIRECT_URI` must exactly match the URL saved in Discord OAuth2 Redirects.
- `SESSION_SECRET` must be private and at least 32 characters. Generate a unique random value; do not reuse a password.
- Do not paste secrets into GitHub, source files, chat messages, or screenshots.

After adding or changing environment variables, trigger a new Vercel deployment so the functions receive them.

## 5. Test the setup

1. Open `https://YOUR-DOMAIN/admin.html`.
2. Click **Continue with Discord**.
3. Sign in using the Discord account whose user ID is `1388360587590893649`.
4. Confirm the admin page loads.
5. Change a harmless field (for example the bio), save, then open the public site and confirm it updates.
6. Sign out and confirm the admin API no longer allows edits.

If login fails, check the Vercel Function Logs and confirm all seven variables are present. Also verify the callback URL matches exactly in both Vercel and Discord.

## 6. Discord status/activity widget

The public presence widget uses [Lanyard](https://lanyard.rest/), not the OAuth credentials. Jake needs to join the Lanyard Discord community and make sure Discord activity sharing/privacy settings allow the desired status and activity to be shown.

## 7. Local development (optional)

1. Copy `.env.example` to `.env.local`.
2. Fill it with development credentials and a callback URL configured for your local development origin.
3. Never commit `.env.local`.
4. Use a local Vercel-compatible development environment to run the API routes.

The `.env.example` file contains names and placeholders only; it does not contain working credentials.

## Environment variable checklist

- [ ] `SITE_ORIGIN`
- [ ] `DISCORD_CLIENT_ID`
- [ ] `DISCORD_CLIENT_SECRET`
- [ ] `DISCORD_REDIRECT_URI`
- [ ] `SESSION_SECRET`
- [ ] `UPSTASH_REDIS_REST_URL`
- [ ] `UPSTASH_REDIS_REST_TOKEN`

## Security / ownership

Anyone who can change the Vercel environment variables or deploy code to the connected repository may affect the site. Keep GitHub and Vercel access limited to trusted collaborators. Never share the Discord client secret, Redis token, or session secret in the repository.
