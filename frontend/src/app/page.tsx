'use client'

import Link from 'next/link'
import Image from 'next/image'
import ImageCollage from './components/ImageCollage'
import Features from './components/MainPage/Features'
import Reviews from './components/MainPage/Reviews'
import { motion } from 'framer-motion'

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
      delay: 0.05 * i,
    },
  }),
}

export default function Home() {
  return (
    <main className="text-white min-h-screen">
      <div className="text-4xl font-bold my-8 mt-10">
        {"CONVERT YOUR ".split("").map((char, index) => (
          <motion.span
            key={index}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={index + 1}
          >
            {char}
          </motion.span>
        ))}
        {"MOOD".split("").map((char, index) => (
          <motion.span
            key={index + 12}
            className="bg-gradient-to-r from-accent to-blue-900 text-transparent bg-clip-text animate-gradient bg-[length:200%_100%]"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={index + 13}
          >
            {char}
          </motion.span>
        ))}
        {" INTO STUNNING WALLPAPERS".split("").map((char, index) => (
          <motion.span
            key={index + 16}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={index + 17}
          >
            {char}
          </motion.span>
        ))}
      </div>
      <div className="text-md font-semibold mt-5">
        Introducing Moodpaper, the Generative AI image tool which translates your mood and feelings into wallpapers.
      </div>
      <div className="text-md font-semibold">
        Complete a quiz to generate a wallpaper that matches your current mood.
      </div>

      <ImageCollage />
      <Features />
      <Reviews />
    </main >
  )
}
