export type Genre =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";

// src/types/book.ts

export interface IBook {
  _id: string;              // MongoDB ID
  title: string;            // Book title
  author: string;           // Author name
  genre: Genre;            // Genre/category
  isbn: string;             // ISBN code
  description?: string;     // Optional description
  copies: number;           // Total available copies
  available: boolean;       // Availability status
  createdAt?: string;       // Optional: timestamp from backend
  updatedAt?: string;       // Optional: timestamp from backend
}


// API response সবসময় {"data": IBook}
export interface BookResponse {
  data: IBook;
}
