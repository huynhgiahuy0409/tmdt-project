export interface RegisterAccountRequest{
    username: string,
    password: string,
    fullName: string
}
export interface AuthenticationRequest{
    username: string,
    password: string,
}
export interface Pagination{
    pageIndex: number,
    pageSize: number,
}