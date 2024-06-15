import { UserCredential } from "firebase/auth";

export type Holidays = { day: string };
export type Departments = { dept: string; head: string };
export type Request = {
  dayFrom: string;
  dayTo: string;
  daysReq: number;
  daysLeft: number;
  requestType: string;
  status: string;
  userId: string;
  deptId: string;
  comment: string;
  createdAt: number;
};

export type Type = { type: string };
export type User = {
  id?: string;
  createdAt: number;
  createdBy: string;
  currentDays: number;
  days: number;
  deptId: string;
  email: string;
  name: string;
  surname: string;
  onDemand: number;
  roleAdmin: boolean;
  roleUser: boolean;
  roleSupervisor: boolean;
  userId: string;
};

export type AuthContext = {
  authUser: AuthUser | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  changePassword: (newPassword: string) => void;
};

export type AuthUser = {
  id: string;
  email: string;
  name: string;
};
