import {
  AlertCircleIcon,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Icon,
  Input,
  InputField,
  InputSlot,
  MailIcon,
} from '@gluestack-ui/themed';
import {useTheme} from '../../../theme/useTheme';
import { KeyboardType } from 'react-native';

type InputProps = {
  type?: 'text' | 'password';
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPressIcon?: () => void;
  muliline?: boolean;
  error?: string;
  onBlur?: () => void;
  onChangeText?: (text: string) => void;
  value?: string | number;
  isRequired?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  keyboardType?: KeyboardType;
};

export const InputFiled = (props: InputProps) => {
  const {colors} = useTheme();
  return (
    <FormControl
      flex={1}
      isDisabled={props.isDisabled}
      isInvalid={props.isInvalid}
      isReadOnly={false}
      isRequired={props.isRequired}>
      {props.label && (
        <FormControlLabel mb="$2">
          <FormControlLabelText fontSize={14} fontWeight="$medium">
            {props.label}
          </FormControlLabelText>
        </FormControlLabel>
      )}
      <Input
        h={props.muliline ? 96 : 50}
        bg={props.label ? colors.white : colors.gray6}
        rounded={12}
        py={props.muliline ? 10 : 0}
        borderWidth={1}
        borderColor={props.label ? colors.buttonGray : '#E5E5E5'}
        $focus-borderColor={colors.primary}>
        {props.rightIcon && <InputSlot ml="$3">{props.rightIcon}</InputSlot>}
        <InputField
          onBlur={props.onBlur}
          onChangeText={props.onChangeText}
          multiline={props.muliline}
          type={props.type}
          autoCorrect={false}
          autoCapitalize='none'
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          placeholderTextColor="#ADAEBC"
          keyboardType={props.keyboardType}
        />
        <InputSlot onPress={props.onPressIcon} mr="$3">
          {props.icon}
        </InputSlot>
      </Input>
      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon} />
        <FormControlErrorText>{props.error}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
};
