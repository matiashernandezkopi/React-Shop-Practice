interface User{
    name:string,
    email:string,
    password:string,
    testPassword:string,
    phone?:number
}

interface LoggedUser{
    name:string,
    email:string,
    phone?:number
}