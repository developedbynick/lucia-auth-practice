import GithubUser, { GitHubEmail } from '@/types/auth/GithubUser';
import ApiError from '@/utils/ApiError';
import { GitHub } from 'arctic';
import "@/utils/connectToDb";
import User, { HydratedUser } from '@/models/UserModel';
import crypto from 'crypto';
export const github = new GitHub(process.env.GITHUB_CLIENT_ID!, process.env.GITHUB_CLIENT_SECRET!);
export const retrieveGithubUser = async (accessToken: string) => {
    // Retrieving the user from Github
    const headers = { Authorization: `Bearer ${accessToken}` };
    const responseFromGithub = await fetch('https://api.github.com/user', { headers })
    const user = await responseFromGithub.json() as GithubUser;
    // So according to Github, if the user didn't set their email to be publicly visible, the api will return null, so we will have to reach out to Github's email api to get a list of user emails and then pick one which is suitable.
    if (!user.email) {
        // Retrieving the user
        const emailResponse = await fetch('https://api.github.com/user/emails', { headers });
        // Parsing the list of emails from github
        const emails = await emailResponse.json() as GitHubEmail[];
        // Finding the verified email, but making sure that it's primary
        const primaryAndVerifiedEmail = emails.find((emailObj) => {
            return emailObj.primary && emailObj.verified;
        })
        // If there is no verified or primary email(unlikely) throw an error
        if (!primaryAndVerifiedEmail) throw new ApiError(400, "Please ensure that your email is verified by Github before signing up.");
        // Otherwise, return a OAuth response from github with the user.
        user.email = primaryAndVerifiedEmail.email;
    }
    return user;
}

export const createOrReturnGithubUser = async (githubUser: GithubUser): Promise<HydratedUser> => {
    // Check if user with the given id exists
    const potentialUserId = await User.exists({ providerId: `${githubUser.id}` });
    if (!potentialUserId) return createUserFromGithub(githubUser);

    // Return the user that was found
    const user = await User.findById(potentialUserId._id);
    return user!;
}

const createUserFromGithub = async (githubUser: GithubUser): Promise<HydratedUser | never> => {
    // Extract user properties
    const { name, email, id: providerId, avatar_url } = githubUser;
    // Check to see if the email is present on the object... if not we throw an error
    if (!email)
        throw new ApiError(400, "The email address could not be retrieved from github")
    // create user
    const user = await User.create({ _id: crypto.randomUUID(), name, email, providerId, provider: 'Github', })
    // return user
    return user;
}