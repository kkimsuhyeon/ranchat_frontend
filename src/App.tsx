import React from "react";
import { Global } from "@emotion/react";
import { RecoilRoot } from "recoil";

import resetStyle from "contants/reset";

import Core from "containers/base/Core";

import Root from "pages/Root";

function App() {
  return (
    <RecoilRoot>
      <Global styles={resetStyle} />
      <Core />
      <Root />
    </RecoilRoot>
  );
}

export default App;
