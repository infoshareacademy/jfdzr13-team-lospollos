import { UserCredential } from "firebase/auth";

export type Holidays = { day: string };
export type Departments = { dept: string; head: string };
export type Request = {
  dayFrom: string;
  dayTo: string;
  daysReq: number;
  daysLeft: number;
  deptId: string;
  requestType: string;
  status: string;
  userId: string;
  comment: string;
  createdAt: number;
};

export type Type = { type: string };
export type User = {
  createdAt: number;
  createdBy: string;
  currentDays: number;
  days: number;
  deptId: string;
  email: string;
  firstName: string;
  surname: string;
  onDemand: number;
  roleAdmin: boolean;
  roleUser: boolean;
  roleSupervisor: boolean;
  userId: string;
};

export type AuthContext = {
  authUserId: string | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
};
