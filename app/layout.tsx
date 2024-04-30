import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: {
    template: "% | Skrin Waktu Solat",
    default: "Skrin Waktu Solat",
  },
  description: {
    template: "% | Skrin Waktu Solat",
    default: "Skrin Waktu Solat",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content="3600" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="theme-color" content="#0C5A4B" />
      </head>
      <body
        className={`${inter.className} bg-gradient-to-t from-gray-900 to-slate-800 min-w-full min-h-screen`}
      >
        {children}
      </body>
    </html>
  )
}
