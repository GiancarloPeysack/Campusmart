import {
  AlertCircleIcon,
  ChevronDownIcon,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Icon,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '@gluestack-ui/themed';
import { useTheme } from '../../theme/useTheme';
import { ScrollView } from 'react-native';

type item = {
  label: string;
  value: string
}

type InputProps = {
  placeholder: string;
  label?: string;
  error?: string;
  onBlur?: () => void;
  value?: string | number;
  onValueChange?: (value: string) => any;
  isRequired?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  data: item[],
};

export const Selector = (props: InputProps) => {
  const { colors } = useTheme();
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
      <Select isRequired onValueChange={props.onValueChange} selectedValue={props.value}>
        <SelectTrigger
          borderColor={colors.buttonGray}
          h={50}
          $focus-borderColor={colors.primary}
          rounded={12}>
          <SelectInput
            placeholder={props.placeholder}
            placeholderTextColor="#ADAEBC"
          />
          <SelectIcon mr="$3">
            <Icon as={ChevronDownIcon} />
          </SelectIcon>
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            <ScrollView style={{ width: '100%' }}>
              {props.data.map((item, index) => (
                <SelectItem key={index} label={item.label} value={item.value} />
              ))}</ScrollView>
          </SelectContent>
        </SelectPortal>
      </Select>
      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon} />
        <FormControlErrorText>{props.error}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
};
