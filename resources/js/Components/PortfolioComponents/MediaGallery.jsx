// resources/js/Pages/Portfolio/components/MediaGallery.jsx
export default function MediaGallery({ media }) {
    return (
        <div className="grid grid-cols-1 gap-6">
            {media.map((item, index) => (
                <div
                    key={item.id}
                    className={`relative group rounded-xl overflow-hidden ${
                        index === 0 ? "col-span-1" : ""
                    }`}
                >
                    {item.type === "image" ? (
                        <img
                            src={`/storage/${item.path}`}
                            alt={item.caption}
                            className="w-full h-auto object-cover transition-transform group-hover:scale-105"
                        />
                    ) : (
                        <video
                            src={`/storage/${item.path}`}
                            controls
                            className="w-full"
                        />
                    )}
                    {item.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition">
                            <p className="text-white">{item.caption}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
