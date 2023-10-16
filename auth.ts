import Google from "next-auth/providers/google"

export const config = {
    providers: [
      Google({ clientId: process.env.AUTH_GOOGLE_ID as string, clientSecret: process.env.AUTH_GOOGLE_SECRET as string }),
    ],
}