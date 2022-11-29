'use client'

import { FunctionComponent, useEffect, useState } from "react";
import { User } from "../shared/model/user";
import UserPresenter from "./user-list-item";

type UserListProps = {
    users: User[];
    searchName?: string;
}

const UserList: FunctionComponent<UserListProps> = ({ users, searchName }) => {

    const [filterdName, setFilterdName] = useState<string | undefined>();

    useEffect(() => {
        setFilterdName(searchName)
    }, [searchName]);


    return (
        <section>
            <header>
                <h1>User list</h1>
                {filterdName ? <p><span>Filtered by name: </span><span className="font-bold">{filterdName}</span></p> : <p>No active filter</p>}
            </header>
            <ul className="flex gap-10 flex-wrap my-6">
                {users.map(u => {
                    return <UserPresenter key={u.id} user={u} />
                })}
            </ul>
        </section>
    )
}

export default UserList;