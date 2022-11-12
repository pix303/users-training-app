import { json } from "@remix-run/node";
import type { LoaderArgs, TypedResponse } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData, useParams } from "@remix-run/react";
import type { User } from "~/model/user";

export async function loader({ params }: LoaderArgs): Promise<TypedResponse<User>> {
    const id = params.id;
    const response = await fetch(`${process.env.BACKEND_URL}/users/${id}`);
    return json(
        await response.json(),
    )
}

export default function UserDetail() {
    const data = useLoaderData<typeof loader>()
    const params = useParams();
    const id = params.id;


    return (
        <section>
            <header>
                <h1>{data.name}</h1>
            </header>
            <nav>
                <div className="tabs">
                    <NavLink prefetch="none" to={`${id}/info`} className="tab tab-lifted">Person info</NavLink>
                    <NavLink prefetch="none" to={`${id}/address`} className="tab tab-lifted">Address</NavLink>
                    <NavLink prefetch="none" to={`${id}/company`} className="tab tab-lifted">Company</NavLink>
                </div>
            </nav>

            <Outlet />

        </section>
    )
}