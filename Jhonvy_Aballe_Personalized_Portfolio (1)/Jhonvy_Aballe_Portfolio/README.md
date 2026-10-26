# Jhonvy Aballe — Student Portfolio (Black & Grey)

A personalized student portfolio for **Jhonvy Aballe**, a **4th-year BSIT student at Cebu Eastern College, Inc.** This version keeps the black-and-grey design from your earlier portfolio. It uses plain HTML, CSS, and JavaScript, so you can open it with VS Code and publish it with GitHub Pages without installing Node.js.

## 1. Open it in VS Code

1. Right-click the downloaded ZIP file → **Extract All**.
2. Open **Visual Studio Code** → **File → Open Folder** → select the extracted `Jhonvy_Aballe_Portfolio` folder. Do not use **Open File** on the ZIP.
3. Click **`index.html`** in the left Explorer pane.
4. Click **Go Live** in the lower-right corner (if you have Live Server installed) or open `index.html` in your browser.
5. Your browser should show your portfolio with **JHONVY ABALLE** and the **JA** profile graphic.

### Files and their purposes

```text
Jhonvy_Aballe_Portfolio/
├── index.html                Your name, sections, descriptions, project cards, contact links
├── style.css                 Black-and-grey appearance, animation and mobile layout
├── script.js                 Interactive menu, project filters/search, details popups and email tools
├── assets/
│   ├── favicon.svg          JA tab icon
│   ├── project-web.svg      PORTFOLIO SCREENSHOT PLACEHOLDER — must replace
│   ├── project-system.svg   ECOPOINTS SCREENSHOT PLACEHOLDER — must replace
│   └── project-design.svg   EDP SCREENSHOT PLACEHOLDER — must replace
├── SUBMISSION_TEMPLATE.md
└── README.md
```

## 2. Important: Two details to confirm before you submit

I used your actual information and activities you discussed previously. However, your personal responsibilities in some projects were not fully stated. They are deliberately marked with **square brackets** in `index.html`.

In VS Code, open `index.html`, press **Ctrl + F**, and search for these exact texts:

1. `[ADD ANY TESTING TASKS YOU ACTUALLY COMPLETED.]` — EcoPoints. You were assigned the Tester role in sprint plans, and you discussed two specific ideas. Add testing work only if you actually performed it; otherwise delete the bracketed sentence entirely.
2. `[ADD WHICH PARTS YOU PERSONALLY CREATED OR MODIFIED.]` — EDP Google Sheets practice. Enter what you personally did, not what the code technically can do. You can say that it is a school activity in your public repository without claiming you coded all of it.

The **EcoPoints** project is described as research/pre-development, not as a finished or deployed product. The **EDP** activity is described as a practice page; its data features depend on the external Google Apps Script endpoint and have not been independently verified as working.

## 3. Replace the three sample screenshot graphics

Your instructor requires screenshots of your projects. **All three project cards currently contain clearly labeled placeholder artwork**, because no real project screenshots were supplied:

- Portfolio card: `assets/project-web.svg`
- EcoPoints card: `assets/project-system.svg`
- EDP Google Sheets card: `assets/project-design.svg`

To use real pictures:

1. Take a browser screenshot of **this portfolio** after personalizing it. Save it as `assets/portfolio-screenshot.png`.
2. Take an appropriate screenshot of your **EcoPoints** documentation, diagram, or prototype that your group allows you to publish. Save it as `assets/ecopoints-screenshot.png`.
3. Take a screenshot of your **EDP** activity page and save it as `assets/edp-screenshot.png`.
4. In `index.html`, replace the three `src` filenames:
   - `assets/project-web.svg` → `assets/portfolio-screenshot.png`
   - `assets/project-system.svg` → `assets/ecopoints-screenshot.png`
   - `assets/project-design.svg` → `assets/edp-screenshot.png`
5. Update each image's `alt` text to describe the actual screenshot.
6. Save (`Ctrl + S`) and refresh the browser. The project detail popups will also show the updated images.

**Do not submit invented project images or private group documents that you do not have permission to share.** If your group does not allow public screenshots of EcoPoints, replace it with another real class activity you can show.

## 4. What works on the website?

- Header links jump to **Home, About, Skills, Projects, Contact**.
- Mobile navigation opens on a phone-sized screen.
- **Quick jump** opens from the header or by pressing **Ctrl+K** (Windows) / **Cmd+K** (Mac).
- Project category buttons filter **Web, System, Practice**.
- Project **search** filters by title, description and keywords.
- Each **View project details** button opens an interactive pop-up.
- The **EDP** card has a public GitHub source link. The Contact section links to your public GitHub profile.
- **Send me an email** uses `mailto:jhonvyschooluse@gmail.com`; **Copy email** copies the same address.
- The site has subtle animation and respects reduced-motion settings.

This is a static website. The Contact section does not need a form backend, as confirmed by your instructor's guide.

## 5. Publish it free using GitHub Pages

1. Sign in to **https://github.com/** using your `jhonvyschooluse-dev` account.
2. Click **+ → New repository** and name it `portfolio`.
3. Select **Public**, optionally add a README, and click **Create repository**.
4. In the repository choose **Add file → Upload files**. Upload the **contents** of the extracted `Jhonvy_Aballe_Portfolio` folder (especially `index.html`, `style.css`, `script.js`, and `assets/`). Do **not** upload only the ZIP and do **not** nest everything in another folder.
5. Click **Commit changes**. Confirm you can see `index.html` beside `style.css` in the repository root.
6. Choose **Settings → Pages**. Under *Build and deployment*: **Deploy from a branch** → **main** → **/(root)** → **Save**.
7. When GitHub Pages is ready, the expected URL for that account/repository is `https://jhonvyschooluse-dev.github.io/portfolio/`. **Open the actual live address to confirm**, because it does not exist until you publish it.
8. Test it while signed out in a private window and on your phone, including the project pictures and links.

Saving files on your laptop does not automatically update GitHub. To publish edits, upload/commit the changed files to the same repository.

## 6. Final submission checklist

Your uploaded student guide requests:

- Your **name and class section**.
- A working **public HTTPS website link**, NOT the `127.0.0.1:5500` local preview.
- Your hosting service (**GitHub Pages**).
- A source repository URL or source ZIP.
- **One desktop screenshot and one mobile screenshot** of the published website.
- A short note on AI assistance and what you personalized.

Use `SUBMISSION_TEMPLATE.md` to organize the information. Verify every project description before handing it in.

### AI-use note you can adapt

> I used ChatGPT to assist with the initial layout, styling, interactive features, and written content of my student portfolio. I chose the black-and-grey design and supplied my own information and school activities. I used Visual Studio Code to view and customize the files, verified my project descriptions and screenshots, tested the website, and published it with GitHub Pages.

Edit the sentence about testing/publishing to match what you **actually complete**.
