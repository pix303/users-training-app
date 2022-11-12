import invariant from "tiny-invariant";


export function getEnv() {
    invariant(process.env.BACKEND_URL, "BACKEND_URL not set");
    return {
        BACKEND_URL: process.env.BACKEND_URL
    }
}

export type ENV = ReturnType<typeof getEnv>;