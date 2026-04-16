import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid login";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          });
          
          const data = await res.json();
          if (res.ok && data.user) {
            return {
              id: data.user._id,
              name: data.user.name,
              email: data.user.email,
              role: data.user.role,
              token: data.token
            };
          }
          throw new InvalidLoginError();
        } catch (error) {
          throw new InvalidLoginError();
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.accessToken = (user as any).token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role as string;
        (session.user as any).token = token.accessToken as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt"
  }
});
