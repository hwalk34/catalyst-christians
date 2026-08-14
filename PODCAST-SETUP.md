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

**The catch: audio files can't go in this repo.** Cloudflare Pages caps files at
**25 MB**, and a 45-minute episode is 40-60 MB. Audio needs its own home.

**The fix: Cloudflare R2.** Same account we already use, and its free tier is
10 GB of storage with **zero bandwidth charges, ever**. At ~45 MB per episode
that's over 200 episodes free, and no traffic spike can ever generate a bill.

---

## Which should you pick?

|  | Option A (Spotify host) | Option B (own feed) |
|---|---|---|
| Cost | Free | Free |
| Setup effort | ~10 min | ~30 min one-time |
| Per episode | Upload, click publish | Upload MP3, paste 8 lines, push |
| Storage cap | None | 10 GB (~200 episodes) |
| Who controls it | Spotify | You, entirely |
| Can it be taken down? | Yes, by them | No |
| Analytics | Built in | Apple + Spotify dashboards only |

**About analytics:** this is a smaller difference than it looks. Even with your
own feed, Apple Podcasts Connect and Spotify for Podcasters both give you full
listener stats for your show. You mainly lose the single combined dashboard.

**Honest recommendation:** if you enjoy the building part and want to truly own
the show, **Option B**. The feed is already written, the per-episode work is
about five minutes, and nobody can take your podcast down or start charging you.
If you'd rather never think about XML again, Option A is a completely respectable
choice and you can always move later.

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

## Steps for Option B (own feed)

### 1. Set up audio storage on Cloudflare R2
In the Cloudflare dashboard: **R2** → **Create bucket** → name it
`catalyst-audio` → create. Then **Settings** → enable a **public r2.dev URL**
(or connect a subdomain like `media.catalystchristians.org` if you buy a domain).

Upload your MP3 there and copy its public link.

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
