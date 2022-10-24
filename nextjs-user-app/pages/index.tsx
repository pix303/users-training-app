import type { GetServerSideProps, NextPage } from 'next'
import ErrorMessage from '../components/error-message';
import UserList from '../components/user-list';
import { StatusOptions } from '../shared/status-type';
import { User } from '../shared/user'


type HomeProps = {
  status: StatusOptions.SUCCESS;
  users: User[];
  filteredName?: string;
} | {
  status: StatusOptions.ERROR;
  error: string;
}

const Home: NextPage<HomeProps> = (props: HomeProps) => {

  switch (props.status) {
    case StatusOptions.SUCCESS:
      return <UserList users={props.users} searchName={props.filteredName} />

    case StatusOptions.ERROR:
      return <ErrorMessage message={props.error} />
  }
}


export default Home

export const getServerSideProps: GetServerSideProps = async ({ query }): Promise<{ props: HomeProps }> => {
  let _props: HomeProps;
  const candidateName = query?.name;
  try {
    let response: Response;

    _props = { status: StatusOptions.SUCCESS, users: [] }
    if (candidateName) {
      _props.filteredName = candidateName.toString();
      response = await fetch(process.env.BACKEND_URL + "/users/search?name=" + candidateName);
    } else {
      response = await fetch(process.env.BACKEND_URL + "/users");
    }
    const users: User[] = await response.json();
    _props.users = users;
  } catch (e: any) {
    _props = { status: StatusOptions.ERROR, error: e.toString() }
  }

  return { props: _props }
} 
