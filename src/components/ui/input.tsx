import { cn } from '@lib/utils';
import { forwardRef } from 'react';
import { TextInput, type TextInputProps } from 'react-native';

interface IInputProps extends TextInputProps {
  ref?: React.RefObject<TextInput>;
  disabled?: boolean;
  errored?: boolean;
}

export const Input = forwardRef<TextInput, IInputProps>(
  ({ className, placeholderClassName, ...props }, ref) => (
    <TextInput
      ref={ref}
      className={cn(
        'native:h-12 native:text-lg native:leading-[1.25] h-10 rounded-md border border-input bg-background px-3 text-base text-foreground file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground web:flex web:w-full web:py-2 web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 lg:text-sm',
        props.editable === false && 'opacity-50 web:cursor-not-allowed',
        className,
      )}
      placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
      {...props}
    />
  ),
);
