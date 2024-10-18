type TProtectedRouteType = 'auth' | 'unauth';

export type ProtectedRouteProps = {
  children: React.ReactElement;
  type: TProtectedRouteType;
};
