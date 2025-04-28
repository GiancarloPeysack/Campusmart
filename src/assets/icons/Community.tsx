import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export const Community = (props: any) => {
  const {color = '#9CA3AF' } = props;

  return (
    <Svg width={26} height={20} fill="none" {...props}>
      <G clipPath="url(#prefix__clip0_422_4755)">
        <G clipPath="url(#prefix__clip1_422_4755)">
          <Path
            d="M6.313 0a3.125 3.125 0 110 6.25 3.125 3.125 0 010-6.25zm14.375 0a3.125 3.125 0 110 6.25 3.125 3.125 0 010-6.25zm-20 11.668A4.17 4.17 0 014.854 7.5h1.668c.622 0 1.211.137 1.743.379A5.002 5.002 0 009.883 12.5H1.52a.835.835 0 01-.833-.832zm15.832.832h-.028a4.988 4.988 0 001.692-3.75c0-.297-.028-.586-.075-.871a4.13 4.13 0 011.743-.379h1.668a4.17 4.17 0 014.168 4.168c0 .46-.375.832-.832.832h-8.337zM9.438 8.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zm-3.75 10.207a5.208 5.208 0 015.207-5.207h4.585a5.208 5.208 0 015.207 5.207c0 .574-.464 1.043-1.043 1.043H6.73a1.043 1.043 0 01-1.043-1.043z"
            fill={color}
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_422_4755">
          <Path fill="#fff" transform="translate(.688)" d="M0 0h25v20H0z" />
        </ClipPath>
        <ClipPath id="prefix__clip1_422_4755">
          <Path d="M.688 0h25v20h-25V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
