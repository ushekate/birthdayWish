# Romantic Interactive Birthday Website ❤️

## Folder structure

birthday-website/
├── index.html
├── style.css
├── script.js
├── images/
│   ├── photo1.jpg
│   ├── photo2.jpg
│   ├── photo3.jpg
│   ├── photo4.jpg
│   └── photo5.jpg
└── music/
    └── birthday-song.mp3

## Customize

Open `script.js` and edit:

```js
const birthdayConfig = {
  boyfriendName: "YOUR BOYFRIEND NAME",
  yourName: "YOUR NAME",
  birthdayDate: "2026-12-31T00:00:00",
  songTitle: "Our Song",
  musicFile: "music/birthday-song.mp3"
};
```

Replace the five photo files inside `images/`, keeping the same filenames, or add more objects to the `memories` array.

Replace `music/birthday-song.mp3` with your MP3 file.

You can edit the main romantic typewriter message in `typewriterText`, and edit the letter in `index.html`.

## Run

Double-click `index.html` to open it in a modern browser. No backend is required.

For local development, VS Code + Live Server is recommended but not required.

## Free deployment

You can deploy the folder to GitHub Pages, Netlify, or Vercel as a static website. The site itself does not require a server/backend.
