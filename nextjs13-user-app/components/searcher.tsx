'use client';

import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useRef, useState } from "react";

export default function Searcher() {

    const router = useRouter();
    const searchInput = useRef<HTMLInputElement>(null)
    const [searchValue, setSearchValue] = useState<string>("")


    const searchHandler = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
        console.log(router);

        if (!router) return;

        const candidateValue = e.target.value;
        if (candidateValue === "") {
            router.push("/");
            return
        }

        if (candidateValue !== searchValue) {
            setSearchValue(candidateValue);
            router.push("/?" + "name=" + encodeURI(candidateValue));
        }

    }, [searchValue, router]);

    return (
        <div className="h-full">
            <input
                ref={searchInput}
                type="search"
                id="searchInput"
                placeholder="Search by name..."
                onChange={searchHandler}
                className="bg-slate-800 bg-clip-padding rounded-md p-1 px-3 text-white focus:outline-none focus:border-none" />
        </div>
    )
}