# NoFold

NoFold is a single-page, browser-based narrative game built by the CCU-Taiwan iGEM team to promote the use of limonene as an eco-friendly alternative to chemical pesticides for repelling *Cnaphalocrocis medinalis* (the rice leaffolder moth).

Scientific research findings can be hard for the general public to grasp intuitively, so the team turned the core issues behind their research — the trade-offs of pesticide use, food security, and ecological cost — into a narrative game players can experience firsthand. Players live through the same rice-paddy crisis from three interconnected perspectives and personally witness the outcomes that different decisions lead to, with 20 different endings to collect.

**Play online:** https://leilong20060926.github.io/CCU-iGEM-game/

## Overview

Players choose one of three roles and experience the story from that character's point of view:

- **Cnaphalocrocis medinalis (the pest):** Decide whether to breed in a high-nitrogen, densely planted environment or a less favorable one, and whether to protect your offspring by staying hidden or venturing out to observe your surroundings. Track **Health**, **Reproduction Rate**, and **Offspring Growth** in real time.
- **Rice (the crop):** Caught between pest damage and pesticide exposure, your **Quality**, **Pest Resistance**, **Growth**, and **Pesticide Exposure** shift as the story unfolds.
- **Farmer:** Balance **Money**, **Health**, **Stress**, and **Reputation** while deciding when to rest, whether to borrow money to invest, whether to spray pesticides, or whether to adopt the team's limonene-based repellent instead.

At each choice, the screen shows which stats will rise or fall as a result. When a character's stats cross the threshold for a given ending, the story resolves into that ending. The first time any player reaches an ending, they're shown a promotional animation that explains the project's core concept before continuing on to the ending wall, where they can view their result, share it, replay, or browse other endings they've collected.

### Other features

- **Easter eggs:** unlocked once all 20 endings are collected, letting players download team-designed wallpapers.
- **Information page:** explains the damage caused by *Cnaphalocrocis medinalis*, the harms of pesticides, what the public can do, and CCU-Taiwan iGEM10's rice research records.
- **About Us page:** a brief introduction to the CCU-Taiwan team, with links to Instagram, the team website, and YouTube.
- Hand-drawn background art, background music, and a day/night mode toggle.

### Educational takeaways

- **Cnaphalocrocis medinalis perspective:** one of the most destructive pests in Asian rice ecosystems; a high-nitrogen, densely planted environment favors its reproduction, and playing as the pest pushes players past a simple "eliminating pests = justice" view toward thinking about ecosystem balance.
- **Rice perspective:** quality and yield are shaped by both pest damage and pesticide residue, and overusing pesticides can actually induce resistance in the pest — a "the more you spray, the more resistant they become" cycle. Biological alternatives like limonene offer a path to eco-friendly certification without sacrificing quality.
- **Farmer perspective:** real-time trade-offs between money, health, stress, and reputation reflect real economic pressure; long-term pesticide exposure raises cancer risk for farmers and nearby residents, and overuse can trigger complaints, resistance, and renewed pest outbreaks. Supporting organic and eco-friendly certification protects the environment along with farmers' health and long-term income.

---

## Development

Technical notes for anyone working on the codebase.

### Features

- Three playable characters, each with their own stats, choices, and endings
- Branching dialogue with a typewriter text effect
- Ending collection wall, unlockable easter egg wallpapers, and a promo animation page
- Save/resume via `localStorage`
- English / Chinese language toggle (defaults to English)
- Dark mode
- Share-card generation for unlocked endings

### Getting Started

### Play Online
No installation needed — just open:
https://leilong20060926.github.io/CCU-iGEM-game/

### Run Locally

#### Step 1: Install the required tools
You need **Git** and **Python 3**. Check whether you already have them by opening a terminal
(Windows: *Command Prompt* or *PowerShell*; macOS: *Terminal*; Linux: your terminal app) and running:

```bash
git --version
python3 --version
```

> On Windows, use `python --version` instead of `python3 --version`.

If either command shows an error, install it first:
- Git: https://git-scm.com/downloads
- Python 3: https://www.python.org/downloads/
  (Windows users: check **"Add Python to PATH"** during installation.)

#### Step 2: Download the game

**Option A — Using Git (recommended)**
```bash
git clone https://github.com/Leilong20060926/CCU-iGEM-game.git
cd game
```

**Option B — Without Git**
1. Go to https://gitlab.igem.org/2026/software/ccu-taiwan/game
2. Click the **Code** button → **Download source code** → **zip**
3. Unzip the file, then open a terminal inside the unzipped folder.

#### Step 3: Start a local server
```bash
python3 -m http.server 8000
```
> On Windows, use `python -m http.server 8000`.

You should see a message like `Serving HTTP on ... port 8000`. Keep this terminal window open while playing.

#### Step 4: Open the game
Open your browser and go to:
```
http://localhost:8000
```

#### Step 5: Stop the server
When you're done, go back to the terminal and press **Ctrl + C**.

### Troubleshooting
- **"Address already in use"** — port 8000 is taken. Use another port, e.g. `python3 -m http.server 8080`, then open `http://localhost:8080`.
- **Blank page or missing images** — make sure you ran the server command *inside* the `game` folder (the one containing `index.html`).
- **Why not just double-click `index.html`?** — browsers block some features when files are opened directly, so the game needs to be served through a local server.

### Project structure

```
index.html            Shell page: loading screen, sidebar/controls, and the loader script
pages/                 HTML fragments for each page, fetched at runtime
  page-index.html
  page-char1.html      Leaffolder moth
  page-char2.html      Rice plant
  page-char3.html      Farmer
  page-ending-anim.html
  page-star.html       Ending collection wall
  page-egg.html        Easter egg / wallpapers
  page-doc.html        Related information
  page-info.html       About us
public/
  css/                 Stylesheets, one file per feature/page area
  js/                  Game logic, one file per feature/page area
  pictures/, buttoms/, animation/, results/, menu/, video/, wallpapers/
                       Game art, UI icons, video, and audio assets (not included in this repo export — keep your existing asset folders)
```

### How index.html loads the game

`index.html` only contains the loading screen and the shared sidebar/controls. On load, an inline loader script:

1. `fetch()`es every file in `pages/` and injects it into the DOM.
2. Once all page fragments are in place, loads the files in `public/js/` **in order** (this order matters — later files depend on functions/variables defined in earlier ones).
3. Calls `initApp()` (defined in `public/js/shared-controls.js`) to start the game.

Because this relies on `fetch()`, opening `index.html` directly from disk (`file://…`) will fail due to CORS. Run a local server to test:

```bash
python3 -m http.server 8000
# or
npx serve .
```

Then visit `http://localhost:8000`.

### Deployment

The project is fully static — deploy `index.html`, `pages/`, and `public/` (kept at the same directory level) to GitHub Pages or any static host. No build step is required.

### CSS asset paths

Files under `public/css/` are one directory deeper than `index.html`, so any `url(...)` reference to game art inside a `.css` file must be written relative to `public/css/` (e.g. `../buttoms/Homepage_buttom.PNG`), not relative to `index.html`. HTML `<img src="...">` and JS-set image paths are unaffected, since those resolve relative to `index.html` regardless of which file sets them.

### Language

Default language is English, stored in `localStorage` under `gameLanguage`. Toggle in-game with the language button in the top-right controls.
