import { Html, Head, Main, NextScript, DocumentProps } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        {/* Change app icon */}
        <link rel='icon' href='/zippia.png' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}