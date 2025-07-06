import { photo } from "./photo";

export interface Member {
    id: number;
    username: string;
    photoUrl: string;
    age: number;
    knownAs: string;
    created: Date;
    lastActive: any;
    gender: string;
    introduction: string;
    lookingFor: string;
    intersts?: any;
    city: string;
    country: string;
    photos: photo[];
  }
  
