import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="container mx-auto mt-5 bg-mix">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
