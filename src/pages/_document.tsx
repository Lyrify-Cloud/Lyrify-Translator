import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Lyrify Translator</title>
        <meta name="description" content="Lyrify Translator 聚合翻译" />
        <meta name="keywords" content="Translator, 翻译, 聚合翻译, AI翻译" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <div className="footer-script" dangerouslySetInnerHTML={{ __html: process.env.NEXT_PUBLIC_FOOTER || "" }}/>
      </body>
    </Html>
  );
}
