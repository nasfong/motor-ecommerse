import type { Metadata } from "next";
import { Inter as FontSans, Koh_Santepheap } from "next/font/google";
import { cn } from "@/lib/utils";
import NextTopLoader from 'nextjs-toploader'
import Navbar from "@/components/Navbar";
import { GlobalProvider } from "@/lib/context";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Provider from "@/lib/provider";
import Head from "next/head";
import "./globals.css";

const fontSans = FontSans({
  // subsets: ["khmer"],
  // weight: "400",
  subsets: ["latin"],
  variable: "--font-sans",
})
const fontKhmer = Koh_Santepheap({
  subsets: ["khmer", "latin"],
  weight: "400",
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "",
  description: "",
};


export default async function RootLayout({
  children,
  params: {
    locale
  }
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: string
  }
}>) {
  const messages = await getMessages()
  return (
    <html lang={locale} suppressHydrationWarning>
      <Head>
        {/* Title */}
        <title>Kyhan Motor Shop | Premium Motorcycles and Accessories</title>

        {/* Meta tags */}
        <meta name="description" content="Explore our incredible range of motor products at Kyhan Motor Shop." />
        <meta name="keywords" content="Motorcycles, motorbike accessories, premium bikes, motorcycle parts, Kyhan Motor, motor shop, best motorcycles" />
        <meta name="author" content="Kyhan Motor Shop Team" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph (for social media sharing) */}
        <meta property="og:title" content="Discover Top Motor Products | Kyhan Motor Shop" />
        <meta property="og:description" content="Shop the latest and greatest motor products at Kyhan Motor Shop. Quality and performance guaranteed!" />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:url" content="https://www.kyhanmotorshop.store/" />
        <meta property="og:type" content="website" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body
        className={cn(
          "min-h-screen  font-sans antialiased",
          locale === 'en' ? fontSans.variable : fontKhmer.variable
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <GlobalProvider>
            <Provider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar locale={locale} />
              <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <NextTopLoader
                  color="#2299DD"
                  initialPosition={0.08}
                  crawlSpeed={200}
                  height={3}
                  crawl={true}
                  showSpinner={false}
                  easing="ease"
                  speed={200}
                  shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                />
                {children}
              </div>
            </Provider>
          </GlobalProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
