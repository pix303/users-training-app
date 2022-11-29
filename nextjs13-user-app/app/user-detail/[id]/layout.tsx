
import Link from "next/link";
import NavTabLink from "../../../components/nav-tab-link";
import { User } from "../../../shared/model/user";
import { getUserDetail } from "../../../shared/user.server";


export function getUser(id: string): Promise<User> {
    return getUserDetail(id);
}

export default async function UserDetailLayout({ params, children }: { children: React.ReactNode, params: { id: string } }) {
    const id = params.id;
    const data = await getUser(id);

    return (
        <section>
            <header>
                <h1>
                    <span className="mr-4">{data.name}</span>
                    <Link href={`/user-detail-edit/${id}`} className="btn btn-sm">Edit</Link>
                </h1>
            </header>
            <nav className="mb-4">
                <div className="tabs">
                    {[
                        { path: `/user-detail/${id}/info`, label: "Info" },
                        { path: `/user-detail/${id}/address`, label: "Address" },
                        { path: `/user-detail/${id}/company`, label: "Company" },
                    ].map(prop => { return <NavTabLink key={prop.path} {...prop}></NavTabLink> })
                    }
                </div>
            </nav>

            {children}

        </section >
    )
}

