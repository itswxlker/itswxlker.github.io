# Walker Heck portfolio (Poster Wall)

A plain HTML/CSS/JS site for GitHub Pages. No build step.

## Pages
- `index.html`: home. Just the interactive name and the intro.
- `work.html`: the poster wall. Each poster links to a project page.
- `project-*.html`: one page per project.
- `about.html`: bio, Write / Design / Edit, experience.
- `contact.html`: email, links.
- `404.html`: shown by GitHub Pages for missing pages.

## Before you publish
1. Search every file for `[` and replace each bracketed placeholder with your own words.
2. Replace `you@example.com` in `contact.html` (three spots: the link, the text, and `data-copy`).
3. Put your résumé at `files/resume.pdf` (no home address or phone number).
4. Put your images in `images/` and update the `src` and `alt` on each project page.
5. To change a poster color, edit the `style="background: ..."` on the poster in `work.html` and on its project page. Colors live at the top of `styles.css`.

## Preview locally
Run `python3 -m http.server 8000` in this folder, then open http://localhost:8000.
Page transitions only show when served like this, not when opening the file directly.

## Publish
Push this folder to a repo named `yourusername.github.io`, then turn on Pages in the repo settings.
