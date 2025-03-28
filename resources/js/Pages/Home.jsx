import { usePage } from "@inertiajs/react";
import React from "react";

export default function Home() {
    const { auth } = usePage().props;
    console.log(auth);

    return (
        <>
            <h1 className="text-3xl text-white">Home</h1>
        </>
    );
}
