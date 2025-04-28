import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export const Cart = (props: any) => {
  const {color = '#9CA3AF' } = props;

  return (
    <Svg width={23} height={20} fill="none" {...props}>
      <G clipPath="url(#prefix__clip0_422_4739)">
        <G clipPath="url(#prefix__clip1_422_4739)">
          <Path
            d="M.14.938C.14.417.56 0 1.079 0h1.777c.86 0 1.622.5 1.977 1.25h16.055c1.027 0 1.777.977 1.508 1.969l-1.602 5.949a2.817 2.817 0 01-2.715 2.082H6.808l.212 1.113a.941.941 0 00.921.762h11.262c.52 0 .938.418.938.938 0 .519-.418.937-.938.937H7.941a2.81 2.81 0 01-2.761-2.285L3.164 2.129a.31.31 0 00-.309-.254H1.078A.935.935 0 01.141.937zm5 17.187a1.875 1.875 0 113.75 0 1.875 1.875 0 01-3.75 0zm13.126-1.875a1.875 1.875 0 110 3.75 1.875 1.875 0 010-3.75z"
            fill={color}
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_422_4739">
          <Path fill="#fff" transform="translate(.14)" d="M0 0h22.5v20H0z" />
        </ClipPath>
        <ClipPath id="prefix__clip1_422_4739">
          <Path d="M.14 0h22.5v20H.14V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}


