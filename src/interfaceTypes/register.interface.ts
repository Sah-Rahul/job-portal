export interface RegisterInterface {
  name: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "applicant" | "recruiter";
}

export interface loginInterface {
  email: string;
  password: string;
}
