# CMAI Karate Website

A fully static website for **CMAI Karate** built with plain HTML, CSS and vanilla JavaScript. There is no build step or package manager: copy the files to any web server, or open them directly with `file://`.

## Project structure

```
assets/
  css/         → site stylesheet (`styles.css`)
  js/          → shared shell, theme, menu, data renderers, and local admin editor
  img/         → logo, homepage hero images, program banners, and biography photos
data/          → JSON datasets for events, bios, schedule and reviews
index.html     → landing page
programs.html  → program descriptions and schedule
events.html    → upcoming events
curriculum.html→ training approach and rank overview
biographies.html → instructor bios
join.html      → contact info and trial promotion
admin.html     → direct-link local editor for events and student comments
```

## Key components

- **Styling** – `assets/css/styles.css` defines the responsive design system, page sections, cards, schedule table, event timeline, reviews, and light/dark themes.
- **Scripting** – `assets/js/app.js` renders the shared header/footer shell, handles theme switching and the mobile menu, loads JSON data when served over HTTP, and falls back to built-in data when opened from disk.
- **Content pages** – Each HTML file owns only its page-specific content and uses shared shell placeholders (`#siteHeader`, `#siteFooter`) for navigation and footer consistency.
- **Visual assets** – `assets/img/hero/` contains the rotating homepage hero images. `assets/img/programs/` contains the Program Paths banner images. Biography photos live under `assets/img/bios/`.

## Program path banner sources

- `assets/img/programs/okinawan-shureimon-pre-1945.jpg` - Pre-war Shureimon gate at Shuri Castle, Naha, Okinawa, destroyed circa May 12, 1945. Source: Naha City historical archive, via Wikimedia Commons. Rights: public domain / PD-Japan-oldphoto.
- `assets/img/programs/small-circle-okazaki-1929.png` - Seishiro Henry Okazaki portrait from *Self-Defense for Girls and Women*, 1929. Source: Wikimedia Commons. Rights: public domain / US pre-1931 publication.
- `assets/img/programs/modern-arnis-remy-presas.jpg` - Remy Presas portrait, late 1970s to early 1980s. Source: Wikimedia Commons / Robert James DeMott. Rights: CC BY-SA 3.0.

## Hero image sources

- `assets/img/hero/motobu-king-1925.jpg` - Motobu Choki period illustration from *King* magazine, 1925. Source: Wikimedia Commons. Rights: public domain / PD-Japan-oldphoto.
- `assets/img/hero/motobu-kakidi-1926.jpg` - Motobu Choki performing kakidi from *Okinawa Kenpo Karatejutsu Kumite-hen*, 1926. Source: Wikimedia Commons. Rights: public domain / PD-Japan-oldphoto.
- `assets/img/hero/motobu-kumite-1926.jpg` - Motobu Choki demonstrating kumite from *Okinawa Kenpou Karate Jutsu*, 1926. Source: Wikimedia Commons. Rights: public domain / PD-Japan-oldphoto.
- `assets/img/hero/motobu-choyu-1920s.jpg` - Motobu Choyu, elder brother of Motobu Choki, 1920s. Source: Wikimedia Commons / Uehara Seikichi, *Martial Dance*. Rights: public domain / PD-Japan-oldphoto.
- `assets/img/hero/karate-shuri-castle-1938.jpg` - Karate training in front of Shuri Castle, 1938. Source: Wikimedia Commons / *A Broad View of Karatedo*. Rights: public domain / PD-Japan-oldphoto.
- `assets/img/hero/funakoshi-makiwara-1924.jpg` - Gichin Funakoshi practicing makiwara striking, 1924. Source: Wikimedia Commons / *Rentan Goshin Karate Jutsu*. Rights: public domain / PD-Japan-oldphoto.
- `assets/img/hero/funakoshi-heian-nidan-1925.png` - Gichin Funakoshi performing the second movement of Heian Nidan, 1925. Source: Wikimedia Commons / *Rentan Goshin Karate Jutsu*. Rights: public domain / PD-Japan-oldphoto.
- `assets/img/hero/gigo-funakoshi.jpg` - Yoshitaka Gigo Funakoshi demonstrating a karate stance and receiving posture. Source: Wikimedia Commons. Rights: public domain / PD-Japan-oldphoto.
- `assets/img/hero/higaonna-kanryo-1900s.jpg` - Kanryo Higaonna, Naha-te teacher and Goju-ryu lineage root. Source: Wikimedia Commons / *Masters of Karate and Sumo in Okinawa*. Rights: public domain / PD-Japan-oldphoto.
- `assets/img/hero/miyagi-chojun-1938.jpg` - Chojun Miyagi, founder of Goju-ryu, 1938. Source: Wikimedia Commons / *A Broad View of Karatedo*. Rights: public domain / PD-Japan-oldphoto.
- `assets/img/hero/miyagi-kyoda-1900s.jpg` - Chojun Miyagi and Juhatsu Kyoda together, 1900s. Source: Wikimedia Commons / *Masters of Karate and Sumo in Okinawa*. Rights: public domain / PD-Japan-oldphoto.
- `assets/img/hero/chibana-choshin-1938.jpg` - Chibana Choshin demonstrating Passai, 1938. Source: Wikimedia Commons / *A Broad View of Karatedo*. Rights: public domain / PD-Japan-oldphoto.
- `assets/img/hero/yabu-kentsu-1938.jpg` - Kentsu Yabu, 1938. Source: Wikimedia Commons / *A Broad View of Karatedo*. Rights: public domain / PD-Japan-oldphoto.
- `assets/img/hero/hanashiro-chomo-1938.jpg` - Chomo Hanashiro performing Jion kata, 1938. Source: Wikimedia Commons / *A Broad View of Karatedo*. Rights: public domain / PD-Japan-oldphoto.
- `assets/img/hero/kyan-chotoku-1938.jpg` - Kyan Chotoku, 1938. Source: Wikimedia Commons / *A Broad View of Karatedo*. Rights: public domain / PD-Japan-oldphoto.
- `assets/img/hero/mabuni-kenwa-1938.jpg` - Kenwa Mabuni, founder of Shito-ryu, 1938. Source: Wikimedia Commons / *A Broad View of Karatedo*. Rights: public domain / PD-Japan-oldphoto.
- `assets/img/hero/mabuni-suparinpei-1934.jpg` - Kenwa Mabuni demonstrating Suparinpei kata, 1934. Source: Wikimedia Commons / *The Study of Karate*. Rights: public domain / PD-Japan-oldphoto.
- `assets/img/hero/toyama-kanken-1934.jpg` - Toyama Kanken demonstrating Gojushiho kata, 1934. Source: Wikimedia Commons / *The Study of Karate*. Rights: public domain / PD-Japan-oldphoto.
- `assets/img/hero/itosu-anko-1915.jpg` - Photo considered in the source notes to show Anko Itosu. Source: Wikimedia Commons / Andreas Quast. Rights: CC BY-SA 4.0.
- `assets/img/hero/shinpan-gusakuma.gif` - Shinpan Gusukuma, also romanized Gusakuma. Source: Wikimedia Commons / Okinawan Karate and Kobudo Institute. Rights: public domain / PD-Japan-oldphoto.
- `assets/img/hero/kanga-sakugawa-toudi.jpg` - Drawn portrait of Kanga Sakugawa. Source: Wikimedia Commons / Okinawa Karate Kaikan. Rights: CC0 1.0 public domain dedication.
- `assets/img/hero/sokon-matsumura-kaikan.jpg` - Drawn portrait of Sokon Matsumura. Source: Wikimedia Commons / Okinawa Karate Kaikan. Rights: CC0 1.0 public domain dedication.
- `assets/img/hero/karate-naha-before-war.jpg` - Karate practice in Naha, Okinawa, before the war. Source: Wikimedia Commons / Naha City historical archive. Rights: public domain / PD-Japan-oldphoto.
- `assets/img/hero/jujutsu-yoshin-ryu-1911.png` - Totsuka-ha Yoshin-ryu jujutsu technique from 1911. Source: Wikimedia Commons / *Okuhi Ryu no Maki*. Rights: public domain / PD-Japan-oldphoto.
- `assets/img/hero/jujitsu-agricultural-school-1922.jpg` - Jujutsu training at a Japanese agricultural school from *The Foundations of Japan*, 1922. Source: Wikimedia Commons / Project Gutenberg. Rights: public domain / Project Gutenberg.
- `assets/img/hero/seishiro-okazaki-1929.png` - Seishiro Henry Okazaki, founder of Danzan Ryu jujutsu, from a 1929 self-defense text. Source: Wikimedia Commons / *Self-Defense for Girls and Women*. Rights: public domain.
- `assets/img/hero/kano-kotani-judo-1933.jpg` - Jigoro Kano and Sumiyuki Kotani demonstrating judo in 1933. Source: Wikimedia Commons / *Judo: 100 Years of History*. Rights: public domain / PD-Japan-oldphoto.
- `assets/img/hero/kano-mifune-before-1938.jpg` - Jigoro Kano and Kyuzo Mifune, before 1938. Source: Wikimedia Commons / Baseball Magazine Sha restoration derivative. Rights: public domain / PD-Japan-oldphoto.
- `assets/img/hero/kano-kitoryu-menjo-1883.jpg` - Jigoro Kano's Kito-ryu judo certificate, October 1883. Source: Wikimedia Commons / *Kano Jigoro Taikei*. Rights: public domain / PD-Japan-oldphoto.
- `assets/img/hero/kano-yamashita-hiki-otoshi.jpg` - Jigoro Kano and Yoshitsugu Yamashita demonstrating Hiki-otoshi from Koshiki-no-kata. Source: Wikimedia Commons / *Kano Jigoro: My Life and Judo*. Rights: public domain / PD-Japan-oldphoto.
- `assets/img/hero/yamashita-yoshiaki.jpg` - Yamashita Yoshiaki, one of the Kodokan's Four Guardians. Source: Wikimedia Commons / Kodokan holdings. Rights: public domain / PD-Japan-oldphoto.
- `assets/img/hero/tomita-tsunejiro.jpg` - Tomita Tsunejiro, one of the Kodokan's Four Guardians. Source: Wikimedia Commons / Cesare Barioli. Rights: public domain / PD-Japan-oldphoto.
- `assets/img/hero/mitsuyo-maeda-c1910.jpg` - Mitsuyo Maeda, taken circa 1910 and published in Japan in 1912. Source: Wikimedia Commons / National Diet Library source materials. Rights: public domain / PD-Japan-oldphoto.
- `assets/img/hero/maeda-fighting-poster-1905.jpg` - Mitsuyo Maeda fighting poster published in Belem do Para, Brazil, 1905. Source: Wikimedia Commons / Theatro Politheama. Rights: public domain / Public Domain Mark 1.0.
- `assets/img/hero/maeda-students-brazil.jpg` - Mitsuyo Maeda with his first students in Brazil. Source: Wikimedia Commons / transferred from English Wikipedia. Rights: public domain.
- `assets/img/hero/taro-miyake-1914.jpg` - Taro Miyake in a French newspaper photo during a 1914 Paris visit. Source: Wikimedia Commons / *La Presse*. Rights: public domain.
- `assets/img/hero/toronto-judo-tournament-1946.jpg` - Toronto Judo Tournament group portrait, April 4, 1946. Source: Wikimedia Commons / Nikkei Museum Tom Matsui collection. Rights: public domain / PD-Canada.
- `assets/img/hero/remy-presas-blancia-1968.jpg` - Richard Bustillo and Remy Presas with Grand Master Angel L. Blancia, circa 1968. Source: Wikimedia Commons. Rights: CC BY-SA 3.0 or GFDL.
- `assets/img/hero/remy-presas-portrait.jpg` - Grandmaster Remy Presas portrait, late 1970s to early 1980s. Source: Wikimedia Commons / Robert James DeMott. Rights: CC BY-SA 3.0.
- `assets/img/hero/arnis-sea-games-2005.jpg` - Philippine stamp for Arnis at the 2005 Southeast Asian Games. Source: Wikimedia Commons / Philippine Postal Corporation. Rights: public domain / Philippine government work.
- `assets/img/hero/arnis-stampsheet-2011.jpg` - Philippine Postal Corporation stamp sheet marking Arnis as a newly declared national sport, 2011. Source: Wikimedia Commons. Rights: public domain / Philippine government work.
- `assets/img/bios/jack-hogan.jpg` - Grandmaster Jack Hogan lineage portrait. Source: existing CMAI biography asset. Rights: not listed in source files; confirm before public launch.
- `assets/img/bios/wally-jay.jpg` - Professor Wally Jay lineage portrait. Source: existing CMAI biography asset. Rights: not listed in source files; confirm before public launch.
- `assets/img/bios/leon-jay.jpg` - Professor Leon Jay lineage portrait. Source: existing CMAI biography asset. Rights: not listed in source files; confirm before public launch.
- `assets/img/bios/bruce-chiu.png` - Guro Bruce Chiu lineage portrait. Source: existing CMAI biography asset. Rights: not listed in source files; confirm before public launch.
- `assets/img/hero/dojo-training.png` - Generated project concept image retained from the earlier mockup, not part of the historical lineage carousel.

## Running locally

1. Clone the repository.
2. Open `index.html` in a browser or serve the folder with any static web server.

## Local content manager

- Open `admin.html` from the local site, for example `http://127.0.0.1:8000/admin.html`.
- Edit events and student comments, then use **Save draft** to keep local work in the browser.
- Use **Use draft preview** to make the home, events, and review sections read the local draft in that browser.
- Use the download buttons to generate replacement `data/events.json` and `data/reviews.json` files for publishing.
- The admin page is direct-link only and has no server authentication; keep it for local editing unless a real CMS/login is added.

## Future improvements

- Use a templating system or static site generator to remove duplicated header/footer markup.
- Split the JavaScript into modules and introduce a build tool as needed.
- Explore a CMS or API to manage events, reviews, and biography data in one place.
- Enhance accessibility and SEO with semantic markup and ARIA roles.
