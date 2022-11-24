import { json } from "@remix-run/node";
import type { LoaderArgs, TypedResponse } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { User } from "~/model/user";
import { getUser } from "~/model/user.server";

export async function loader({ params }: LoaderArgs): Promise<TypedResponse<User>> {
    const id = params.id ?? "";
    return json(
        await getUser(id)
    )
}

export default function InfoView() {

    const user = useLoaderData<User>()

    return (
        <div>
            <h2>Info</h2>
            <table className="table w-52">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{user?.name}</td>
                    </tr>
                    <tr>
                        <th>Username</th>
                        <td>{user.username}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}