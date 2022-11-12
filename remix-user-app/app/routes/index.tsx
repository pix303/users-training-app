import type { LoaderArgs, TypedResponse } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import UserList from "~/components/user-list";
import type { User } from "~/model/user";



export async function loader({ request }: LoaderArgs): Promise<TypedResponse<User[]>> {
  const url = new URL(request.url);
  const name = url.searchParams.get("name");

  let res;
  if (name) {
    const searchUrl = new URL(`${process.env.BACKEND_URL}/users/search`);
    searchUrl.searchParams.append("name", name);
    res = await fetch(searchUrl);
  } else {
    res = await fetch(`${process.env.BACKEND_URL}/users`);
  }

  const users = await res.json();
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