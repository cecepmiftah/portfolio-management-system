import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    // Hilangkan link null (previous & next)
    const filteredLinks = links.filter((link) => link.url !== null);

    return (
        <nav className="flex items-center justify-between mt-8">
            {/* <div className="hidden sm:block">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                    Showing{" "}
                    <span className="font-medium">{links[0].label}</span> to{" "}
                    <span className="font-medium">
                        {links[links.length - 1].label}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                        {links[links.length - 1].total}
                    </span>{" "}
                    results
                </p>
            </div> */}
            <div className="flex-1 flex justify-between sm:justify-end space-x-2">
                {filteredLinks.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url}
                        className={`px-4 py-2 rounded-md border text-sm font-medium 
                            ${
                                link.active
                                    ? "bg-primary border-primary text-white"
                                    : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                            }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </nav>
    );
}
