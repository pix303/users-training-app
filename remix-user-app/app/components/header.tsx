'use client';

import { Link } from "@remix-run/react";
import Searcher from "./searcher";

export default function Header() {
    return (
        <header className="bg-black p-3 px-5 flex justify-between">
            <h1 className="text-slate-400">User remix app</h1>
            <div className="flex gap-2 h-full">
                <Link to="/user-detail-edit/new" className="btn">Create new user</Link>
                <Searcher />
            </div>
        </header>
    )
}


