import {
  Pressable,
  ClockIcon,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Icon,
  Text,
} from '@gluestack-ui/themed';
import {useTheme} from '../../../theme/useTheme';


type InputProps = {
  label?: string;
  value: string;
  onPress?:()=> void;
  isRequired?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
};

export const DateTime = (props: InputProps) => {
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
      <Pressable
      onPress={props.onPress}
        h={32}
        rounded={8}
        alignSelf='flex-start'
        px={12}
        flexDirection="row"
        alignItems="center"
        gap={5}
        bg={colors.light_blue}>
        <Icon as={ClockIcon} color={colors.primary} w={14} h={14} />
        <Text color={colors.primary} fontSize={14} fontWeight="$light">
          {props.label === 'Open' ? 'From' : 'To'}: {props.value}
        </Text>
      </Pressable>
    </FormControl>
  );
};
