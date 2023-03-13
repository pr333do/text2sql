import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="miscellaneous/favicon.ico" />
          <meta
            name="description"
            content="Generate your SQL query in seconds."
          />
          <meta property="og:site_name" content="text2sql.pr333do.com" />
          <meta
            property="og:description"
            content="Generate your SQL query in seconds."
          />
          <meta property="og:title" content="Text to SQL" />
          {/* <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Twitter Bio Generator" />
          <meta
            name="twitter:description"
            content="Generate your next Twitter bio in seconds."
          />
          <meta
            property="og:image"
            content="https://twitterbio.com/og-image.png"
          />
          <meta
            name="twitter:image"
            content="https://twitterbio.com/og-image.png"
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
