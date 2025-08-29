import { DateValue } from "@heroui/react";

interface ICertificate {
  _id?: string;
  id?: string;
  competency?: string;
  createdAt?: string | DateValue
}

export type { ICertificate };