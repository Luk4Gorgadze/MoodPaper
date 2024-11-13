const Features = () => {
    return (
        <div className="flex flex-col md:flex-row gap-8 mb-16">
            {/* Feature 1 */}
            <div className="flex-1 bg-gray-800/40 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-accent to-blue-900 text-transparent bg-clip-text animate-gradient bg-[length:200%_100%]">
                    AI-Powered Creation
                </h3>
                <p className="text-gray-300">
                    Transform your emotions and ideas into unique wallpapers using advanced AI technology that understands your mood.
                </p>
            </div>

            {/* Feature 2 */}
            <div className="flex-1 bg-gray-800/40 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-accent to-blue-900 text-transparent bg-clip-text animate-gradient bg-[length:200%_100%]">
                    Endless Possibilities
                </h3>
                <p className="text-gray-300">
                    Generate unlimited unique designs that perfectly match your style and current emotional state.
                </p>
            </div>

            {/* Feature 3 */}
            <div className="flex-1 bg-gray-800/40 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-accent to-blue-900 text-transparent bg-clip-text animate-gradient bg-[length:200%_100%]">
                    High Resolution
                </h3>
                <p className="text-gray-300">
                    Download stunning wallpapers in high resolution, perfect for any device or screen size.
                </p>
            </div>
        </div>
    )
}

export default Features