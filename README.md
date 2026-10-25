# womenofwayland.com

Static archive of the Women of Wayland podcast site, built with [Eleventy](https://www.11ty.dev/). It replaces the old WordPress site and keeps the same URLs.

## Develop

```sh
npm install
npm start        # http://localhost:8080
npm run build    # outputs to _site/
```

## Layout

- `src/index.njk`, `about-the-show.njk`, `about-us.njk`, `all-seasons.njk`, `sponsors.njk`: pages
- `src/season.njk`: generates `/season-1/` … `/season-5/` from `src/_data/seasons.json`
- `src/episodes/*.html`: one file per episode (front matter + show notes with the Spotify embed), served at `/<slug>/`
- `src/_includes/`: shared layout, episode layout, and the "listen" call-to-action band
- `src/_data/site.json`: navigation and podcast platform links
- `src/assets/`: CSS and images

## Deploy

`_site/` is plain static files, so any static host works (Netlify, Cloudflare Pages, GitHub Pages, S3). Build command `npm run build`, output directory `_site`.

### GitHub Pages

`.github/workflows/deploy.yml` builds and deploys on every push to `main` (repo Settings → Pages → Source must be "GitHub Actions"). The workflow passes the Pages base path to Eleventy as `PATH_PREFIX`, so the site works both at `https://minglethepringle.github.io/womenofwayland.com/` and, once a custom domain is set in Settings → Pages, at the domain root.
