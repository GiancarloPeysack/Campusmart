import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export const Trash = (props: any) => {
  return (
    <Svg width={14} height={16} fill="none" {...props}>
      <G clipPath="url(#prefix__clip0_85_762)">
        <Path
          d="M4.225.553A.996.996 0 015.119 0H8.88c.378 0 .725.212.894.553L10 1h3a.999.999 0 110 2H1a.999.999 0 110-2h3l.225-.447zM1 4h12v10c0 1.103-.897 2-2 2H3c-1.103 0-2-.897-2-2V4zm3 2c-.275 0-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7c0-.275-.225-.5-.5-.5zm3 0c-.275 0-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7c0-.275-.225-.5-.5-.5zm3 0c-.275 0-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7c0-.275-.225-.5-.5-.5z"
          fill="#EF4444"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_85_762">
          <Path d="M0 0h14v16H0V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

