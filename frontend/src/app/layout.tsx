import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Container from "./components/Container";
import InteractiveBackground from "./components/InteractiveBackground";
import Footer from "./components/Footer";
import { LoadingProvider } from "./components/LoadingProvider";

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.moodpaper.art/'),
  title: "Moodpaper",
  description: "Take a short quiz and generate a wallpaper based on your mood",
  openGraph: {
    images: '/moodpaper.png',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} font-sans bg-black`}
      >
        <InteractiveBackground />
        <LoadingProvider>
          <Container>
            {children}
            <Footer />
          </Container>
        </LoadingProvider>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="817b2ed2-6948-4853-af5f-fadedc64648d"></script>
      </body>
    </html>
  );
}
