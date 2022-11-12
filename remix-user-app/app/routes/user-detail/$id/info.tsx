import { json } from "@remix-run/node";
import type { LoaderArgs, TypedResponse } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import type { User } from "~/model/user";

export async function loader({ params }: LoaderArgs): Promise<TypedResponse<User>> {
    const id = params.id;
    const response = await fetch(`${process.env.BACKEND_URL}/users/${id}`);
    return json(
        await response.json(),
    )
}

export default function UserInfo() {
    const data = useLoaderData<typeof loader>();

    return (
        <div>
            {data.name}
        </div>
    );
}