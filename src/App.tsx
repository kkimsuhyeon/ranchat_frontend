import React from "react";
import { Global } from "@emotion/react";

import resetStyle from "contants/reset";

import Root from "pages/Root";

function App() {
  return (
    <>
      <Global styles={resetStyle} />
      <Root />
    </>
  );
}

export default App;
