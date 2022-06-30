export interface UserModel {
    userId?: string;
    name?: string;
    email: string;
    password: string;
}

export interface UserAPiNest {
    statusCode: number,
    message: string,
    error: string
}
