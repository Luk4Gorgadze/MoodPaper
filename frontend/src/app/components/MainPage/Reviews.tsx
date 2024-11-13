import Image from 'next/image'

const Reviews = () => {
    return (
        <div className="my-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
                What Our Users Say
            </h2>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Review 1 */}
                <div className="flex-1 bg-gray-800/40 p-6 rounded-xl">
                    <div className="flex items-center mb-4">
                        <Image
                            src="/FeedbackProfiles/Gigaia.png"
                            alt="Gigaia's profile"
                            width={500}
                            height={500}
                            className="rounded-full object-cover w-[60px] h-[60px]"
                        />
                        <div className="ml-4">
                            <h3 className="font-bold">Gigaia</h3>
                            <div className="text-yellow-400">★★★★★</div>
                        </div>
                    </div>
                    <p className="text-gray-300">
                        "The wallpapers generated perfectly capture my mood. I love how each creation is unique and personal to me."
                    </p>
                </div>

                {/* Review 2 */}
                <div className="flex-1 bg-gray-800/40 p-6 rounded-xl">
                    <div className="flex items-center mb-4">
                        <Image
                            src="/FeedbackProfiles/Misho.png"
                            alt="Kat Pim's profile"
                            width={500}
                            height={500}
                            className="rounded-full object-cover w-[60px] h-[60px]"
                        />
                        <div className="ml-4">
                            <h3 className="font-bold">Misho</h3>
                            <div className="text-yellow-400">★★★★★</div>
                        </div>
                    </div>
                    <p className="text-gray-300">
                        "This seems like a great addition to our productivity tools. I’m excited to see how it can improve my work and mood every day."
                    </p>
                </div>

                {/* Review 3 */}
                <div className="flex-1 bg-gray-800/40 p-6 rounded-xl">
                    <div className="flex items-center mb-4">
                        <Image
                            src="/FeedbackProfiles/Bumblebe.png"
                            alt="Mike Johnson's profile"
                            width={500}
                            height={500}
                            className="rounded-full object-cover w-[60px] h-[60px]"
                        />
                        <div className="ml-4">
                            <h3 className="font-bold">Luka</h3>
                            <div className="text-yellow-400">★★★★★</div>
                        </div>
                    </div>
                    <p className="text-gray-300">
                        "The quality of the generated wallpapers is outstanding. I've never had such personalized wallpapers before!"
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Reviews