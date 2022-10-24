import { KeyObject } from "crypto";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useRef, useState } from "react";

export default function Searcher() {

    const router = useRouter();
    const searchInput = useRef<HTMLInputElement>(null)
    const [searchValue, setSearchValue] = useState<string>("")


    const searchHandler = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
        const candidateValue = e.target.value;
        if (candidateValue === "") {
            router.push("/");
            return
        }

        if (candidateValue !== searchValue) {
            setSearchValue(candidateValue);
            router.push({ pathname: "/", query: { name: candidateValue } })
        }

    }, [searchValue, router]);

    const onClearClick = useCallback((e: MouseEvent): void => {
        console.log(e);
    }, []);

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