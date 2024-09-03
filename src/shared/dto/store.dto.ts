import {MedicationDto} from './medication.dto';

export interface User {
  email: string;
  password: string;
  id: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

export interface AppState {
  theme: boolean;
  medications: MedicationDto[];
}
