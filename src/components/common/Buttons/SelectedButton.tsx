import {Center, Pressable, Text} from '@gluestack-ui/themed';
import React from 'react';
import {useTheme} from '../../../theme/useTheme';

type ButtonProps = {
  text: string;
  selected?: boolean;
  fullWidth?: boolean;
  onPress?: () => void;
};

export const SelectedButton = (props: ButtonProps): React.JSX.Element => {
  const {colors} = useTheme();
  return (
    <Pressable
      onPress={props.onPress}
      rounded={12}
      h={48}
      w={props.fullWidth ? '$full' : 173}
      borderWidth={props.selected ? 2 : 1}
      borderColor={props.selected ? colors.primary : colors.gray1}>
      <Center flex={1}>
        <Text
          fontWeight="$light"
          fontSize={14}
          color={props.selected ? colors.primary : colors.title}>
          {props.text}
        </Text>
      </Center>
    </Pressable>
  );
};
