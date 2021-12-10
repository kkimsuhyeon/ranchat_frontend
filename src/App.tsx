import React from "react";
import { Global } from "@emotion/react";
import { RecoilRoot } from "recoil";

import resetStyle from "contants/reset";

import Root from "pages/Root";

function App() {
  return (
    <RecoilRoot>
      <Global styles={resetStyle} />
      <Root />
    </RecoilRoot>
  );
}

export default App;
