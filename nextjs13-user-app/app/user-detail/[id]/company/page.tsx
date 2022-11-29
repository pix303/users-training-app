import { User } from "../../../../shared/model/user";
import { getUserDetail } from "../../../../shared/user.server";

export function getUser(id: string): Promise<User> {
  return getUserDetail(id);
}


export default async function CompanyPage({ params }: { params: { id: string } }) {
  const { company } = await getUser(params.id);
  return (
    <div>
      <h2>Company <strong>{company?.name}</strong></h2>
      <p>{company?.catchPhrase}</p>
    </div>
  );
}