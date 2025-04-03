import React from "react";

export default function TooltipProfile() {
    return (
        <div class="absolute z-10 left-0 bottom-full mb-2 w-64 p-3 bg-white shadow-lg rounded-md opacity-0 invisible group-hover/owner:opacity-100 group-hover/owner:visible transition-all duration-200">
            <div class="flex items-center space-x-3">
                <div class="avatar">
                    <div class="w-12 rounded-full">
                        <img
                            src="https://placehold.co/100x100"
                            alt="Profile Owner"
                        />
                    </div>
                </div>
                <div>
                    <h4 class="font-bold">John Doe</h4>
                    <p class="text-xs text-gray-500">Member since 2022</p>
                    <p class="text-sm mt-1">
                        Digital artist specializing in landscape photography
                    </p>
                </div>
            </div>
        </div>
    );
}
