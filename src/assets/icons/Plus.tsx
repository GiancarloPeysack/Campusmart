import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export const Plus = (props: any) => {
  return (
    <Svg width={18} height={20} fill="none" {...props}>
      <G clipPath="url(#prefix__clip0_422_4745)">
        <Path
          d="M10.234 3.125c0-.691-.558-1.25-1.25-1.25-.691 0-1.25.559-1.25 1.25V8.75H2.11C1.418 8.75.86 9.309.86 10s.559 1.25 1.25 1.25h5.625v5.625c0 .691.559 1.25 1.25 1.25.692 0 1.25-.559 1.25-1.25V11.25h5.625c.692 0 1.25-.559 1.25-1.25s-.558-1.25-1.25-1.25h-5.625V3.125z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_422_4745">
          <Path d="M.234 0h17.5v20H.234V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

