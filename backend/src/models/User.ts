export type Role = 'admin' | 'mentor' | 'mentee';

export interface User {
  id: string;
  email: string;
  password: string;
  role: Role;
  name?: string;
  bio?: string;
  skills?: string[];
  goals?: string;
}
