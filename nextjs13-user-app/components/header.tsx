'use client';
import Link from "next/link";
import Searcher from "./searcher";

export default function Header() {
    return (
        <header className="bg-black p-3 px-5 flex justify-between">
            <Link href="/"><h1 className="text-slate-400">User next app</h1></Link>
            <Searcher />
        </header>
    )
}


