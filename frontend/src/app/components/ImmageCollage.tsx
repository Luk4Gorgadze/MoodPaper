'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function ImageCollage() {
    return (
        <div>
            {/* Image Collage */}
            <div className="flex flex-col md:flex-row gap-4 mt-[50px] h-[500px]">
                {/* Left Section */}
                <div className="w-full md:w-1/4 h-24 md:h-auto">
                    <Image
                        src="/Swans.png"
                        alt="Left image"
                        width={1792}
                        height={1024}
                        className="w-full h-full object-cover rounded-xl hover:scale-110 transition-transform duration-200 opacity-0 animate-[scaleIn_0.8s_ease-out_0.1s_forwards]"
                        quality={100}
                        loading="lazy"
                    />
                </div>

                {/* Middle Section */}
                <div className="w-full md:w-1/2 flex flex-col">
                    <div className="h-24 md:h-1/2 pb-2">
                        <Image
                            src="/Orcas.png"
                            alt="Middle top image"
                            width={1792}
                            height={1024}
                            className="w-full h-full object-cover rounded-xl hover:scale-110 transition-transform duration-200 opacity-0 animate-[scaleIn_0.8s_ease-out_0.2s_forwards]"

                            loading="lazy"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 h-24 md:h-1/2 pt-2">
                        <div className="w-full sm:w-1/2 h-full">
                            <Image
                                src="/Woman.png"
                                alt="Middle bottom left"
                                width={1792}
                                height={1024}
                                className="w-full h-full object-cover rounded-xl hover:scale-110 transition-transform duration-200 opacity-0 animate-[scaleIn_0.8s_ease-out_0.3s_forwards]"

                                loading="lazy"
                            />
                        </div>
                        <div className="w-full sm:w-1/2 h-full">
                            <Image
                                src="/Ambition.png"
                                alt="Middle bottom right"
                                width={1792}
                                height={1024}
                                className="w-full h-full object-cover rounded-xl hover:scale-110 transition-transform duration-200 opacity-0 animate-[scaleIn_0.8s_ease-out_0.4s_forwards]"

                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-full md:w-1/4 h-24 md:h-auto">
                    <Image src="/abstract1.png" alt="Right image" width={1792} height={1024} className="w-full h-full object-cover rounded-xl hover:scale-110 transition-transform duration-200 opacity-0 animate-[scaleIn_0.8s_ease-out_0.5s_forwards]" />
                </div>
            </div>

            <div className='font-semibold text-center mt-4'>
                Art created by Moodpaper
            </div>

            <div className="flex justify-center mt-12 mb-16">
                <Link href="/generate" className="bg-accent hover:scale-110  transition-transform duration-200 text-white font-bold py-4 rounded-lg text-xl px-4 transition-colors">
                    Start creating
                </Link>
            </div>
        </div>
    )
}
