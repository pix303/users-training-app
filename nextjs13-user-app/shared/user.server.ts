import invariant from "tiny-invariant";
import { User } from "./model/user";
import { UserResponse } from "./model/user-response";


export const getUserDetail = (id: string | undefined): Promise<User> => {
    invariant(id, "Id is required");
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`).then(res => res.json());
}


export async function addUser(data: User): Promise<UserResponse> {

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
                let dataResult: UserResponse = { isError: false };
                dataResult = { ...dataResult, ...data };
                return dataResult;
            })
        } else {
            const msg = await r.json();
            let errorResult: UserResponse = { isError: true };
            errorResult = { ...errorResult, ...msg };
            return errorResult;
        }

    } catch (error: any) {
        let errorResult: UserResponse = { isError: true, message: "Error on add user: " + error.toString() };
        return errorResult;
    }

}