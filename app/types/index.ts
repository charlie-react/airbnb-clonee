// import { Listing, Reservation, User } from "@prisma/client";


// export type SafeListing = Omit<Listing, "createdAt"> & {
//   createdAt: string;
// };
// export type SafeReservation= Omit<Reservation,"createdAt" | "endDate" | "startDate" | "listing" > &{
//     createdAt:string;
//     endDate:string;
//     startDate:string;
//     listing:SafeListing
// }
// export type SafeUser = Omit<
//   User,
//   "createdAt" | "updatedAt" | "emailVerified"
// > & {
//   createdAt: string;
//   updatedAt: string;
//   emailVerified: string | null;
// };


import { Listing, Reservation, User } from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation, 
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};