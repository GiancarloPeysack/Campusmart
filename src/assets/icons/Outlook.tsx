import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export const Outlook = (props: any) => {
  return (
    <Svg width={18} height={20} fill="none" {...props}>
      <G clipPath="url(#prefix__clip0_412_1773)">
        <Path
          d="M.39 1.25h8.383v8.383H.391V1.25zm9.118 0h8.383v8.383H9.508V1.25zM.39 10.367h8.382v8.383H.391v-8.383zm9.117 0h8.383v8.383H9.508v-8.383z"
          fill="#000"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_412_1773">
          <Path d="M.39 0h17.5v20H.39V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}


