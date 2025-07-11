import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const Resend = (props:any) => {
  return (
    <Svg width={16} height={14} fill="none" {...props}>
      <Path
        d="M4.544 3.466a5 5 0 017.04-.032L10.297 4.72A.751.751 0 0010.828 6h4c.416 0 .75-.334.75-.75v-4a.749.749 0 00-1.281-.531l-1.3 1.3a6.999 6.999 0 00-11.519 2.65 1 1 0 001.884.665 4.949 4.949 0 011.182-1.868zM.578 8.75v4a.749.749 0 001.281.531l1.3-1.3a6.998 6.998 0 009.87-.031 6.98 6.98 0 001.652-2.616 1 1 0 00-1.884-.665 4.95 4.95 0 01-1.181 1.868 5 5 0 01-7.041.032L5.859 9.28A.751.751 0 005.33 8h-4a.748.748 0 00-.75.75z"
        fill="#2563EB"
      />
    </Svg>
  );
}

