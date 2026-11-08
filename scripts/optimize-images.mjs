import { readdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const PHOTOS_DIR = 'public/photos'
const MAX_WIDTH = 1200
const JPEG_QUALITY = 82

const files = (await readdir(PHOTOS_DIR)).filter((file) =>
  file.toLowerCase().endsWith('.jpg'),
)

for (const file of files) {
  const input = path.join(PHOTOS_DIR, file)
  const before = (await stat(input)).size

  // Leemos a memoria antes de procesar: así libvips no deja el archivo abierto
  // y podemos sobrescribirlo sin bloquearlo en Windows.
  const inputBuffer = await readFile(input)

  // Procesamos en memoria y luego escribimos, para no leer y escribir el mismo archivo a la vez.
  const output = await sharp(inputBuffer)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toBuffer()

  await writeFile(input, output)

  const after = (await stat(input)).size
  console.log(
    `${file}: ${Math.round(before / 1024)} KB -> ${Math.round(after / 1024)} KB`,
  )
}

// Imagen de vista previa para compartir el enlace.
// Recorte centrado: los rostros quedan en la mitad de la foto.
await sharp(await readFile(path.join(PHOTOS_DIR, 'inicio.jpg')))
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
  .toFile('public/og-image.jpg')

// Icono para la pantalla de inicio del iPhone. Cuadrado, sin esquinas redondeadas:
// iOS aplica su propia máscara.
const appleTouchIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="#24172b" />
  <g transform="translate(34 30) scale(5)">
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill="#d9b8ea"
    />
  </g>
</svg>
`

await sharp(Buffer.from(appleTouchIcon))
  .resize(180, 180)
  .png()
  .toFile('public/apple-touch-icon.png')

console.log(
  'Listo: fotos optimizadas, og-image.jpg y apple-touch-icon.png generados.',
)
