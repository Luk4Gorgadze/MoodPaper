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
  title: "Moodpaper - AI Wallpaper Generator Based on Your Mood",
  description: "Take a short quiz and generate a personalized wallpaper based on your mood. Create unique AI-generated wallpapers for your desktop and mobile devices that match your emotions and style.",
  keywords: [
    // Basic Terms
    "wallpaper",
    "wallpapers",
    "background",
    "backgrounds",
    "screensaver",
    "screen saver",

    // Core Features
    "AI wallpaper generator",
    "mood wallpaper",
    "personalized wallpaper",
    "emotional wallpaper",
    "custom background generator",
    "AI art generator",

    // Use Cases & Devices
    "desktop wallpaper",
    "mobile wallpaper",
    "iPhone wallpaper",
    "Android wallpaper",
    "smartphone wallpaper",
    "tablet wallpaper",
    "iPad wallpaper",
    "MacBook wallpaper",
    "Windows wallpaper",
    "laptop background",
    "computer background",
    "phone background",
    "screen background",
    "4K wallpaper",
    "HD wallpaper",
    "high resolution wallpaper",

    // Style & Aesthetics
    "aesthetic wallpaper",
    "artistic wallpaper",
    "beautiful wallpaper",
    "creative wallpaper",
    "unique wallpaper",
    "modern wallpaper",
    "minimalist wallpaper",
    "abstract wallpaper",
    "cool wallpaper",
    "trendy wallpaper",
    "stylish wallpaper",
    "custom wallpaper",
    "colorful wallpaper",
    "dark wallpaper",
    "light wallpaper",

    // Mood & Emotions
    "mood art",
    "emotional art",
    "feeling-based wallpaper",
    "mood-based design",
    "emotional design",
    "mood expression",
    "personality wallpaper",
    "happy wallpaper",
    "calm wallpaper",
    "energetic wallpaper",
    "peaceful wallpaper",
    "relaxing wallpaper",
    "motivational wallpaper",
    "inspirational wallpaper",

    // AI & Technology
    "AI generated art",
    "artificial intelligence art",
    "AI background generator",
    "machine learning art",
    "digital art generator",
    "AI design tool",
    "AI artwork",
    "automated art",
    "generative art",
    "AI creation",

    // Features & Benefits
    "custom art generator",
    "personalized art",
    "quiz-based wallpaper",
    "interactive wallpaper",
    "dynamic wallpaper",
    "mood quiz",
    "personality test wallpaper",
    "free wallpaper",
    "wallpaper maker",
    "wallpaper creator",
    "background designer",

    // Related Terms
    "mood board",
    "wall art",
    "digital artwork",
    "background maker",
    "wallpaper creator",
    "mood analyzer",
    "emotion-based design",
    "art generator",
    "background generator",
    "image generator",
    "picture generator",

    // Combinations & Variations
    "AI mood wallpaper",
    "custom mood background",
    "emotional background image",
    "personality based background",
    "AI generated background",
    "mood based screensaver",
    "emotional desktop background",
    "AI phone wallpaper",
    "personalized screen background",
    "custom mobile background",
  ],
  openGraph: {
    images: '/moodpaper.png',
    title: "Moodpaper - AI Wallpaper Generator Based on Your Mood",
    description: "Create unique AI-generated wallpapers that match your mood and personality",
    type: "website",
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
