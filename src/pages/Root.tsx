import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RestrictRoute, {
  isNotSignin,
  isSignin,
} from "components/common/RestrictRoute";

import BaseLayout from "containers/base/BaseLayout";

import Login from "./Login";
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
        <Route path="*" element={<BaseLayout />}>
          <Route path="demo" element={<Demo />} />
          <Route path="room/*" element={<RoomList />}>
            <Route path=":id" element={<Chatting />} />
          </Route>
          <Route path="*" element={<Navigate to="/room" />} />
        </Route>
      </Route>
      <Route
        path="/*"
        element={<RestrictRoute allow={isNotSignin} redirect="/" />}
      >
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default Root;
