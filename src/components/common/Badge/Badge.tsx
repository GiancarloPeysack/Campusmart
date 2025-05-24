import React, {ReactNode} from 'react';
import {useTheme} from '../../../theme/useTheme';
import {Box, Text} from '@gluestack-ui/themed';

type BadgeProps = {
  text: string;
  icon?: ReactNode;
  color ?: string;
  bg ?: string
};

export const Badge = (props: BadgeProps): React.JSX.Element => {
  const {colors} = useTheme();
  const {bg = colors.buttonGray, color = colors.title} = props;

  return (
    <Box
      bg={bg}
      py={6}
      px={12}
      rounded={20}
      flexDirection="row"
      alignItems="center"
      gap={5}>
      {props.icon}
      <Text fontSize={14} color={color}>
        {props.text}
      </Text>
    </Box>
  );
};
