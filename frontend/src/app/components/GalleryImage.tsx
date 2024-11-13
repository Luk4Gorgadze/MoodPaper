'use client'
import { GalleryImageProps } from '@/app/utils/types'


const ImageOverlay = ({ title, author, imageUrl, dimensions, description }: {
    title: string;
    author: string;
    imageUrl: string;
    dimensions?: string;
    description?: string;
}) => (
    <>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            {description && <p className="text-sm text-white/90 mt-1 mb-2">{description}</p>}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <AuthorInfo author={author} />
                    {dimensions && <span className="text-sm text-white/70">{dimensions}</span>}
                </div>
                <button
                    onClick={async (e) => {
                        e.preventDefault();
                        try {
                            // Fetch the image as a blob
                            const response = await fetch(imageUrl);
                            const blob = await response.blob();

                            // Create a URL for the blob
                            const url = window.URL.createObjectURL(blob);

                            // Create and trigger download link
                            const link = document.createElement('a');
                            link.href = url;
                            link.download = `${title}.jpg`;
                            link.style.display = 'none';
                            document.body.appendChild(link);
                            link.click();

                            // Cleanup
                            document.body.removeChild(link);
                            window.URL.revokeObjectURL(url);
                        } catch (error) {
                            console.error('Download failed:', error);
                        }
                    }}
                    className="text-white bg-black/30 hover:bg-black/50 p-2 rounded-full transition-colors duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                </button>
            </div>
        </div>
    </>
);

const AuthorInfo = ({ author }: { author: string }) => (
    <div className="bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-3">
            <div className="flex flex-col">
                <span className="text-sm font-medium text-white">{author}</span>
            </div>
        </div>
    </div>
);

export default function GalleryImage({
    imageUrl,
    title,
    author,
    dimensions,
    description
}: GalleryImageProps) {
    return (
        <div className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
            <div className={`relative 'aspect-video'`}>
                <img
                    src={imageUrl}
                    alt={title}
                    className="h-full w-full object-cover object-center scale-110"
                />
                <ImageOverlay
                    title={title}
                    author={author}
                    imageUrl={imageUrl}
                    dimensions={dimensions}
                    description={description}
                />
            </div>
        </div>
    )
}
