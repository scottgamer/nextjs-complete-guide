import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  // default html structure for overriding
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          {/* allows to have external react elements aside from the root */}
          <div id="overlays"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
