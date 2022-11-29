import { User } from "../../../../shared/model/user";
import { getUserDetail } from "../../../../shared/user.server";

export function getUser(id: string): Promise<User> {
    return getUserDetail(id);
}

export default async function InfoPage({ params }: { params: { id: string } }) {
    const user = await getUser(params.id);
    return (
        <div>
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
                    <tr>
                        <th>Email</th>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <th>website</th>
                        <td><a className="text-cyan-600" href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}