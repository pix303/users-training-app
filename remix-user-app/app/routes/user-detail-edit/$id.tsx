import type { ActionArgs, LoaderArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { redirect } from "@remix-run/node"
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import type { User } from "~/model/user";
import { addUser, getUser } from "../../model/user.server"

export async function action({ params, request }: ActionArgs) {
    const formData = await request.formData();
    try {
        const r = await addUser(formData);
        const newId = r.value;
        return redirect(`/user-detail/${newId}/info`);
    } catch (error: any) {
        throw new Response("Error post user: " + error.message, { status: 500 })
    }
};


export async function loader({ params }: LoaderArgs) {
    const id = params.id;
    invariant(id, "user id must be defined or 'new'")
    if (id !== "new") {
        const u = await getUser(id);
        return json({ user: u });
    }
    return json({ user: undefined })
}

export default function UserEditView() {

    const { user } = useLoaderData<{ user: User }>();

    return (
        <section>
            <header>
                <h1>Create new user</h1>
            </header>
            <div className="my-10 grid gap-1 w-3/6">
                <Form method="post">

                    <div className="form-control">
                        <label className="input-group">
                            <span>Name</span>
                            <input type="text" placeholder="my name" name="name" defaultValue={user?.name} required minLength={3} className="input input-bordered" />
                        </label>
                    </div>

                    <div className="form-control">
                        <label className="input-group">
                            <span>Username</span>
                            <input type="text" placeholder="my username" name="username" defaultValue={user?.username} className="input input-bordered" />
                        </label>
                    </div>

                    <div className="form-control">
                        <label className="input-group">
                            <span>Email</span>
                            <input type="text" placeholder="my@email.com" name="email" defaultValue={user?.email} className="input input-bordered" />
                        </label>
                    </div>

                    <div className="form-control">
                        <label className="input-group">
                            <span>Website</span>
                            <input type="text" placeholder="www.my-website.com" name="website" defaultValue={user?.website} className="input input-bordered" />
                        </label>
                    </div>

                    <input type="hidden" name="id" defaultValue={user?.id} />

                    <div className="form-control-btn">
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div>
                </Form>
            </div>

        </section >
    );
}


