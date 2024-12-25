interface User {
  name: string;
  email: string;
  password?: string;
  interest: string[];
}
interface LoginUser {
  name: string;
  password: string;
}
interface AuthUser {
  access_token?: string;
  message: string;
  user?: {
    name: string;
    email: string;
    interest: string[];
  };
}
export { User, LoginUser, AuthUser };
