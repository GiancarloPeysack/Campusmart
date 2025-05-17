import {Button, ButtonIcon, ButtonText, Spinner} from '@gluestack-ui/themed';
import React from 'react';
import {useTheme} from '../../../theme/useTheme';

type ButtonVariants = 'primary' | 'success' | 'outlined' | 'secondry';

type ButtonProps = {
  text: string;
  onPress?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  variant?: ButtonVariants;
  rightIcon?:React.ReactNode;
  borderStyle?: 'solid' | 'dotted' | 'dashed';
  borderColor?: string;
  bgColor?: string;
  width?: 'full' | '50%';
  color?: string,
  isLoading?: boolean;
};

export const PrimaryButton = (props: ButtonProps): React.JSX.Element => {
  const {colors} = useTheme();

  const getButtonStyles = () => {
    switch (props.variant) {
      case 'primary':
        return {
          bg: colors.primary,
          textColor: colors.white,
          shadowOpacity: 0
        };
      case 'secondry':
        return {
          bg: '#F3F4F6',
          textColor: '$black',
          shadowOpacity: 0
        };
      case 'success':
        return {
          bg: colors.buttonGray,
          textColor: '$black',
          shadowOpacity: 0.5
        };
      case 'outlined':
        return {
          bg: props.bgColor,
          textColor: props.color,
          borderWidth:2,
          borderColor: props.borderColor,
          shadowOpacity: 0
        };
      default:
        return {
          bg: colors.primary,
          textColor: colors.white,
          shadowOpacity: 0.5
        };
    }
  };

  const styles = getButtonStyles();

  return (
    <Button
      $active-opacity={0.8}
      onPress={props.onPress}
      disabled={props.disabled}
      bg={props.disabled ? colors.gray1 : styles.bg}
      rounded={8}
      w={props.width === '50%' ? 170 : '$full'}
      h={48}
      alignItems='center' gap={10}
      shadowColor='#1D4ED8'
      shadowOpacity={props.disabled ? 0 : styles.shadowOpacity}
      shadowOffset={{height:2, width: 2}}
      shadowRadius={8}
      borderWidth={styles.borderWidth}
      borderColor={styles.borderColor}
      borderStyle={props.borderStyle}
      >
      {props.icon && props.icon}
      {props.isLoading ? <Spinner color={colors.white} /> :  <ButtonText fontSize={16} fontWeight="$medium" color={props.disabled ? colors.gray5 : styles.textColor}>
        {props.text}
      </ButtonText>}
     
      {props.rightIcon && props.rightIcon}
    </Button>
  );
};
