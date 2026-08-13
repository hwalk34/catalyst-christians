# Catalyst Christians Ministries — Website

A simple, fast website for the Catalyst Christians Ministries podcast. No frameworks, no build
tools — just HTML, CSS, and JavaScript, so it can be hosted anywhere for free.

## What's inside

| File | What it is |
|---|---|
| `index.html` | Home page with the Verse of the Day and podcast info |
| `bible.html` | Full Bible reader (WEB, KJV, ASV — all public domain) |
| `donate.html` | Giving page (PayPal / Venmo / Cash App buttons) |
| `css/style.css` | All the colors and styling |
| `js/verse.js` | Picks and loads the Verse of the Day |
| `js/bible.js` | Powers the Bible reader |

Scripture text comes from [bible-api.com](https://bible-api.com), a free API that
only serves **public-domain translations** — so there are no copyright problems.

## ✏️ Things YOU need to edit before going live

1. **Donation links** — open `donate.html` and search for `YOUR-USERNAME-HERE`.
   Replace with your real PayPal.me, Venmo, and Cash App links (or delete the
   cards you don't use).
2. **Podcast links** — open `index.html`, find the "Listen" section, and replace
   the `#` links with your real Spotify / Apple Podcasts / YouTube links once
   your show is live.
3. **About text** — make the "Why Catalyst?" paragraph your own.

## 🧪 Testing on your computer

Just double-click `index.html` — it opens in your browser and everything works,
including the Verse of the Day and Bible reader (they need internet access).

## 🚀 Putting it online with Netlify (free)

1. Go to **https://app.netlify.com/drop**
2. Sign in (free account)
3. Drag the whole `catalyst-christians` folder onto the page
4. Done! Netlify gives you a link like `https://something.netlify.app`
   You can change the site name (or connect a real domain like
   catalystchristians.com) in Site settings.

To update the site later: make your edits, go back to your site's "Deploys" tab
on Netlify, and drag the folder in again.

## 🐧 Hosting on your own Linux machine (later)

When you're ready to self-host, the short version is:

```bash
sudo apt install nginx
sudo cp -r catalyst-christians/* /var/www/html/
```

Then the site is served at your machine's IP address. To make it reachable from
the internet you'd also need a domain name, port forwarding on your router, and
HTTPS (free via Let's Encrypt / certbot). Netlify handles all of that for you,
which is why it's the easier place to start.
