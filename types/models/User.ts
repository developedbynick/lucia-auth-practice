interface UserTimeStamps {
    createdAt: Date;
    updatedAt: Date;
}
export interface UserInstanceMethods {
    comparePasswords(hashedPassword: string, regPassword: string): Promise<boolean>
}
export default interface User extends UserTimeStamps {
    name: string;
    email: string;
    password: string;
    // provider?: "Google" | "Twitter(X)" | "Github",
    //   providerId?: string;
    _id: string;
}