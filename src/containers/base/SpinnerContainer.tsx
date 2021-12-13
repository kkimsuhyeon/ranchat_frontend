import React from "react";

import useSpinner from "hooks/useSpinner";

import Overlay from "components/common/Overlay";
import Spinner from "components/common/Spinner";

function SpinnerContainer() {
  const [, isOpen] = useSpinner();

  return (
    <Overlay isOpen={isOpen}>
      <Spinner />
    </Overlay>
  );
}

export default SpinnerContainer;
