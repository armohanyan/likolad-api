export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    role: 'admin' | 'user';
    email: string;
    password?: string;
    phone: string;
    isVerified: boolean;
    birthday?: Date;
    location?: string;
    histories?: string;
    pickedProducts?: string;
    rating?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
