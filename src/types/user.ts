export interface IUser {
  userId: string;
  name: string;
  phone: string;
  userEmail: string;
  isBlocked?: boolean;
  userRole: "admin" | "user";
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
  role: "admin" | "user";
  isBlocked: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ISkillsDetails {
  _id: string;
  title: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
