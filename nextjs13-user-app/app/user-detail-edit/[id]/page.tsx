import { User } from "../../../shared/model/user";
import { getUserDetail } from "../../../shared/user.server";


export function getUser(id: string): Promise<User> {
    return getUserDetail(id);
}

export default async function UserEditView({ params }: { params: { id: string } }) {

    const user = await getUser(params.id);

    return (
        <section>
            <header>
                <h1>Create new user</h1>
            </header>
            <div className="my-10 grid gap-1 w-3/6">
                <form method="post" action="/api/add-user">

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
                </form>
            </div>

        </section >
    );
}