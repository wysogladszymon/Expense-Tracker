export interface Finanse {
    title: string;
    amount: number;
    category: string;
    finanse: "expense" | "income";
    user_id: string;
    updatedAt: string;
    _id:string;
    createdAt:string;
}

export interface Category{
    category: string;
    user: 'default' | 'user';
    user_id?:string;
}