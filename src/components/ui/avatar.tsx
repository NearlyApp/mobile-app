import { cn } from '@lib/utils';
import * as AvatarPrimitive from '@rn-primitives/avatar';
import { cva, VariantProps } from 'class-variance-authority';

const avatarVariants = cva(
  'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        xxs: 'h-4 w-4', // 16px
        xs: 'h-5 w-5', // 20px
        sm: 'h-8 w-8', // 32px
        md: 'h-10 w-10', // 40px
        lg: 'h-12 w-12', // 48px
        xl: 'h-14 w-14', // 56px
        '2xl': 'h-16 w-16', // 64px
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

interface IAvatarProps
  extends AvatarPrimitive.RootProps,
    VariantProps<typeof avatarVariants> {}

export const Avatar: React.FC<IAvatarProps> = ({
  className,
  size,
  ...props
}) => (
  <AvatarPrimitive.Root
    className={cn(avatarVariants({ size }), className)}
    {...props}
  />
);

interface IAvatarImageProps extends AvatarPrimitive.ImageProps {}

export const AvatarImage: React.FC<IAvatarImageProps> = ({
  className,
  ...props
}) => (
  <AvatarImage
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
);

interface IAvatarFallbackProps extends AvatarPrimitive.FallbackProps {}

export const AvatarFallback: React.FC<IAvatarFallbackProps> = ({
  className,
  ...props
}) => (
  <AvatarPrimitive.Fallback
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className,
    )}
    {...props}
  />
);
