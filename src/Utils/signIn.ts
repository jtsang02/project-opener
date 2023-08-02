import { signIn } from "next-auth/react";

export default async function SignIn (email: string, password: string) {
    const res = await signIn('credentials', {
        redirect: false,
        email, password
    })
    if (res?.error) {
        // handle error
    }
    // Signed in
    return res
}
