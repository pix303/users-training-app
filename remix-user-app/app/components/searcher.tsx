import { useNavigate, useSearchParams } from "@remix-run/react";
import type { ChangeEvent } from "react";
import { useCallback } from "react";

export default function Searcher() {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const searchHandler = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
        const candidateValue = e.target.value;
        const name = encodeURI(candidateValue);

        if (location.pathname.length > 1) {
            navigate("/?name=" + name);
            return
        }

        if (name === "") {
            setSearchParams({})
            return
        }

        setSearchParams({ name });

    }, [searchParams, navigate]);

    return (
        <div className="h-full">
            <input
                type="search"
                id="searchInput"
                placeholder="Search by name..."
                onChange={searchHandler}
                className="bg-slate-800 bg-clip-padding rounded-md p-3 text-white focus:outline-none focus:border-none" />
        </div>
    )
}