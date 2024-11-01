import Link from 'next/link'

export default function About() {
    return (
        <div className="flex flex-col items-center justify-center mt-40 text-white mb-[400px]">
            <h1 className="text-4xl font-bold">About Us</h1>
            <p className="mt-4 text-xl">Moodpaper is a platform that allows you to generate a wallpapers based on your mood</p>
            <p className="mt-4 text-xl">process is simple, just answer the quiz and wait for the wallpaper to be generated :)</p>
        </div>
    )
}