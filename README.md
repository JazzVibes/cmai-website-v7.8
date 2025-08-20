# CMAI Karate Website

A fully static website for **CMAI Karate** built with plain HTML, CSS and vanilla JavaScript. There is no build step or package manager—copy the files to any web server (or open them directly via `file://`) and the site works.

## Project structure

```
assets/
  css/         → site stylesheet (`styles.css`)
  js/          → site script (`app.js`)
  img/         → logos and biography photos
data/          → JSON datasets for events, bios, schedule and reviews
index.html     → landing page
programs.html  → program descriptions and schedule
events.html    → upcoming events
curriculum.html→ training approach and rank overview
biographies.html → instructor bios
join.html      → contact info and trial promotion
```

## Key components

- **Styling** – `assets/css/styles.css` defines color themes (dark, light, system) and responsive layouts using flexbox and grid.
- **Scripting** – `assets/js/app.js` handles theme switching, loads JSON data (with inline fallbacks) and renders events, bios and schedules.
- **Content pages** – Each HTML file shares the same header, navigation and footer. Data is stored both in the `data/` folder and embedded inline to keep the site working without a server.

## Running locally

1. Clone the repository.
2. Open `index.html` in a browser or serve the folder with any static web server.

## Future improvements

- Use a templating system or static site generator to remove duplicated header/footer markup.
- Split the JavaScript into modules and introduce a build tool as needed.
- Explore a CMS or API to manage events and biography data in one place.
- Enhance accessibility and SEO with semantic markup and ARIA roles.

