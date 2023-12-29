/**
*checks if our password is longer than 8 and contains one of each: uppercase letter, lowercase letter, number, special sign
*@param {string} password - the password to be checked
*@returns {boolean} Returns true if it matches our criteria
*/
export function isPasswordValid(password:string) : boolean{
    const minPasswordSize : number  = 8;
    if (password.length < minPasswordSize){
        return false;
    }
    const regex :RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$/;

    return regex.test(password);
}

export function isEmailValid(email : string) : boolean{
    const emailRegex : RegExp= /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
}

export function isValidUsername(name : string) : boolean{
    const regex = /[^a-zA-Z0-9]/;
    return !regex.test(name);
}