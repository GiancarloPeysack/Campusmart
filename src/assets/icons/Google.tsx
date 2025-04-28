import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export const Google = (props: any) => {
  return (
    <Svg width={20} height={20} fill="none" {...props}>
      <G clipPath="url(#prefix__clip0_412_1767)">
        <Path
          d="M19.172 10.227c0 5.527-3.785 9.46-9.375 9.46A9.676 9.676 0 01.109 10 9.676 9.676 0 019.797.312c2.61 0 4.805.958 6.496 2.536l-2.637 2.535C10.207 2.055 3.793 4.555 3.793 10c0 3.379 2.7 6.117 6.004 6.117 3.836 0 5.273-2.75 5.5-4.176h-5.5V8.61h9.223c.09.496.152.973.152 1.618z"
          fill="#000"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_412_1767">
          <Path d="M.11 0h19.062v20H.109V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

