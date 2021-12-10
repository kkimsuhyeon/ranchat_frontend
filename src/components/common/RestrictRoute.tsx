import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export interface RestrictRouteProps {
  allow?: () => boolean;
  redirect?: string;
}

function RestrictRoute({ allow, redirect = "/" }: RestrictRouteProps) {
  if (allow && allow() === false) return <Navigate to={redirect} />;
  return <Outlet />;
}

export default RestrictRoute;

export function isSignin() {
  return localStorage.getItem("token") !== null;
}

export function isNotSignin() {
  return localStorage.getItem("token") === null;
}
