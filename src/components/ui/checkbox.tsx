import { Check } from '@/lib/icons/Check';
import { cn } from '@/lib/utils';
import * as CheckboxPrimitive from '@rn-primitives/checkbox';
import { forwardRef } from 'react';
import { Platform, View } from 'react-native';

interface ICheckboxProps extends CheckboxPrimitive.RootProps {
  ref?: React.RefObject<CheckboxPrimitive.RootRef>;
  disabled?: boolean;
  errored?: boolean;
}

export const Checkbox = forwardRef<View, ICheckboxProps>(
  ({ children, className, ...props }, ref) => (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        'web:peer native:h-[20] native:w-[20] native:rounded h-4 w-4 shrink-0 rounded-sm border border-primary disabled:cursor-not-allowed disabled:opacity-50 web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
        props.checked && 'bg-primary',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn('h-full w-full items-center justify-center')}
      >
        <Check
          size={12}
          strokeWidth={Platform.OS === 'web' ? 2.5 : 3.5}
          className="text-primary-foreground"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  ),
);
