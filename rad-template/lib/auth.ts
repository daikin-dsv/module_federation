import NextAuth from 'next-auth';
import Keycloak from 'next-auth/providers/keycloak';

export const { handlers, signIn, signOut, auth } = NextAuth({
    debug: process.env.NODE_ENV === 'development',
    providers: [Keycloak],
    callbacks: {
        jwt({ token, user, profile }) {
            if (user) {
                token.id = user.id;
            }
            if (profile) {
                token.locale = profile.locale;
                token.given_name = profile.given_name;
                token.family_name = profile.family_name;
                token.preferred_username = profile.preferred_username;
            }
            return token;
        },
        session({ session, token }) {
            const tokenId = token.id;

            if (typeof tokenId !== 'string') {
                throw new Error('Missing user ID on token');
            }

            session.user.id = tokenId;
            session.user.locale =
                typeof token.locale === 'string' ? token.locale : undefined;
            session.user.given_name =
                typeof token.given_name === 'string' ? token.given_name : undefined;
            session.user.family_name =
                typeof token.family_name === 'string' ? token.family_name : undefined;
            session.user.preferred_username =
                typeof token.preferred_username === 'string'
                    ? token.preferred_username
                    : undefined;

            return session;
        }
    }
});
