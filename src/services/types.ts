export type TLoginData = {
  phone: string;
  code: number;
};

export type TUser = {
  phone: string;
  firstname?: string;
  middlename?: string;
  lastname?: string;
  email?: string;
  city?: string;
};

export type TSignInResponse = {
  success: boolean;
  user: TUser;
  token: string;
  reason?: string;
};

export type TCreateOtpData = {
  phone: string;
};

export type TCreateOtpResponse = {
  success: boolean;
  reason: boolean;
  retryDelay: number;
};

export type TGetUserSessionResponse = {
  success: boolean;
  user: TUser;
  reason?: string;
};
