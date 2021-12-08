import "@emotion/react";

import { Palette } from "contexts/theme";

declare module "@emotion/react" {
  export interface Theme extends Palette {}
}
