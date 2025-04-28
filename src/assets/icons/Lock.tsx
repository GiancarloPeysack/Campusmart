import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const Lock = (props: any) => {
  return (
    <Svg width={13} height={14} fill="none" {...props}>
      <Path
        d="M4.328 3.938V5.25h4.375V3.937a2.187 2.187 0 10-4.375 0zM2.578 5.25V3.937a3.939 3.939 0 017.875 0V5.25h.438c.965 0 1.75.785 1.75 1.75v5.25c0 .965-.785 1.75-1.75 1.75H2.14c-.966 0-1.75-.785-1.75-1.75V7c0-.965.784-1.75 1.75-1.75h.437z"
        fill="#fff"
      />
    </Svg>
  );
}
