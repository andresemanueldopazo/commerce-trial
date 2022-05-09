//import Script from 'next/script' DOESN'T WORK!! so we use the script html tag
import * as snippet from '@segment/snippet'

export const LoadSegmentSnippet = () => {
  // segment write key we'll use for development: its "source" is localhost:3000
  const DEFAULT_WRITE_KEY = 'RmhzfIZetuIIwe25v8wRm7m45WaLhlIy'

  function segmentRenderSnippet() {
    const opts = {
      apiKey: process.env.NEXT_PUBLIC_ANALYTICS_WRITE_KEY || DEFAULT_WRITE_KEY,
      // note: the page option only covers SSR tracking.
      // Page.js is used to track other events using `window.analytics.page()`
      page: true,
    }
    if (process.env.NODE_ENV === 'development') {
      return snippet.max(opts)
    }
    return snippet.min(opts)
  }

  return (
    <script
      id="segment-script"
      dangerouslySetInnerHTML={{ __html: segmentRenderSnippet() }}
      onError={(e) => {
        console.error('Segment script failed to load: ', e)
      }}
    />
  )
}
