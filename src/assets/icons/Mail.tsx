import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const Mail = (props: any) => {
  const {color ="#374151" } = props;
  return (
    <Svg width={16} height={16} fill="none" {...props}>
      <Path d="M0 0h16v16H0V0z" stroke="#E5E7EB" />
      <Path
        d="M1.5 2a1.5 1.5 0 00-.9 2.7l6.8 5.1c.356.266.844.266 1.2 0l6.8-5.1a1.5 1.5 0 00-.9-2.7h-13zM0 5.5V12c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V5.5l-6.8 5.1a1.997 1.997 0 01-2.4 0L0 5.5z"
        fill={color}
      />
    </Svg>
  );
}

