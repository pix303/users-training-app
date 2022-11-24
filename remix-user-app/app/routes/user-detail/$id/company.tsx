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

export default function CompanyView() {
    const { company } = useLoaderData<typeof loader>()
    return (
        <div>
            <h2>Company <strong>{company?.name}</strong></h2>
            <p>{company?.catchPhrase}</p>
        </div>
    );
}