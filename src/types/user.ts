export interface IUser {
  userId: string;
  name: string;
  phone: string;
  userEmail: string;
  isBlocked?: boolean;
  userRole: "landLord" | "tenant" | "admin";
  image?: string;
  iat?: number;
  exp?: number;
}

export interface IUserDetails {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "admin" | "landLord" | "tenant";
  isBlocked: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
