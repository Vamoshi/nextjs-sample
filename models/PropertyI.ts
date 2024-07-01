import { Document, Types } from "mongoose";

interface Location {
  street?: string;
  city?: string;
  state?: string;
  zipcode?: string;
}

interface Rates {
  nightly?: number;
  weekly?: number;
  monthly?: number;
}

interface SellerInfo {
  name?: string;
  email?: string;
  phone?: string;
}

interface PropertyI extends Document {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  name: string;
  type: string;
  description?: string;
  location?: Location;
  beds: number;
  baths: number;
  square_feet: number;
  amenities?: string[];
  rates?: Rates;
  seller_info?: SellerInfo;
  images?: string[] | File[];
  is_featured?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type { PropertyI };
