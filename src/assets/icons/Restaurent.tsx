import Svg, { Path, G, ClipPath, Defs, type SvgProps } from "react-native-svg";

export const Restaurent = (props: any) => {
  return (
    <Svg width="18" height="16" fill="none" viewBox="0 0 18 16" {...props}>
      <G clipPath="url(#a)">
        <Path
          fill="#9CA3AF"
          d="M17.112 3.244 15.322.409A.89.89 0 0 0 14.575 0H3.425a.89.89 0 0 0-.747.41L.884 3.243C-.04 4.706.778 6.74 2.506 6.975q.189.024.378.025a2.74 2.74 0 0 0 2.038-.906A2.74 2.74 0 0 0 6.959 7a2.74 2.74 0 0 0 2.038-.906A2.74 2.74 0 0 0 11.034 7c.82 0 1.54-.356 2.038-.906a2.75 2.75 0 0 0 2.415.881c1.735-.231 2.557-2.266 1.629-3.731zm-1.496 4.722h-.004A3.775 3.775 0 0 1 14 7.835V12H4V7.831a3.7 3.7 0 0 1-1.622.135h-.003A4 4 0 0 1 2 7.894V14c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V7.894c-.125.031-.25.056-.384.072"
        />
      </G>
      <Defs>
        <ClipPath>
          <Path fill="#fff" d="M0 0h18v16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
