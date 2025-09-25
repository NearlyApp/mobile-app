import { IInputProps } from '@components/ui/input';
import { TextInput } from 'react-native';
import { cn } from '~/lib/utils';

interface ITextareaProps extends IInputProps {}

export const Textarea: React.FC<ITextareaProps> = ({
  className,
  placeholderClassName,
  multiline,
  numberOfLines,
  ...props
}) => (
  <TextInput
    className={cn(
      'native:text-lg native:leading-[1.25] min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground web:flex web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 lg:text-sm',
      props.editable === false && 'opacity-50 web:cursor-not-allowed',
      className,
    )}
    placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
    multiline={multiline}
    numberOfLines={numberOfLines}
    textAlignVertical="top"
    {...props}
  />
);
