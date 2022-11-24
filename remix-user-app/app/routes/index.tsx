import type { LoaderArgs, TypedResponse } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import UserList from "~/components/user-list";
import type { User } from "~/model/user";
import { getUsers } from "~/model/user.server";



export async function loader({ request }: LoaderArgs): Promise<TypedResponse<User[]>> {
  const url = new URL(request.url);
  const name = url.searchParams.get("name") ?? undefined;

  const users = await getUsers(name);
  const respBody = users;

  return new Response(
    JSON.stringify(respBody),
    { headers: { "Content-Type": "application/json" } }
  );
}



export default function Index() {

  const data = useLoaderData<typeof loader>();
  const searchParams = useSearchParams()[0]

  return (
    <UserList searchName={searchParams.get("name") ?? undefined} users={data}></UserList>
  )
}