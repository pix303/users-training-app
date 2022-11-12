'use client';

import Searcher from "./searcher";

export default function Header() {
    return (
        <header className="bg-black p-3 px-5 flex justify-between">
            <h1 className="text-slate-400">User next app</h1>
            <Searcher />
        </header>
    )
}


