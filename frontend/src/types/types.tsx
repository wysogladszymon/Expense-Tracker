export interface Finanse {
    title: string;
    amount: Number;
    category: string;
    finanse: "expense" | "income";
    user_id: string;
    updatedAt: string;
    _id:string;
}

export interface Category{
    category: string;
    user: 'default' | 'user';
    user_id?:string;
}