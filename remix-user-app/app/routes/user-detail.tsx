import { json } from "@remix-run/node";
import type { LoaderArgs, TypedResponse } from "@remix-run/node";
import { Link, Outlet, useCatch, useLoaderData, useParams } from "@remix-run/react";
import type { User } from "~/model/user";
import NavTabLink from "~/components/nav-tab-link";
import { getUser } from "~/model/user.server";
import ErrorMessage from "~/components/error-message";

export async function loader({ params }: LoaderArgs): Promise<TypedResponse<User>> {
    const id = params.id ?? "";
    try {
        return json(
            await getUser(id)
        )
    } catch (error) {
        throw new Response("User id is required", { status: 400, statusText: "Bad request" })
    }
}

export default function UserDetail() {
    const data = useLoaderData<typeof loader>()
    const params = useParams();
    const id = params.id;

    return (
        <section>
            <header>
                <h1>
                    <span className="mr-4">{data.name}</span>
                    <Link to={`/user-detail-edit/${id}`} className="btn btn-sm">Edit</Link>
                </h1>
            </header>
            <nav>
                <div className="tabs">
                    {[
                        { path: `${id}/info`, label: "Info" },
                        { path: `${id}/address`, label: "Address" },
                        { path: `${id}/company`, label: "Company" },
                    ].map(prop => { return <NavTabLink key={prop.path} {...prop}></NavTabLink> })
                    }
                </div>
            </nav>

            <Outlet />

        </section >
    )
}


export const CatchBoundary = () => {
    const catchData = useCatch();

    switch (catchData.status) {
        case 400:
            return <ErrorMessage info={catchData.data} message={catchData.statusText} />
        case 404:
            return <ErrorMessage info={catchData.data} message={catchData.statusText} />
        case 500:
            return <ErrorMessage info={catchData.data} message={catchData.statusText} />
        default:
            throw new Error(`This status is not handled: ${catchData.status}`);
    }

}