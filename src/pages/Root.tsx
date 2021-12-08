import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Demo from "./Demo";
import Chatting from "./Chatting";

function Root() {
  return (
    <Routes>
      <Route path="/demo" element={<Demo />} />
      <Route path="/chatting" element={<Chatting />} />
      <Route path="*" element={<Navigate to="/chatting" />} />
    </Routes>
  );
}

export default Root;
