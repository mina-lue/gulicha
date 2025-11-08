export type Listing = {
  id?: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  type: "rent" | "sale";
  status: "available" | "sold" | "rented";
  location: string;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
};
