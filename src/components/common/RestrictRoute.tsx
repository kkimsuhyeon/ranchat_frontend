import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import useUserInfo from "hooks/useUserInfo";

export interface RestrictRouteProps {
  allow?: () => boolean;
  redirect?: string;
}

function RestrictRoute({ allow, redirect = "/" }: RestrictRouteProps) {
  const token = localStorage.getItem("token");

  const setter = useUserInfo();

  if (token !== null) setter(token);

  if (allow && allow() === false) return <Navigate to={redirect} />;
  return <Outlet />;
}

export default RestrictRoute;

export function isSignin() {
  return localStorage.getItem("token") !== null;
}
