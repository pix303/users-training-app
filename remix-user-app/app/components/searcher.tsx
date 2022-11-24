import { useNavigate, useSearchParams } from "@remix-run/react";
import { ChangeEvent, useCallback } from "react";

export default function Searcher() {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const searchHandler = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
        const candidateValue = e.target.value;
        const name = encodeURI(candidateValue);

        if (location.pathname !== "/") {
            navigate("/");
            setSearchParams({ name });
            return
        }

        if (name === "") {
            setSearchParams({})
            return
        }

        setSearchParams({ name });

    }, [searchParams]);

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