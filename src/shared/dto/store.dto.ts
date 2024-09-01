export interface User {
  email: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

export interface AppState {
  theme: boolean;
}
