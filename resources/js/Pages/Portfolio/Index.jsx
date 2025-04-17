import Search from "@/Components/Search";
import PortfolioCard from "@/Components/PortfolioCard";
import Pagination from "../../Components/Pagination";
import { motion } from "framer-motion";

export default function index({ portfolios, filters, categories }) {
    return (
        <div className="max-w-full mt-4">
            <div className="mx-auto">
                <div className="text-center mx-auto w-[60%] my-6 space-y-4">
                    <motion.h1
                        className="text-2xl md:text-3xl lg:text-4xl font-bold"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {"Explore the World of Portfolios"}
                    </motion.h1>

                    <motion.h2
                        className="text-md md:text-lg lg:text-xl text-gray-600 dark:text-gray-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Discover amazing creative works from talented
                        individuals around the world.
                    </motion.h2>
                </div>

                <motion.div
                    className="w-full md:w-1/2 my-6 mx-auto px-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Search
                        initialSearch={filters.search}
                        initialCategory={filters.category}
                        categories={categories}
                    />
                </motion.div>
                <div className="max-w-full my-6 mx-6 grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
                    {portfolios.data.map((portfolio) => (
                        <PortfolioCard
                            key={portfolio.id}
                            portfolio={portfolio}
                        />
                    ))}
                </div>

                <div className="my-6 mx-6 flex justify-center">
                    <Pagination links={portfolios.links} />
                </div>
            </div>
        </div>
    );
}
