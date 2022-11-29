import Link from 'next/link';
import ErrorMessage from '../components/error-message';
import UserList from '../components/user-list';
import { StatusOptions } from '../shared/model/status-type';
import type { User } from '../shared/model/user';

type HomeProps = {
  status: StatusOptions.SUCCESS;
  users: User[];
  filteredName?: string;
} | {
  status: StatusOptions.ERROR;
  error: string;
}


const getUsers = async (filterByName: string | null): Promise<HomeProps> => {

  let _props: HomeProps;
  const candidateName = filterByName;

  try {
    let response: Response;

    _props = { status: StatusOptions.SUCCESS, users: [] }
    if (candidateName) {
      _props.filteredName = candidateName;
      response = await fetch(process.env.BACKEND_URL + "/users/search?name=" + candidateName, { cache: 'no-store' });
    } else {
      response = await fetch(process.env.BACKEND_URL + "/users", { cache: 'no-store' });
    }
    const users: User[] = await response.json();
    _props.users = users;
  } catch (e: any) {
    _props = { status: StatusOptions.ERROR, error: e.toString() + " - " + e["cause"] || "" }
  }

  return _props;
}

export default async function Page({ searchParams }: { searchParams: { name: string } }) {

  const props: HomeProps = await getUsers(searchParams.name || null);

  if (!props) return <p>loading...</p>

  switch (props.status) {
    case StatusOptions.SUCCESS:
      return (
        <UserList users={props.users} searchName={props.filteredName} />
      )

    case StatusOptions.ERROR:
      return <ErrorMessage message={props.error} />

    default:
      return <p>nothing else matter</p>
  }
}


