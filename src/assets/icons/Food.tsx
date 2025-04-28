import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export const Food = (props: any) => {
  const {color = '#9CA3AF' } = props;
  
  return (
    <Svg width={18} height={20} fill="none" {...props}>
      <G clipPath="url(#prefix__clip0_473_6)">
        <Path
          d="M16.297 0c-.625 0-5 1.25-5 6.875v4.375c0 1.379 1.121 2.5 2.5 2.5h1.25v5c0 .691.558 1.25 1.25 1.25.691 0 1.25-.559 1.25-1.25V1.25c0-.691-.559-1.25-1.25-1.25zM2.547.625a.623.623 0 00-.559-.621.622.622 0 00-.675.484L.129 5.813a3.438 3.438 0 003.043 4.171v8.766c0 .691.558 1.25 1.25 1.25.691 0 1.25-.559 1.25-1.25V9.984a3.44 3.44 0 003.043-4.171L7.53.487a.625.625 0 00-1.234.137v5.242a.383.383 0 01-.766.031L5.043.57A.622.622 0 004.422 0 .622.622 0 003.8.57l-.485 5.328a.383.383 0 01-.766-.031V.625h-.003zm1.887 5.938H4.41l.012-.028.012.027z"
          fill={color} 
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_473_6">
          <Path d="M.047 0h17.5v20H.047V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
