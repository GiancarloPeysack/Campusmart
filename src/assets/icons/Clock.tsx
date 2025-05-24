import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const Clock = (props: any) => {
  return (
    <Svg width={60} height={60} fill="none" {...props}>
      <Path
        d="M30 0a30 30 0 110 60 30 30 0 010-60zm-2.813 14.063V30c0 .938.47 1.816 1.254 2.344l11.25 7.5a2.806 2.806 0 003.903-.785 2.804 2.804 0 00-.785-3.903L32.813 28.5V14.062A2.806 2.806 0 0030 11.25a2.806 2.806 0 00-2.813 2.813z"
        fill="#3B82F6"
      />
    </Svg>
  );
}
