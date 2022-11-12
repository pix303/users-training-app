import Header from '../components/header'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Nextjs 13 User App</title>
        <meta name="description" content="nextjs 13 user app" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Header />
        <main className='p-6'>
          {children}
        </main>
      </body>
    </html>
  )
}
