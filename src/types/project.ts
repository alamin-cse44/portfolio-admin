import { IUserDetails } from "./user";

export interface IProject {
  _id: string;
  title: string;
  user: IUserDetails;
  briefDescription: string;
  service: string;
  status: string;
  live: string;
  description: string;
  images: { url: string }[];
  technologies: { value: string }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

