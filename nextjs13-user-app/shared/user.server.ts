import invariant from "tiny-invariant";
import { User } from "./model/user";
import { UserResponse } from "./model/user-response";


export const getUserDetail = (id: string | undefined): Promise<User> => {
    invariant(id, "Id is required");
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`).then(res => res.json());
}


export async function addUser(data: any): Promise<UserResponse> {

    //TODO: fix type prop when not string
    // if ("id" in data) {
    //     data.id = parseInt(data.id)
    // }

    try {
        const r = await fetch(
            `${process.env.BACKEND_URL}/user`,
            {
                body: JSON.stringify(data),
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });

        if (r.status < 400) {
            return r.json().then(data => {
                console.log("-----------------------------------------------");
                console.log(r.status)
                console.log(r.statusText)
                console.log(data)
                console.log("-----------------------------------------------");

                return data;
            })
        } else {
            const msg = await r.json();
            throw new Error(`Server error on add user: ${r.status} - ${r.statusText}:  ${msg.message}`)
        }

    } catch (error: any) {
        throw new Error("Error on add user: " + error.toString())
    }

}