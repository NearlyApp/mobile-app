import {
  StyleProp,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import styles, { getButtonStyle } from "./styles";
import { ButtonVariant } from "@custom-types/variants";

export type ButtonSize = "small" | "medium" | "large" | (number & {});

export interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  onPress?: () => void;
  disabled?: boolean;
  children: React.ReactNode | string;
  style?: StyleProp<ViewStyle>;
  size?: ButtonSize;
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  style,
  variant = "default",
  onPress,
  size = "medium",
  ...props
}) => {
  const variantStyle = getButtonStyle(variant, size, disabled);
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.baseButton, variantStyle, style]}
      {...props}
    >
      {typeof children === "string" ? <Text>{children}</Text> : children}
    </TouchableOpacity>
  );
};

export default Button;
