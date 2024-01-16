import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Head from "next/head";
import Header from "~/components/Header";
import NextNProgress from "nextjs-progressbar";

import { Poppins, Playfair_Display } from "next/font/google";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <meta
          name="keywords"
          content="norwegian forest cat, norwegian forest cats, migotos, eva dahl eide, norway, oslo, cat breeding company, norwegian forest cat breeding, norwegian forest cat breeder, norwegian cat, norwegian cats, norwegian cat breeding, norwegian cat breeder, norwegian cat breeding company, norwegian cat breeding company, norwegian cat breeder company"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:locale" content="en_US" />
        <meta charSet="utf-8" />
        <link
          rel="icon"
          href="/static/icons/cropped-socialicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="/static/icons/cropped-socialicon-192x192.png"
          sizes="192x192"
        />
        <link
          rel="apple-touch-icon"
          href="/static/icons/cropped-socialicon-180x180.png"
        />
        <meta
          name="msapplication-TileImage"
          content="/static/icons/cropped-socialicon-270x270.png"
        />

        <link
          rel="icon"
          href="/static/icons/browser-150x150.png"
          sizes="150x150"
        />
        <link
          rel="icon"
          href="/static/icons/browser-300x300.png"
          sizes="300x300"
        />
        <link
          rel="icon"
          href="/static/icons/browser-480x480.png"
          sizes="480x480"
        />
        <link rel="icon" href="/static/icons/browser.png" />

        <link
          rel="icon"
          href="/static/icons/cropped-socialicon-150x150.png"
          sizes="150x150"
        />
        <link
          rel="icon"
          href="/static/icons/cropped-socialicon-480x480.png"
          sizes="480x480"
        />
        <link
          rel="icon"
          href="/static/icons/cropped-socialicon-512x400.png"
          sizes="512x400"
        />
        <link rel="icon" href="/static/icons/cropped-socialicon.png" />

        <link
          rel="icon"
          href="/static/icons/socialicon-150x150.png"
          sizes="150x150"
        />
        <link
          rel="icon"
          href="/static/icons/socialicon-300x300.png"
          sizes="300x300"
        />
        <link
          rel="icon"
          href="/static/icons/socialicon-480x480.png"
          sizes="480x480"
        />
        <link
          rel="icon"
          href="/static/icons/socialicon-512x400.png"
          sizes="512x400"
        />
        <link rel="icon" href="/static/icons/socialicon.png" />
      </Head>
      <Script
        async
        id="tag-manager"
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-H8G1WHLBW8"
      />
      <Script async strategy="afterInteractive" id="analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-H8G1WHLBW8');
        `}
      </Script>
      <div
        className={`flex flex-col ${poppins.className} ${playfair.variable}`}
      >
        <Header>
          <NextNProgress options={{ showSpinner: false }} />
          <Component {...pageProps} />
        </Header>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
