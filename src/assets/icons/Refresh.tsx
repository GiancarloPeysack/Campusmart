import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const Refresh = (props: any) => {
  return (
    <Svg width={15} height={14} fill="none" {...props}>
      <Path
        d="M13.984 6h.266c.415 0 .75-.334.75-.75v-4a.749.749 0 00-1.281-.531l-1.3 1.3a6.999 6.999 0 00-9.87.031 7 7 0 000 9.9 7 7 0 009.9 0 1.002 1.002 0 00-1.415-1.416 5 5 0 11-7.072-7.072 5 5 0 017.04-.03L9.72 4.718A.751.751 0 0010.249 6h3.735z"
        fill="#fff"
      />
    </Svg>
  );
}

