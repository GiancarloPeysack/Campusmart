import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export const Adjustment = (props: any) => {
  return (
    <Svg width={17} height={16} fill="none" {...props}>
      <G clipPath="url(#prefix__clip0_39_1803)">
        <G clipPath="url(#prefix__clip1_39_1803)">
          <Path
            d="M.984 13c0 .553.447 1 1 1h1.71a2.495 2.495 0 002.29 1.5A2.495 2.495 0 008.275 14h7.71a.999.999 0 100-2h-7.71a2.495 2.495 0 00-2.29-1.5A2.495 2.495 0 003.693 12h-1.71c-.553 0-1 .447-1 1zm4 0a1 1 0 112 0 1 1 0 01-2 0zm6-5a1 1 0 112 0 1 1 0 01-2 0zm1-2.5A2.495 2.495 0 009.694 7h-7.71a.999.999 0 100 2h7.71a2.495 2.495 0 002.29 1.5A2.495 2.495 0 0014.275 9h1.71a.999.999 0 100-2h-1.71a2.495 2.495 0 00-2.29-1.5zm-5-1.5a1 1 0 110-2 1 1 0 010 2zm2.291-2A2.495 2.495 0 006.985.5 2.495 2.495 0 004.693 2h-2.71a.999.999 0 100 2h2.71a2.495 2.495 0 002.29 1.5A2.495 2.495 0 009.275 4h6.71a.999.999 0 100-2h-6.71z"
            fill="#374151"
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_39_1803">
          <Path fill="#fff" transform="translate(.984)" d="M0 0h16v16H0z" />
        </ClipPath>
        <ClipPath id="prefix__clip1_39_1803">
          <Path d="M.984 0h16v16h-16V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

