export interface GithubUser {
    avatar_url: string;
    name: string;
    id: string;
    email: GitHubEmail | null | string;
}
export interface GitHubEmail {
    email: string;
    primary: boolean;
    verified: boolean;
    visibility: "private" | "public" | null;
}
export default GithubUser;