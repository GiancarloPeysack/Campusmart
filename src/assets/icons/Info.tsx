import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const Info = (props: any) => {
  return (
    <Svg width={16} height={16} fill="none" {...props}>
      <Path
        d="M8 16A8 8 0 108-.001 8 8 0 008 16zm-1.25-5.5h.75v-2h-.75A.748.748 0 016 7.75c0-.416.334-.75.75-.75h1.5c.416 0 .75.334.75.75v2.75h.25c.416 0 .75.334.75.75s-.334.75-.75.75h-2.5a.748.748 0 01-.75-.75c0-.416.334-.75.75-.75zM8 4a1 1 0 110 2 1 1 0 010-2z"
        fill="#EF4444"
      />
    </Svg>
  );
}
