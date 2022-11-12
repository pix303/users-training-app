import Link from "next/link";
import { FunctionComponent, useCallback, useState } from "react"
import { User } from "../shared/user";

type UserPresenterProps = {
    user: User;
}

const UserPresenter: FunctionComponent<UserPresenterProps> = ({ user }) => {
    const [infoDetail, setInfoDetail] = useState<string>("");
    const [errorFetchInfoDetail, setErrorFetchInfoDetail] = useState<string | undefined>();
    const showInfoDetail = useCallback(() => {
        if (infoDetail) return;

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user.id}`).then(
            res => res.json(),
        ).then(
            res => setInfoDetail(res.website),
        ).catch(
            e => setErrorFetchInfoDetail(e.message)
        )
    }, [user, infoDetail]);

    return (
        <Link href={`/user-detail/${user.id}`}>
            <li
                key={user.id}
                onMouseOver={showInfoDetail}
                title={infoDetail}
                className="block p-6 border-slate-200 border-solid border-2 rounded w-72 h-auto hover:bg-slate-100"
            >
                {
                    errorFetchInfoDetail ? <span className="text-red-600">{errorFetchInfoDetail}</span> : user.name
                }
            </li>
        </Link>
    )
}

export default UserPresenter;