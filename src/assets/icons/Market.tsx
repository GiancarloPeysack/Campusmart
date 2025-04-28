import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export const Market = (props: any) => {
  const {color = '#9CA3AF' } = props;

  return (
    <Svg width={23} height={20} fill="none" {...props}>
      <G clipPath="url(#prefix__clip0_422_4750)">
        <G clipPath="url(#prefix__clip1_422_4750)">
          <Path
            d="M21.735 4.055L19.495.512A1.107 1.107 0 0018.563 0H4.625c-.379 0-.734.195-.933.512L1.449 4.055c-1.156 1.828-.132 4.37 2.028 4.664a3.425 3.425 0 003.02-1.102A3.425 3.425 0 009.042 8.75c1.02 0 1.926-.445 2.547-1.133a3.425 3.425 0 002.547 1.133 3.418 3.418 0 002.547-1.133 3.43 3.43 0 003.02 1.102c2.167-.29 3.195-2.832 2.034-4.664h-.003zm-1.872 5.902h-.003a4.717 4.717 0 01-2.016-.164V15h-12.5V9.79a4.663 4.663 0 01-2.027.167h-.004a4.52 4.52 0 01-.47-.09V17.5c0 1.379 1.122 2.5 2.5 2.5h12.5c1.38 0 2.5-1.121 2.5-2.5V9.867c-.155.04-.312.07-.48.09z"
            fill={color}
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_422_4750">
          <Path fill="#fff" transform="translate(.344)" d="M0 0h22.5v20H0z" />
        </ClipPath>
        <ClipPath id="prefix__clip1_422_4750">
          <Path d="M.344 0h22.5v20H.344V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

