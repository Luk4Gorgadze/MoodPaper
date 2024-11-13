'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useEffect } from 'react'

export default function ImageCollage() {
    const images = [
        { src: '/CollageImages/Orcas.png', alt: 'Orcas' },
        { src: '/CollageImages/Sunshine.png', alt: 'Sunshine' },
        { src: '/CollageImages/PurpleDreamscape.png', alt: 'Purple Dreamscape' },
        { src: '/CollageImages/birdie.png', alt: 'Birdie' },
        { src: '/CollageImages/OceanicSerenity.png', alt: 'Oceanic Serenity' },
        { src: '/CollageImages/HouseSketch.png', alt: 'House Sketch' },
        { src: '/CollageImages/Emerald.png', alt: 'Emerald' },
        // Duplicate images to create infinite effect
        { src: '/CollageImages/Orcas.png', alt: 'Orcas' },
        { src: '/CollageImages/Sunshine.png', alt: 'Sunshine' },
        { src: '/CollageImages/PurpleDreamscape.png', alt: 'Purple Dreamscape' },
        { src: '/CollageImages/birdie.png', alt: 'Birdie' },
        { src: '/CollageImages/OceanicSerenity.png', alt: 'Oceanic Serenity' },
        { src: '/CollageImages/HouseSketch.png', alt: 'House Sketch' },
        { src: '/CollageImages/Emerald.png', alt: 'Emerald' },
    ]


    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const scrollContainer = scrollRef.current
        if (!scrollContainer) return

        let accumulator = 0
        const SCROLL_AMOUNT = 0.5

        const scroll = () => {
            accumulator += SCROLL_AMOUNT
            if (accumulator >= 1) {
                if (scrollContainer.scrollLeft >= (scrollContainer.scrollWidth * 0.75)) {
                    scrollContainer.scrollLeft = 0
                } else {
                    scrollContainer.scrollLeft += Math.floor(accumulator)
                }
                accumulator = accumulator % 1  // Keep the remainder
            }
        }

        const intervalId = setInterval(scroll, 1)
        return () => clearInterval(intervalId)
    }, [])

    return (
        <div>
            <motion.div
                ref={scrollRef}
                className="flex gap-4 mt-[50px] overflow-x-hidden cursor-grab active:cursor-grabbing"
                whileTap={{ cursor: "grabbing" }}
            >
                {images.map((image, index) => (
                    <motion.div
                        key={index}
                        className="min-w-[300px] h-[400px] flex-shrink-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            width={1792}
                            height={1024}
                            className="w-full h-full object-cover rounded-xl"
                            loading="lazy"
                        />
                    </motion.div>
                ))}
            </motion.div>

            <div className='font-semibold text-center mt-4'>
                Art created by Moodpaper
            </div>

            <div className="flex justify-center mt-12 mb-16">
                <Link
                    href="/pricing"
                    className="bg-gradient-to-r from-accent to-blue-900 text-white font-bold py-4 rounded-lg text-xl px-4 hover:opacity-80 transition-opacity relative overflow-hidden animate-gradient bg-[length:200%_100%]"
                >
                    Start creating
                </Link>
            </div>
        </div>
    )
}