import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export const Tag = (props: any) => {
  return (
    <Svg width={13} height={15} fill="none" {...props}>
      <G clipPath="url(#prefix__clip0_39_839)">
        <Path
          d="M.75 2.937v4.088c0 .465.183.91.511 1.239l4.813 4.813a1.75 1.75 0 002.474 0l3.65-3.65a1.75 1.75 0 000-2.475L7.387 2.139a1.75 1.75 0 00-1.238-.511H2.063A1.309 1.309 0 00.75 2.938zm3.063.875a.875.875 0 110 1.75.875.875 0 010-1.75z"
          fill="#4B5563"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_39_839">
          <Path d="M.75.75H13v14H.75v-14z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

