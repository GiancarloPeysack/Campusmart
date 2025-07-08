import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";

export const Shield = (props: any) => {
    const { color = "#2563EB", ...restProps } = props;

    return (
        <Svg
            width={17}
            height={16}
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...restProps}
        >
            <Defs>
                <ClipPath id="clip0_39_2381">
                    <Rect width="16" height="16" fill="white" transform="translate(0.21875)" />
                </ClipPath>
                <ClipPath id="clip1_39_2381">
                    <Rect x="0.21875" y="0" width="16" height="16" fill="white" />
                </ClipPath>
            </Defs>
            <G clipPath="url(#clip0_39_2381)">
                <G clipPath="url(#clip1_39_2381)">
                    <Path
                        d="M8.21876 0C8.36251 0 8.50626 0.03125 8.63751 0.090625L14.5219 2.5875C15.2094 2.87813 15.7219 3.55625 15.7188 4.375C15.7031 7.475 14.4281 13.1469 9.04376 15.725C8.52189 15.975 7.91564 15.975 7.39376 15.725C2.00939 13.1469 0.734389 7.475 0.718764 4.375C0.715639 3.55625 1.22814 2.87813 1.91564 2.5875L7.80314 0.090625C7.93126 0.03125 8.07501 0 8.21876 0ZM8.21876 2.0875V13.9C12.5313 11.8125 13.6906 7.19062 13.7188 4.41875L8.21876 2.0875Z"
                        fill={color}
                    />
                </G>
            </G>
        </Svg>
    );
};
