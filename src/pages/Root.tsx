import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RestrictRoute, {
  isNotSignin,
  isSignin,
} from "components/common/RestrictRoute";
import MainLayout from "components/base/MainLayout";
import CenterLayout from "components/base/CenterLayout";

import Login from "./Login";
import Signup from "./Signup";
import Demo from "./Demo";
import Chatting from "./Chatting";
import RoomList from "./RoomList";

function Root() {
  return (
    <Routes>
      <Route
        path="/*"
        element={<RestrictRoute allow={isSignin} redirect="/login" />}
      >
        <Route path="*" element={<MainLayout />}>
          <Route path="demo" element={<Demo />} />
          <Route path="room" element={<RoomList />} />
          <Route path="room/:id" element={<Chatting />} />
          <Route path="*" element={<Navigate to="/room" />} />
        </Route>
      </Route>
      <Route
        path="/*"
        element={<RestrictRoute allow={isNotSignin} redirect="/" />}
      >
        <Route path="*" element={<CenterLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default Root;
