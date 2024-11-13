import { Navigate, Outlet, RouteObject } from "react-router-dom";

export default function ProtectedRoute({
  children,
  isAllowed,
  redirectPath = '/',
}: {
  children?: RouteObject;
  isAllowed: boolean;
  redirectPath: string;
}): any {
  if (!isAllowed) return <Navigate to={redirectPath} replace />;
  return children || <Outlet />;
}