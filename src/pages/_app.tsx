import { RecoilRoot } from 'recoil'
import { AppProps } from 'next/app'
import 'styles/index.css'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <RecoilRoot>
    <Component {...pageProps} />
  </RecoilRoot>
)

export default MyApp
