import { Input } from '@components/ui/input';
import { Text } from '@components/ui/text';
import { cn } from '@lib/utils';
import { ClassValue } from 'clsx';
import { useMemo } from 'react';
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  FormState,
  Path,
} from 'react-hook-form';
import { TextInputProps, View } from 'react-native';

type FormLabelProps = TextInputProps & {
  className?: ClassValue;
};

export const FormLabel: React.FC<FormLabelProps> = ({ className, ...props }) =>
  props.children ? (
    <Text
      className={cn('text-sm text-muted-foreground', className)}
      accessibilityRole="text"
      {...props}
    />
  ) : null;

type FormMessageProps = TextInputProps & {
  className?: ClassValue;
};

export const FormMessage: React.FC<FormMessageProps> = ({
  className,
  ...props
}) =>
  props.children ? (
    <Text
      className={cn('text-sm text-red-500', className)}
      accessibilityRole="alert"
      {...props}
    />
  ) : null;

type FormFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  formState: FormState<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  error?: FieldError | string | undefined;
} & Omit<TextInputProps, 'onChangeText' | 'value' | 'onBlur'>;

export function FormField<TFieldValues extends FieldValues>({
  control,
  formState,
  name,
  label,
  error,
  accessibilityLabel,
  ...props
}: FormFieldProps<TFieldValues>) {
  const errorMessage = useMemo(() => {
    if (typeof error === 'string') return error;
    if (error && typeof error === 'object' && 'message' in error) {
      return typeof error.message === 'string' ? error.message : undefined;
    }

    const fieldError = formState.errors[name];
    if (fieldError?.message) {
      return typeof fieldError.message === 'string'
        ? fieldError.message
        : String(fieldError.message);
    }

    return undefined;
  }, [error, formState.errors, name]);

  return (
    <View className="flex flex-col gap-2">
      <FormLabel>{label}</FormLabel>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value, disabled } }) => (
          <Input
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            errored={!!error || !!control._formState.errors[name]}
            disabled={disabled}
            accessibilityLabel={accessibilityLabel || label}
            {...props}
          />
        )}
      />
      <FormMessage>{errorMessage}</FormMessage>
    </View>
  );
}
