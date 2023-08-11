enum Role {
    ADMIN = "ADMIN",
    AUTHOR = "AUTHOR",
    USER = "USER"
}

export interface User {
    id: number,
    name: string,
    username: string,
    email: string,
}
