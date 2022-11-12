import { useNavigate, useSearchParams } from "@remix-run/react";
import { ChangeEvent, useCallback } from "react";

export default function Searcher() {

    const [searchParams, setSearchParams] = useSearchParams();

    const searchHandler = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
        const candidateValue = e.target.value;

        if (candidateValue === "") {
            setSearchParams({})
            return
        }
        const name = encodeURI(candidateValue);
        setSearchParams({ name });

    }, [searchParams]);

    return (
        <div className="h-full">
            <input
                type="search"
                id="searchInput"
                placeholder="Search by name..."
                onChange={searchHandler}
                className="bg-slate-800 bg-clip-padding rounded-md p-1 px-3 text-white focus:outline-none focus:border-none" />
        </div>
    )
}