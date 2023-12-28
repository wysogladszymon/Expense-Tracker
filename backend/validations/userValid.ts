const minPasswordSize : number  = 6;

const emailRegex : RegExp= /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export function isPasswordValid(password:string) : boolean{
    if (password.length < minPasswordSize){
        return false;
    }

    return true;
}

export function isEmailValid(email : string) : boolean{
    return emailRegex.test(email);
}

export function isValidUsername(name : string) : boolean{
    const regex = /[^a-zA-Z0-9]/;
    return !regex.test(name);
}