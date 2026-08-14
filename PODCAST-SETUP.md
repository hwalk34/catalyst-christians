# Getting the Podcast Live (Free)

Everything here can be done for **$0**. This covers what an RSS feed actually
is, the two ways to get one, and the exact steps to reach Apple Podcasts,
Spotify, and YouTube.

---

## First: how podcasting actually works

There is no "upload to Apple" button. Every podcast app works the same way:

```
Your MP3 file  ->  lives at some web address
        +
Your RSS feed  ->  a text file listing your episodes and where the MP3s are
        |
        v
You hand the RSS feed's address to Apple, Spotify, YouTube, Amazon
        |
        v
They check that feed regularly and pull in whatever's new
```

That's the whole system. **You submit your feed's address ONE time.** After
that, every new episode you add to the feed shows up everywhere automatically.
You never resubmit.

**Apple Podcasts is free.** You submit a feed and they list your show at no
charge. (The $19.99/year Apple Podcasters Program is *only* if you want to sell
paid subscriptions. Ignore it.) Spotify and YouTube are free too.

---

## Two ways to get an RSS feed

### Option A: Let a podcast host make it for you

You upload your MP3 to a service, and it writes and updates the feed for you.

- **Spotify for Creators** (formerly Anchor) — free, unlimited uploads, no
  storage cap, no expiration. Auto-publishes to Spotify and gives you an RSS
  feed to hand to Apple. Easiest option by far.
- **Podbean** — free forever, but capped at **5 hours of audio total**, which
  fills up after roughly 6 episodes.
- **Buzzsprout** — lovely to use, but on the free plan **episodes are deleted
  after 90 days**. Fine for testing, not for a permanent archive.

Not locked in: Spotify supports a **301 redirect**, so you can move to another
host later and your existing subscribers follow you automatically.

### Option B: Build the feed yourself (we already did)

An RSS feed is just a text file. Ours is [feed.xml](feed.xml) in this repo, and
it's already written and validated. Once pushed, it lives at
`https://catalyst-christians.pages.dev/feed.xml` — that's the address you'd
hand to Apple and Spotify.

**The catch: audio files can't go in this repo, and Cloudflare is a bad home for
them.** Two separate problems, both verified:

1. **File size.** Cloudflare Pages caps files at **25 MB**. A 45-minute episode
   is 40-60 MB. It simply won't upload.
2. **Byte-range requests.** This is the important one. Podcast apps need to grab
   *pieces* of an audio file so listeners can skip ahead without downloading the
   whole episode. Apple **requires** the audio host to support this. We tested
   Cloudflare Pages directly: it ignores range requests entirely (returns the
   whole file with a 200 instead of a partial 206, and sends no
   `Accept-Ranges` header). Cloudflare R2 has long-standing community reports of
   the same trouble.

On top of that, R2's free public address (`something.r2.dev`) is **explicitly not
meant for production** — Cloudflare rate-limits it and throttles bandwidth,
returning `429 Too Many Requests` under load. Fixing that requires a paid custom
domain, so the "totally free" version of this plan isn't actually reliable.

**What this means:** serving podcast *audio* correctly is a genuinely fiddly
technical job. The feed itself is easy; the audio delivery is not. Use a real
podcast host for the audio (see Option A) even if you love the idea of owning
the feed.

---

## Which should you pick?

|  | Option A (Spotify host) | Option B (own feed) |
|---|---|---|
| Cost | Free | Free feed, but audio hosting is the problem |
| Setup effort | ~10 min | ~30 min plus troubleshooting |
| Per episode | Upload, click publish | Upload MP3, paste 8 lines, validate, push |
| Streaming/skip-ahead works | Guaranteed | Depends entirely on your audio host |
| Feed always valid XML | Guaranteed | Your responsibility every time |
| Who controls it | Spotify | You, entirely |
| Can it be taken down? | Yes, by them | No |
| Analytics | Built in | Apple + Spotify dashboards only |

**About analytics:** smaller difference than it looks. Even with your own feed,
Apple Podcasts Connect and Spotify for Podcasters both give you full listener
stats. You mainly lose the single combined dashboard.

## Recommendation: Option A, for technical reasons

**Use a real podcast host.** Not because self-hosting is beneath you, but because
the hard part isn't the feed — it's serving audio correctly. A podcast host
handles byte-range requests, HTTP HEAD, accurate file sizes, and consistent
encoding, because that's literally their whole job. Get any of those wrong and
episodes fail to scrub, stall mid-playback, or get rejected by Apple, with
error messages that tell you nothing useful.

The second reason is blast radius. A hand-edited feed means one mistyped
character takes your show offline on **every platform at once**, and you may not
notice for days.

**Option B's advantages are real but they're about ownership, not reliability:**
nobody can delete your show, no storage caps, no dependence on a company's whims.
Those matter. They're just not technical advantages.

**A sensible middle ground** if you want ownership later: get the show running on
a host first, then revisit self-hosting once you have episodes out and understand
the workflow. Moving is a solved problem (301 redirect) and your subscribers
follow automatically.

---

## Get these ready either way

1. **Show name** — "Catalyst Christians Ministries" (already in the feed)
2. **Cover art** — square image, **1400x1400 minimum, 3000x3000 ideal**,
   JPEG or PNG, RGB, **no transparency**, under 512 KB.
   Free tool: [canva.com](https://canva.com) has podcast cover templates.
   Make the text readable at thumbnail size — most people see it tiny.
3. **Show description** — 2-4 sentences (a draft is already in the feed)
4. **Category** — Religion & Spirituality > Christianity (already set)
5. **An owner email** you'll always control — Apple uses it to verify you own
   the show. **Use a personal address, not a work one.**
6. **At least one finished episode.** Apple and Spotify both reject feeds with
   no episodes.

### Recording it for free
- **Audacity** (audacity.org) — free, records and edits, works on Windows and
  Linux.
- Export as **MP3, 96-128 kbps** — plenty for two people talking, and keeps
  files small.
- Record in a small carpeted room with soft stuff around. Room echo is what
  makes audio sound amateur, more than microphone quality does.

---

## Steps for Option A (recommended) — Spotify for Creators

### Step 0: Have these ready before you start

The signup wizard asks for all of this, so gather it first:

| What | Details |
|---|---|
| Show name | Catalyst Christians Ministries |
| Description | 2-4 sentences. Draft is in `feed.xml` if you want to reuse it. |
| Creator name | Both your names, or "Catalyst Christians Ministries" |
| Category | Religion & Spirituality (subcategory: Christianity) |
| Language | English |
| Cover art | Square, **3000x3000 px** ideal (1400x1400 minimum), JPEG or PNG, RGB, **under 512 KB**, no transparency |
| Email | A personal address you'll always control, with 2FA on |
| Episode 1 | MP3, **128-192 kbps**. Required before the show goes live. |

**Cover art tip:** design it readable at *thumbnail* size — in every podcast app
it shows up about the size of a postage stamp. Big text, high contrast, few
words. [Canva](https://canva.com) has free podcast cover templates at the right
dimensions.

### Step 1: Sign up
Go to **[creators.spotify.com](https://creators.spotify.com)** and sign in with a
Spotify account. A free listener account works — you don't need Premium. If you
don't have one, create it first.

*(Old links say `podcasters.spotify.com`; that now redirects here.)*

### Step 2: Create the show
Click **"I want to start a podcast"** (or **Create a podcast**). Fill in the
name, description, creator name, category, and language from Step 0, then upload
your cover art.

### Step 3: Confirm your email
Spotify sends a verification email. Click **"Confirm your email"** in it. The
show can't go live until you do.

### Step 4: Upload episode one
From the dashboard, click **Publish an episode** → **Select a file** → choose
your MP3 (or drag it in). Add the episode title and description, then publish.

Spotify recommends mastering audio to around **-14 LUFS** — that's just a
loudness target so your show isn't noticeably quieter or louder than other
podcasts. Audacity can do this under **Effect → Volume and Compression →
Loudness Normalization**. Don't lose sleep over it for episode one.

### Step 5: Grab your RSS feed address
In the dashboard: **Settings → Availability → RSS Distribution**. Copy that URL.

This is the address every *other* platform needs. Spotify itself is already done
at this point — your show is live there automatically.

### Step 6: Submit that feed everywhere else (one time only)
See "Submit to the platforms" below for Apple, YouTube, and Amazon. You never
resubmit; they re-read the feed on their own from then on.

### Step 7: Put the player on the website
In your Spotify dashboard, find the **embed player** for the show and copy the
embed code. Paste it into the Listen section of `index.html`, replacing the
placeholder buttons.

Use the **show/multi-episode** player, not a single-episode one, so every future
episode appears on the site with no work from you.

---

## Steps for Option B (own feed) — only if you've chosen ownership over convenience

### 1. Find audio hosting that supports byte-range requests
**Do not use Cloudflare Pages or R2 for audio** (see the warnings above).
Whatever you pick, verify it with this command, replacing the URL with a real
uploaded file:

```bash
curl -sI -H "Range: bytes=0-99" https://your-host/episode-001.mp3
```

You need to see **`HTTP/… 206 Partial Content`** and an `Accept-Ranges: bytes`
header. If you get `200` and the whole file, that host will cause playback
problems and Apple may reject the feed.

### 2. Add the episode to the feed
Open [EPISODE-TEMPLATE.txt](EPISODE-TEMPLATE.txt), follow the instructions, and
paste the block into [feed.xml](feed.xml).

### 3. Validate before you publish
Paste your feed's address into **https://podba.se/validate/** or
**https://castfeedvalidator.com** and fix anything it flags.

**Do this every single time.** One typo takes the show offline everywhere at
once, and the error messages the apps give you are useless.

### 4. Push it live
Commit and push in VS Code (Source Control → message → Commit → Sync Changes).
Confirm the feed loads at `https://catalyst-christians.pages.dev/feed.xml`.

### 5. Submit to the platforms (one time only)
- **Apple:** [podcastsconnect.apple.com](https://podcastsconnect.apple.com) →
  sign in with your Apple ID (free) → **+** → **New Show** →
  **Add a show with an RSS feed** → paste the feed URL. Apple emails the owner
  address to verify. Review usually takes a few days.
- **Spotify:** [podcasters.spotify.com](https://podcasters.spotify.com) →
  **Add your podcast** → paste the same feed URL.
- **YouTube:** YouTube Studio → **Settings → Podcasts** to link an RSS feed, or
  just upload episodes as videos with a static cover image.
- **Amazon Music:** [podcasters.amazon.com](https://podcasters.amazon.com) →
  same feed URL.

### 6. Put the player on our website
Once the show is live, grab an embed player from Spotify (or Apple) and paste it
into the Listen section of `index.html`. Use the **multi-episode** player so new
episodes appear on the site automatically and you never hand-edit the site for
episodes again.

---

## Protect yourselves

- **Keep every original recording backed up** in at least two places. Your
  Linux machine is a great spot for the master files. Whatever service you use,
  never let their copy be your only copy.
- **Never change a published episode's `guid`.** It makes the episode
  re-download for everyone as if it were brand new.
- **Never change your feed's address** once submitted. If you ever must, use a
  301 redirect so subscribers follow.
- **Use a personal email** for Apple, Spotify, and Cloudflare, with two-factor
  authentication on. Losing that email can mean losing the show.
