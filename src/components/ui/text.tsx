import * as Slot from '@rn-primitives/slot';
import { cva, VariantProps } from 'class-variance-authority';
import { createContext, useContext } from 'react';
import { Text as RNText } from 'react-native';
import { cn } from '~/lib/utils';

export const TextClassContext = createContext<string | undefined>(undefined);

const textVariants = cva('text-foreground', {
  variants: {
    size: {
      displayLg: 'text-display-lg',
      displayMd: 'text-display-md',
      displaySm: 'text-display-sm',
      headlineLg: 'text-headline-lg',
      headlineMd: 'text-headline-md',
      headlineSm: 'text-headline-sm',
      titleLg: 'text-title-lg',
      titleMd: 'text-title-md',
      titleSm: 'text-title-sm',
      bodyLg: 'text-body-lg',
      bodyMd: 'text-body-md',
      bodySm: 'text-body-sm',
      labelLg: 'text-label-lg',
      labelMd: 'text-label-md',
      labelSm: 'text-label-sm',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    size: 'bodyMd',
    weight: 'normal',
  },
});

interface ITextProps
  extends React.ComponentProps<typeof RNText>,
    VariantProps<typeof textVariants> {
  ref?: React.RefObject<RNText>;
  asChild?: boolean;
}

export const Text: React.FC<ITextProps> = ({
  className,
  asChild = false,
  size,
  weight,
  ...props
}) => {
  const textClass = useContext(TextClassContext);
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      className={cn(textVariants({ size, weight }), textClass, className)}
      {...props}
    />
  );
};
