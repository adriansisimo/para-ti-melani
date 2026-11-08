# Para Melani

Página web personal, hecha con amor, para Melani. Incluye un contador con el
tiempo que llevamos juntos, una galería de fotos y cuatro cartas de graduación.

## Stack

- React 19
- Vite
- CSS puro (un archivo por componente/sección)

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

## Scripts disponibles

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Compila la versión de producción en `dist/` |
| `npm run preview` | Sirve localmente la versión compilada |
| `npm run lint` | Revisa el código con ESLint |
| `npm run optimize-images` | Optimiza las fotos de `public/photos/` y regenera `og-image.jpg` y `apple-touch-icon.png` |

## Dónde editar el contenido

- **Cartas:** `src/data/letters.js`. Cada carta tiene `title`, `teaser`,
  `paragraphs`, `closing` y la firma global `LETTER_SIGNATURE`.
- **Fotos de la galería:** `src/data/memories.js`. Los archivos van en
  `public/photos/`.
- **Datos de la relación** (fecha de inicio, nombres): `src/data/relationship.js`.
- **Estilos globales y variables de diseño:** `src/index.css`.

## Fotos

Las fotos se optimizan con `sharp` a un ancho máximo de 1200 px y calidad JPEG 82.
Si agregas o reemplazas fotos en `public/photos/`, vuelve a ejecutar:

```bash
npm run optimize-images
```

El script también genera la imagen de vista previa `public/og-image.jpg` y el
icono `public/apple-touch-icon.png`.

## Publicación

El proyecto está pensado para publicarse en Vercel:

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

Cada push a `main` actualiza el sitio automáticamente.

---

Proyecto personal. No está pensado para indexarse en buscadores
(`noindex, nofollow`).
