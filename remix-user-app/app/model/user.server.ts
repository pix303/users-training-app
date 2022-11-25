import invariant from "tiny-invariant";
import type { User } from "./user";

type UserResponse = {
    message?: string;
    value?: string;
}

export async function getUsers(nameFilter?: string): Promise<User[]> {
    let r;
    if (nameFilter) {
        const searchUrl = new URL(`${process.env.BACKEND_URL}/users/search`);
        searchUrl.searchParams.append("name", nameFilter);
        r = await fetch(searchUrl);
    } else {
        r = await fetch(`${process.env.BACKEND_URL}/users`);
    }

    return r.json();
}


export async function getUser(id: string): Promise<User> {
    invariant(id, "Id user must be setted");
    const r = await fetch(`${process.env.BACKEND_URL}/users/${id}`);
    return r.json();
}


export async function addUser(d: FormData): Promise<UserResponse | any> {
    try {
        const r = await fetch(
            `${process.env.BACKEND_URL}/user/add`,
            {
                body: d,
                method: "POST",
            });
        return r.json();
    } catch (error: any) {
        throw new Error("Error on add user: " + error.toString())
    }

}