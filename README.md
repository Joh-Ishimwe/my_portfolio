# Josiane Ishimwe — Portfolio

Personal portfolio of a data engineer in Kigali, Rwanda. Plain HTML/CSS/JS, no build step, no dependencies. Inspired by karenhappuch.com.

**Live:** https://joh-ishimwe.github.io/my_portfolio/

## Pages
| Page | What's on it |
|---|---|
| `index.html` | Hero, "Ask Joh" avatar chat, achievements carousel, project highlights |
| `about.html` | Photo, short bio, Download CV |
| `toolbox.html` | Skills, where I've worked, education |
| `impact.html` | Quote, story, numbers, impact areas with photo carousels |

## Structure
```
my_portfolio/
├── index.html, about.html, toolbox.html, impact.html
├── css/style.css     # look & feel — colour/font tokens at the top
├── js/data.js        # ★ ALL content: profile, skills, experience, projects, chat answers, impact
├── js/layout.js      # shared menu + footer for every page
├── js/main.js        # renders data.js into whichever page is open
└── assets/
    ├── images/avatar.webp          # avatar (transparent background)
    ├── images/achievements/        # optional achievement photos
    ├── images/impact/              # optional impact photos
    └── Josiane_Ishimwe_CV.pdf      # CV for the download button
```
Content (`data.js`), logic (`main.js`, `layout.js`) and presentation (`style.css`) are kept separate, the same separation of concerns used in data pipelines.

## Edit content
Open `js/data.js`. Photos go in `assets/images/…` and are referenced by path, e.g. `image: "assets/images/achievements/aws.jpg"`.

## Run locally
```bash
python -m http.server 8000   # then open http://localhost:8000
```

## Deploy (GitHub Pages)
Push to `master`, then **Settings → Pages → Deploy from a branch → master / (root)**.
