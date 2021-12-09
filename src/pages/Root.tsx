import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RestrictRoute, { isSignin } from "components/common/RestrictRoute";

import Login from "./Login";
import Demo from "./Demo";
import Chatting from "./Chatting";

function Root() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={<RestrictRoute allow={isSignin} redirect="/login" />}
      >
        <Route path="demo" element={<Demo />} />
        <Route path="chatting" element={<Chatting />} />
        <Route path="*" element={<Navigate to="/chatting" />} />
      </Route>
    </Routes>
  );
}

export default Root;
