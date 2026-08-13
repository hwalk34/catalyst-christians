# How to Keep This Site Running (and Edit It)

This is the long-term plan for Catalyst Christians Ministries — written so either
of us can follow it without needing a developer.

**Total cost: $0 to start, or about $11/year if we want our own domain name.**

We can launch completely free on a web address like
`catalyst-christians.pages.dev` — real site, real HTTPS padlock, no expiration,
no ads. The only thing money buys is a nicer name
(`catalystchristians.org` instead of `.pages.dev`). We can add that any time
later without rebuilding anything, so **don't let the domain hold up launching.**

---

## The setup

| Piece | What we use | Cost |
|---|---|---|
| Website hosting | Cloudflare Pages | Free (unlimited traffic) |
| Storing/editing the files | GitHub | Free |
| Web address | Free `.pages.dev` subdomain | Free |
| Episode list | Our podcast host's embed player | Free / included |
| *(optional later)* Custom domain | Cloudflare Registrar | ~$10.44/yr for a .com |

**We build and own the whole thing.** We write the HTML, we own the files, we own
the repo. Cloudflare just hands our files to visitors — it's not a website
builder like Squarespace, and there's no lock-in. If we ever want to move, we
copy the folder somewhere else and we're done.

Why this combo: the domain and hosting are the same company, so connecting them
is one click instead of a DNS headache. Cloudflare's free tier has **no bandwidth
limit**, so if an episode goes viral the site won't go down or bill us.

---

## One-time setup (about 30 minutes, once)

### 1. Put the site files on GitHub
Go to **github.com** → free account → **New repository** → name it
`catalyst-christians` → keep it Public → **Create**.

On the new repo page click **uploading an existing file**, then drag in
everything from the `catalyst-christians` folder (index.html, bible.html,
donate.html, and the css and js folders). Click **Commit changes**.

Then add each other: **Settings → Collaborators → Add people**. Now we can both edit.

### 2. Connect GitHub to Cloudflare Pages
Go to **dash.cloudflare.com** → free account → **Workers & Pages → Create →
Pages → Connect to Git** → pick the `catalyst-christians` repo → **Save and Deploy**.

Leave the build settings blank/empty — our site is plain HTML, there's nothing
to build.

**Done — the site is live** at `catalyst-christians.pages.dev`, with HTTPS, on
Cloudflare's worldwide network. From now on it updates itself whenever we edit.

### 3. (Optional, later) Add our own domain name
When we're ready to spend the ~$11/yr: in Cloudflare go to **Domain
Registration**, search for `catalystchristians.org` (churches and ministries
commonly use .org), and buy it. Cloudflare sells domains at cost with no markup,
and the renewal price stays the same forever — no cheap first year that jumps to
$40. Private WHOIS (hides our home address from the public internet) is free.

Then in the Pages project: **Custom domains → Set up a domain** → type the
domain. Since it's already at Cloudflare it wires itself up, and the HTTPS
certificate renews itself forever. The old `.pages.dev` address keeps working too.

---

## How to actually edit the site (the everyday part)

Go to the repo on **github.com**, click the file you want to change (e.g.
`index.html`), click the **pencil icon**, make your edit, then click
**Commit changes** at the bottom.

That's it. Cloudflare notices the change and the live site updates in about
30 seconds. This works from a phone browser too.

**Why this instead of a fancy admin panel:** it's free, it never breaks, it keeps
a full history of every change, and it lets us undo any mistake. Admin-panel
tools (Decap/Sveltia CMS) exist, but the free login system they depended on was
discontinued and the replacement isn't ready until late 2026. If we still want
one later, we can add it without redoing any of this.

### Safety net
GitHub keeps every version forever. If an edit breaks the site, open the repo,
click **Commits**, find the last good version, and revert it. Nothing is ever
permanently lost.

---

## Episodes: don't hand-edit these

Once we pick a podcast host (Buzzsprout, Transistor, Spotify for Creators, etc.),
it generates an RSS feed and gives us an **embed player**. Grab the *multi-episode*
player embed code and paste it into the Listen section of `index.html` **one time**.

After that, every new episode we publish shows up on the website automatically.
We never touch the site again for episodes.

---

## Things to do once, so we don't lose the site

- **Turn on auto-renew** for the domain, and make sure the card on file doesn't
  expire. A lapsed domain can be bought by someone else.
- **Use an email we'll both always have access to** for the Cloudflare and GitHub
  accounts — not a school or work address.
- **Turn on two-factor authentication** on both accounts.
- Write down which email/account owns what, somewhere we can both find it.

---

## What about the Linux machine?

> ### ⚠️ The important part
> **The website does NOT depend on this machine.** It can be powered off,
> unplugged, broken, sold, or never set up at all — the public site stays up
> either way, because the site lives on Cloudflare's network, not on our
> hardware. Nothing below is required. It's an optional convenience.

**Don't use it to serve the public site** — but it's genuinely useful as our
*workshop*.

Why not for the public site: it would have to be powered on and online 24/7,
and we'd be personally responsible for security updates, HTTPS certificate
renewals, and our home internet never going down. Most home ISPs also block or
discourage web hosting. Power blip while we're at work = site is down. That's
the exact opposite of what we want.

### What it IS great for: a local preview server

Before pushing an edit live, preview it on the Linux box with one Docker command:

```bash
docker run --name catalyst-preview -d -p 8080:80 \
  -v /path/to/catalyst-christians:/usr/share/nginx/html:ro nginx
```

Replace `/path/to/catalyst-christians` with wherever the folder actually lives.
Then open **http://localhost:8080** in a browser on that machine (or
`http://<that-pc's-ip>:8080` from your phone on the same wifi — a great way to
check how the site looks on mobile).

Useful commands:

```bash
docker stop catalyst-preview     # stop it
docker start catalyst-preview    # start it again
docker rm -f catalyst-preview    # delete it entirely
```

The `:ro` means the container can only read our files, never change them. Edit a
file, refresh the browser, see the change instantly. Nothing is published until
we commit to GitHub — so it's a safe place to experiment.

Other good jobs for that machine: editing podcast audio, storing episode backups,
and keeping a backup copy of the website files.
