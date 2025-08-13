import { Text } from '@components/ui/text';
import {
  FormContext,
  FormFieldContext,
  useFormContext,
  useFormMessage,
} from '@hooks/form';
import { cn } from '@lib/utils';
import { ClassValue } from 'clsx';
import {
  Controller,
  ControllerProps,
  FieldValues,
  Path,
  UseFormReturn,
} from 'react-hook-form';
import { TextInputProps, View, ViewProps } from 'react-native';

interface IFormProps<T extends FieldValues>
  extends React.PropsWithChildren,
    UseFormReturn<T> {
  className?: ClassValue;
}

export function Form<T extends FieldValues>({
  className,
  ...props
}: IFormProps<T>) {
  return (
    <FormContext.Provider value={props as UseFormReturn<FieldValues>}>
      <View
        className={cn('flex flex-col items-stretch gap-4', className)}
        {...props}
      />
    </FormContext.Provider>
  );
}

interface IFormItemProps extends ViewProps {}

export const FormItem: React.FC<IFormItemProps> = ({ className, ...props }) => (
  <View className={cn('flex flex-col gap-2', className)} {...props} />
);

interface IFormLabelProps extends TextInputProps {}

export const FormLabel: React.FC<IFormLabelProps> = ({
  className,
  ...props
}) =>
  props.children ? (
    <Text
      size="labelSm"
      className={cn('text-muted-foreground', className)}
      accessibilityRole="text"
      {...props}
    />
  ) : null;

interface IFormMessageProps extends TextInputProps {}

export const FormMessage: React.FC<IFormMessageProps> = ({
  className,
  children,
  ...props
}) => {
  const { message } = useFormMessage({
    value: children,
  });

  return message ? (
    <Text
      size="labelSm"
      className={cn('text-red-500', className)}
      accessibilityRole="alert"
      {...props}
    >
      {message}
    </Text>
  ) : null;
};

// type RenderParameters<TFieldValues extends FieldValues> = Parameters<
//   ControllerProps<TFieldValues>['render']
// >[0];

interface IFormFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control?: UseFormReturn<TFieldValues>['control'];
  render: ControllerProps<TFieldValues>['render'];
  // render: (params: {
  //   field: Omit<RenderParameters<TFieldValues>['field'], 'onChange'> & {
  //     onChangeText: (value: string) => void;
  //   };
  //   fieldState: RenderParameters<TFieldValues>['fieldState'];
  //   formState: RenderParameters<TFieldValues>['formState'];
  // }) => React.ReactElement;
}

export function FormField<TFieldValues extends FieldValues>({
  control,
  name,
  render,
}: IFormFieldProps<TFieldValues>) {
  const { control: ctxControl } = useFormContext();

  let _control = control || ctxControl;

  if (!_control)
    throw new Error(
      'FormField must be used within a Form component or with a control prop',
    );

  return (
    <FormFieldContext.Provider value={{ path: name }}>
      <Controller
        control={control}
        name={name}
        render={render}
        // render={({ field, fieldState, formState }) => {
        //   const { onChange, ...restField } = field;
        //   return render({
        //     field: {
        //       ...restField,
        //       onChangeText: (value: string) => onChange({ target: { value } }),
        //     },
        //     fieldState,
        //     formState,
        //   });
        // }}
      />
    </FormFieldContext.Provider>
  );
}
