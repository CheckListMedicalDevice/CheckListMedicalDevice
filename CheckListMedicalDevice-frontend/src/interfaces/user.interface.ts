export interface IUser {
  id: number;
  imagePath?: string;
  firstName: string;
  lastName: string;
  username: string;
  hashPassword?: string;
  email: string;
  address: string;
  phoneNumber: string;
  role: roleAdmin;
  landId: number | null;
  storeId: number | null;
  createAt: Date;
}

export enum roleAdmin {
  admin = "admin",
  user = "user",
}
