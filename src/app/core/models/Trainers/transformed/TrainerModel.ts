import { experience } from '../trainersData';
export interface Trainers {
  _id: string;
  name: string;
  image: string;
  email: string;
  phone: string;
  experience: experience;
  verified: boolean;
  isAdmin: boolean;
  token: string;
  location: Location;
}
export interface Location {
  lat: number ;
  lng: number ;  
options: any;

}