import { useState, useEffect } from "react";

export default function CategoryInput({
    categories = [], // Sekarang menerima array of objects {id, name, slug}
    selectedCategory = "",
    onCategoryChange,
    error = null,
}) {
    const [inputValue, setInputValue] = useState(selectedCategory);
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredCategories, setFilteredCategories] = useState(categories);

    useEffect(() => {
        setFilteredCategories(
            categories.filter((cat) =>
                cat.name.toLowerCase().includes(inputValue.toLowerCase())
            )
        );
    }, [inputValue, categories]);

    const handleSelect = (category) => {
        setInputValue(category.name);
        onCategoryChange(category.name); // Mengirim nama kategori
        setShowDropdown(false);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        setShowDropdown(value.length > 0);
        onCategoryChange(value);
    };

    return (
        <div className="form-control relative">
            <label className="label">
                <span className="label-text">Category</span>
            </label>

            <div className="relative">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                    placeholder="Type or select a category"
                    className={`input input-bordered w-full ${
                        error ? "input-error" : ""
                    }`}
                />

                {showDropdown && filteredCategories.length > 0 && (
                    <ul className="absolute z-10 mt-1 w-full bg-base-100 border border-base-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                        {filteredCategories.map((category) => (
                            <li
                                key={category.id || category.slug}
                                className="px-4 py-2 hover:bg-base-200 cursor-pointer"
                                onMouseDown={() => handleSelect(category)}
                            >
                                {category.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {error && (
                <label className="label">
                    <span className="label-text-alt text-error">{error}</span>
                </label>
            )}
        </div>
    );
}
