import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Provider from './Provider'
import Navbar from '@/Components/Navbar'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Provider>
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  );
}
