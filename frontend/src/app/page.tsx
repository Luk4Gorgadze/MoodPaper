'use client'

import Link from 'next/link'
import Image from 'next/image'
import ImageCollage from './components/ImmageCollage'

export default function Home() {
  return (
    <main className="text-white min-h-screen">
      <div className="text-4xl font-bold my-8 mt-10">
        CONVERT YOUR <span className="text-accent">MOOD</span> INTO STUNNING WALLPAPERS
      </div>
      <div className="text-md font-semibold mt-5">
        Introducing Moodpaper, the Generative AI image tool which translates your mood and feelings into wallpapers.
      </div>
      <div className="text-md font-semibold">
        Complete a quiz to generate a wallpaper that matches your current mood.
      </div>

      <ImageCollage />

      {/* Feature Blocks */}
      <div className="flex flex-col md:flex-row gap-8 mb-16">
        {/* Feature 1 */}
        <div className="flex-1 bg-gray-800/40 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-3">AI-Powered Creation</h3>
          <p className="text-gray-300">
            Transform your emotions and ideas into unique wallpapers using advanced AI technology that understands your mood.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex-1 bg-gray-800/40 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-3">Endless Possibilities</h3>
          <p className="text-gray-300">
            Generate unlimited unique designs that perfectly match your style and current emotional state.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex-1 bg-gray-800/40 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-3">High Resolution</h3>
          <p className="text-gray-300">
            Download stunning wallpapers in high resolution, perfect for any device or screen size.
          </p>
        </div>
      </div>
    </main>
  )
}
