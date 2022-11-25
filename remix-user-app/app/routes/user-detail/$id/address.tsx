import { json } from "@remix-run/node";
import type { LoaderArgs, TypedResponse } from "@remix-run/node";
import type { User } from "~/model/user";
import { getUser } from "~/model/user.server";
import { useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderArgs): Promise<TypedResponse<User>> {
    const id = params.id ?? "";
    return json(
        await getUser(id)
    )
}

export default function AddressView() {
    const { address } = useLoaderData<typeof loader>();

    if (address && Object.values(address).some((v) => typeof (v) === "string" && v !== "")) {
        return (
            <>
                <pre>{JSON.stringify(address)}</pre>
                <div>
                    <table className="table w-52">
                        <tbody>
                            <tr>
                                <th>Street</th>
                                <td>{address?.street}</td>
                            </tr>
                            <tr>
                                <th>Suite</th>
                                <td>{address?.suite}</td>
                            </tr>
                            <tr>
                                <th>City</th>
                                <td>{address?.zipcode} {address?.city}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>

        )
    } else {
        return <p className="my-10">No address</p>

    }
}