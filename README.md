# Apollo Solar Solutions

Marketing website for Apollo Solar Solutions — a premium solar installation company based in Belagavi, Karnataka, India.

## Tech Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 3.4
- GSAP (ScrollTrigger animations)
- Lenis (smooth scrolling)
- shadcn/ui components

## Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

Build output goes to `dist/`.

## Deployment

Hosted on **Azure Static Web Apps**. The `staticwebapp.config.json` handles SPA routing fallback and security headers.

**Azure config:**
- App location: `/`
- Output location: `dist`
- Build command: `npm run build`
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
