
export enum ItemStatus {
  Lost = 'Lost',
  Found = 'Found',
}

export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  email?: string; // Optional for profile page
  phone?: string; // Optional for profile page
}

export type Region = 'Local' | 'America' | 'Asia' | 'Africa' | 'Europe';

export interface Item {
  id: string;
  name: string;
  description: string;
  status: ItemStatus;
  imageUrl: string;
  location: {
    latitude: number;
    longitude: number;
    text: string;
  };
  reportedAt: Date;
  author: User;
  region: Region;
}
