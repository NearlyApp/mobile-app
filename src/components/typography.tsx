import * as VARIABLES from "@styles/variables";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

type Props<P extends object = {}> = TextProps & {
  size?: TextSize;
} & P;

type TextComponent<P extends object = {}> = React.FC<Props<P>>;

type TextType = "display" | "headline" | "title" | "body" | "label";
type TextSize = "small" | "medium" | "large" | (number & {});

function getStyleName(type: TextType, size: string): string {
  return `${type}${size.charAt(0).toUpperCase()}${size.slice(1)}`;
}

function useStyle(type: TextType, size: TextSize) {
  const style: StyleProp<TextStyle>[] = [];

  switch (typeof size) {
    case "number": {
      const key = getStyleName(type, "medium");
      if (key in VARIABLES.TEXT_STYLES) style.push(VARIABLES.TEXT_STYLES[key]);
      style.push({ fontSize: size });
      break;
    }
    case "string": {
      const key = getStyleName(type, size);
      if (key in VARIABLES.TEXT_STYLES) style.push(VARIABLES.TEXT_STYLES[key]);
      break;
    }
  }

  return style;
}

const AbstractText: TextComponent<{ type: TextType }> = ({
  type = "body",
  size = "medium",
  children,
  ...props
}) => {
  const style = useStyle(type, size);

  return (
    <Text {...props} style={[style, props.style]}>
      {children}
    </Text>
  );
};

export const DisplayText: TextComponent = ({ children, ...props }) => {
  return (
    <AbstractText {...props} type="display">
      {children}
    </AbstractText>
  );
};

export const HeadlineText: TextComponent = ({ children, ...props }) => {
  return (
    <AbstractText {...props} type="headline">
      {children}
    </AbstractText>
  );
};

export const TitleText: TextComponent = ({ children, ...props }) => {
  return (
    <AbstractText {...props} type="title">
      {children}
    </AbstractText>
  );
};

export const BodyText: TextComponent = ({ children, ...props }) => {
  return (
    <AbstractText {...props} type="body">
      {children}
    </AbstractText>
  );
};

export const LabelText: TextComponent = ({ children, ...props }) => {
  return (
    <AbstractText {...props} type="label">
      {children}
    </AbstractText>
  );
};
