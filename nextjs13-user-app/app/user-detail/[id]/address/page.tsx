import { User } from "../../../../shared/model/user";
import { getUserDetail } from "../../../../shared/user.server";

export function getUser(id: string): Promise<User> {
  return getUserDetail(id);
}

export default async function AddressPage({ params }: { params: { id: string } }) {
  const { address } = await getUser(params.id);

  if (address && Object.values(address).some((v) => typeof (v) === "string" && v !== "")) {
    return (
      <>
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