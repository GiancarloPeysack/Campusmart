import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export const UserFill = (props: any) => {
  return (
    <Svg width={13} height={14} fill="none" {...props}>
      <G clipPath="url(#prefix__clip0_235_204)">
        <Path
          d="M6.328 7a3.5 3.5 0 100-7 3.5 3.5 0 000 7zm-1.25 1.313a4.874 4.874 0 00-4.875 4.875c0 .448.364.812.812.812h10.626a.812.812 0 00.812-.812 4.874 4.874 0 00-4.875-4.876h-2.5z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_235_204">
          <Path d="M.203 0h12.25v14H.203V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

