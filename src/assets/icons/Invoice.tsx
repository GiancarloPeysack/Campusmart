import * as React from "react";
import Svg, { Path, G, Defs, ClipPath } from "react-native-svg";

export const Invoice = (props: any) => {
  return (
    <Svg width={28} height={32} fill="none" {...props}>
      <Path
        d="M20 0a8 8 0 018 8v16a8 8 0 01-8 8H8a8 8 0 01-8-8V8a8 8 0 018-8h12z"
        fill="#DBEAFE"
      />
      <Path
        d="M20 0a8 8 0 018 8v16a8 8 0 01-8 8H8a8 8 0 01-8-8V8a8 8 0 018-8h12z"
        stroke="#E5E7EB"
      />
      <Path d="M20 25H8V8h12v17z" stroke="#E5E7EB" />
      <G clipPath="url(#prefix__clip0_86_3603)">
        <Path
          d="M8.438 8.069a.749.749 0 01.8.112L10.5 9.262l1.262-1.08a.749.749 0 01.976 0L14 9.261l1.262-1.08a.749.749 0 01.976 0l1.262 1.08 1.262-1.08A.749.749 0 0120 8.75v14.5a.75.75 0 01-1.238.569L17.5 22.738l-1.262 1.08a.749.749 0 01-.976 0L14 22.739l-1.262 1.08a.749.749 0 01-.976 0l-1.262-1.08-1.262 1.08A.749.749 0 018 23.25V8.75a.75.75 0 01.438-.681zM11 12.5c-.275 0-.5.225-.5.5s.225.5.5.5h6c.275 0 .5-.225.5-.5s-.225-.5-.5-.5h-6zm-.5 6.5c0 .275.225.5.5.5h6c.275 0 .5-.225.5-.5s-.225-.5-.5-.5h-6c-.275 0-.5.225-.5.5zm.5-3.5c-.275 0-.5.225-.5.5s.225.5.5.5h6c.275 0 .5-.225.5-.5s-.225-.5-.5-.5h-6z"
          fill="#2563EB"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_86_3603">
          <Path d="M8 8h12v16H8V8z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

