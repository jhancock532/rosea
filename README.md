# Rosea

The SCSS setup: https://www.freecodecamp.org/news/how-to-use-sass-with-css-modules-in-next-js/

## Github OAuth Login Setup

1. [Create a GitHub OAuth App](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/)
1. [Create a Cloudflare account](https://dash.cloudflare.com/)
1. Install the `wrangler` CLI and login with your account

   ```
   npm install --global @cloudflare/wrangler
   wrangler login
   ```

1. Edit the `wrangler.toml` file, change the value for `account_id` to your own ([select your account](https://dash.cloudflare.com/), then find your Account ID in the workers tab)
1. Add the following secrets to your Cloudflare worker:

   - `CLIENT_ID`, `CLIENT_SECRET`: In your GitHub (OAuth) App's settings page, find `Client ID` and `Client SECRET`

     ```
     wrangler secret put CLIENT_ID
     wrangler secret put CLIENT_SECRET
     ```

1. Add the following secret in your fork's repository settings:
   - `CF_API_TOKEN`: [Create a new token](https://dash.cloudflare.com/profile/api-tokens), use the "Edit Cloudflare Workers" template
1. Enable GitHub Pages in your repository settings, select `Source` to be the `master branch`.

That should be it. The `github-oauth-login.js` file will be deployed to Cloudflare each time there is a commit to master.

## Local Development

Please ensure you are using the node version specified in the `.nvmrc` file.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
