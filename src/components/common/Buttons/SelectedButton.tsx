import {Center, Pressable, Text} from '@gluestack-ui/themed';
import React from 'react';
import {useTheme} from '../../../theme/useTheme';
import { Dimensions } from 'react-native';

type ButtonProps = {
  text: string;
  selected?: string | null;
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
      w={props.fullWidth ? '$full' : Dimensions.get('window').width/2.25}
      borderWidth={props.selected === props.text ? 2 : 1}
      borderColor={props.selected=== props.text ? colors.primary : colors.gray1}>
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
