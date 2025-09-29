export default function Head() {
  return (
    <>
      {/* Favicons
      <link rel="icon" type="image/svg+xml" href="/logo.ico" />
      <link rel="apple-touch-icon"  href="/logo.png" /> */}

      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-DWCLLPY4G0"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-DWCLLPY4G0');
        `}
      </Script>
    </>
  );
}
