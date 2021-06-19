import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { RecoilRoot } from 'recoil'
import { useApollo } from 'lib/apollo'
import 'styles/index.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps)

  return (
    <RecoilRoot>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </RecoilRoot>
  )
}

export default MyApp
