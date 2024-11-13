import Link from 'next/link'

export default function About() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-20 text-white">
            <div className="max-w-3xl w-full text-center">
                <div className="backdrop-blur-lg bg-white/10 rounded-xl p-6 shadow-lg">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-accent to-blue-900 text-transparent bg-clip-text animate-gradient bg-[length:200%_100%]">
                        About Us
                    </h1>
                </div>

                <div className="mt-8 space-y-6">
                    <div className="backdrop-blur-md bg-white/5 rounded-lg p-8 shadow-lg">
                        <p className="text-lg md:text-xl">
                            Moodpaper is a platform that allows you to generate wallpapers based on your mood
                        </p>

                        <p className="text-lg md:text-xl mt-6">
                            The process is simple: just answer the quiz and wait for your personalized wallpaper to be generated. Each wallpaper is uniquely crafted to match your emotional state and preferences.
                        </p>
                    </div>

                    <div className="backdrop-blur-md bg-white/5 rounded-lg p-8 shadow-lg">
                        <h2 className="text-xl md:text-2xl font-semibold mb-4 bg-gradient-to-r from-accent to-blue-900 text-transparent bg-clip-text">
                            Get in Touch
                        </h2>
                        <p className="text-lg">
                            Have questions or feedback? Reach out to us at{' '}
                            <a
                                href="mailto:info@moodpaper.art"
                                className="bg-gradient-to-r from-accent to-blue-900 text-transparent bg-clip-text hover:opacity-80 transition-opacity"
                            >
                                info@moodpaper.art
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}