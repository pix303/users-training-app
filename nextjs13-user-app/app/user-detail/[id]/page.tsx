'use client'

import { usePathname } from "next/navigation"
import { use, useEffect, useState } from "react";
import { User } from "../../../shared/user";

const getUserDetail = (id: string | undefined): Promise<User> => {
    if (!id) return new Promise((resolve) => resolve({ id: 0, name: "no name", username: "no_name" }));
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`).then(res => res.json());
}

export default function UserDetailPage() {
    const params = usePathname();
    const user = use(getUserDetail(params?.split("/").pop()));

    return (
        <div>
            <p>{user.name}</p>
        </div>
    )
}