interface IUser{
    email:string;
    token:string;
}
type MyUser = IUser | null;

export async function myFetch(path:string, user: MyUser, ask : string){
    if (!user) return Error('Request not authorized.');

    const response = await fetch(path, {
        method:ask,
        headers: { Authorization: `Bearer ${user && user.token}` },
      });
      const data = await response.json();
      return data;
}

export async function deleteFinanse(finanseType:'expense' | 'income',user:MyUser, _id:string){
    if (!user) return Error('Request not authorized.');

    const response = await fetch(`/api/${finanseType}/${_id}`, {
        method:"DELETE",
        headers: { Authorization: `Bearer ${user && user.token}` },
      });
      const data = await response.json();
      return data;
}