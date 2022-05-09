import Document, { Head, Html, Main, NextScript } from 'next/document'
import { LoadSegmentSnippet } from '../segmentIntegration/snippet'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <LoadSegmentSnippet />
        <body className="loading">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
