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
  title: "MOODPAPER",
  description: "Generate a wallpaper based on your mood with MOODPAPER",
  icons: {
    icon: '/favicon.png',
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


      </body>
    </html>
  );
}
