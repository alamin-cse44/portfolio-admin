import { IListing } from "./listing";
import { IUserDetails } from "./user";

export interface IRentalRequest {
  _id?: string;
  listing: IListing | string;
  tenant: IUserDetails | string;
  landlord: IUserDetails | string;
  moveInDate: string;
  duration: number;
  rentalStatus: string;
  paymentStatus?: string;
  transactionId?: string;
  landlordPhone?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
