import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export const Inbox = (props: any) => {
  return (
    <Svg width={21} height={20} fill="none" {...props}>
      <G clipPath="url(#prefix__clip0_39_1878)">
        <G clipPath="url(#prefix__clip1_39_1878)">
          <Path
            d="M4.742 1.25a2.499 2.499 0 00-2.426 1.895L.09 12.047c-.05.2-.074.402-.074.605v3.598c0 1.379 1.12 2.5 2.5 2.5h15c1.379 0 2.5-1.121 2.5-2.5v-3.598c0-.203-.024-.406-.075-.605l-2.226-8.902a2.499 2.499 0 00-2.426-1.895H4.742zm0 2.5H15.29l1.875 7.5h-2c-.473 0-.906.266-1.117.691l-.559 1.118a1.252 1.252 0 01-1.117.691H7.664c-.473 0-.906-.266-1.117-.691l-.559-1.118a1.252 1.252 0 00-1.117-.691H2.867l1.875-7.5z"
            fill="#9CA3AF"
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_39_1878">
          <Path fill="#fff" transform="translate(.016)" d="M0 0h20v20H0z" />
        </ClipPath>
        <ClipPath id="prefix__clip1_39_1878">
          <Path d="M.016 0h20v20h-20V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}


