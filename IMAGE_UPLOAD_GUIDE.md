# Manual Image Upload Guide

Use GitHub to upload your own real photos into the repo. The website already points every listing to these local image paths.

## Folder Structure

- Places photos: `public/images/places`
- Food and restaurant photos: `public/images/food`
- Shopping and market photos: `public/images/shopping`

## Filename Rule

Each photo must be named exactly like the listing `id` in the JSON file.

Examples:

```text
public/images/places/tower-of-london.jpg
public/images/places/buckingham-palace.jpg
public/images/food/dishoom-covent-garden.jpg
public/images/food/borough-market.jpg
public/images/shopping/oxford-street.jpg
public/images/shopping/harrods.jpg
```

## How To Upload In GitHub

1. Open the GitHub repo.
2. Go to `public/images/places`, `public/images/food`, or `public/images/shopping`.
3. Click `Add file` then `Upload files`.
4. Upload the JPG photo with the exact filename.
5. Commit directly to the `main` branch.
6. Vercel will redeploy automatically.

## Image Requirements

- Use `.jpg` files.
- Recommended size: at least `1200px` wide.
- Landscape photos work best because cards crop to a 200px-high header.
- If an image is missing or fails to load, the card shows a fallback gradient.

## Where The Paths Are Set

- `data/places.json` uses `/images/places/[id].jpg`
- `data/food.json` uses `/images/food/[id].jpg`
- `data/shopping.json` uses `/images/shopping/[id].jpg`
