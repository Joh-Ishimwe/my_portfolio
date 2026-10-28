# Josiane Ishimwe — Portfolio

A fast, dependency-free personal site (plain HTML/CSS/JS). Inspired by karenhappuch.com: big-name hero with an "Ask Joh" chat, an auto-scrolling achievements carousel, and image-led project cards.

## Structure
```
portfolio/
├── index.html        # page skeleton (rarely edited)
├── css/style.css     # look & feel — colours are tokens at the top
├── js/data.js        # ★ ALL your content: bio, skills, projects, achievements, chat answers
├── js/main.js        # renders data.js into the page
└── assets/
    ├── images/       # profile.jpg + project screenshots
    └── Josiane_Ishimwe_CV.pdf
```
Same separation of concerns as a data pipeline: **data** (`data.js`) is kept apart from **logic** (`main.js`) and **presentation** (`style.css`).

## Edit content
Open `js/data.js` and replace every `TODO`. Add images to `assets/images/` and reference them, e.g. `image: "assets/images/weather.png"`. Projects without an image get a generated gradient cover.

## Run locally
```bash
cd portfolio
python -m http.server 8000   # then open http://localhost:8000
```

## Deploy free on GitHub Pages
```bash
git init && git add . && git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
git push -u origin main
```
Then on GitHub: **Settings → Pages → Source: Deploy from branch → main / root**. Your site goes live at `https://<your-username>.github.io`.
