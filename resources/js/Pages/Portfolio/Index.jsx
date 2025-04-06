import Search from "@/Components/Search";
import PortfolioCard from "@/Components/PortfolioCard";

export default function index({ portfolios }) {
    return (
        <div className="max-w-full">
            <div className="">
                <div className="text-center mx-auto w-[60%] my-6 space-y-4">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                        Graphic Design
                    </h1>

                    <h2 className="text-md md:text-lg lg:text-xl">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Debitis odit, nobis quisquam accusantium eveniet
                        temporibus nisi!
                    </h2>
                </div>

                <div className="w-1/2 my-6 mx-auto">
                    <Search />
                </div>
                <div className="max-w-full my-6 mx-6 grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
                    {portfolios.map((portfolio) => (
                        <PortfolioCard
                            key={portfolio.id}
                            portfolio={portfolio}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
