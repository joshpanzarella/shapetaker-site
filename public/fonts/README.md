Put licensed webfont files here, then wire them into `src/app/globals.css`.

Recommended formats:
- `.woff2` for production
- `.woff` only as a fallback when needed

Example:

```css
@font-face {
  font-family: "Your Display Font";
  src: url("/fonts/your-display-font.woff2") format("woff2");
  font-display: swap;
}
```
