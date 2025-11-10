import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'JavaScript Playground',
  description: 'Escribe, ejecuta y aprende JavaScript en tiempo real',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
