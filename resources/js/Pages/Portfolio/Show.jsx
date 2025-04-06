import PortfolioViewer from "../../Components/PortfolioComponents/PortfolioViewer";

export default function Show({ portfolio, content }) {
    const contentParsed =
        typeof content === "string" ? JSON.parse(content) : content;
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">{portfolio.title}</h1>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow px-2">
                <PortfolioViewer content={contentParsed} />
            </div>
        </div>
    );
}
