import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header ></Header>
      <main className='p-5'>
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default MyApp
