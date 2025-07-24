import Container from "@components/containers";
import { DisplayText, LabelText, TitleText } from "@components/ui/typography";
import { ToastVariant } from "@custom-types/variants";
import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Animated } from "react-native";
import styles, { getToastStyle } from "./styles";
import { FormError } from "@lib/queries/error";

export interface ToastProps {
  title?: string;
  variant?: ToastVariant;
  description?: string | React.ReactNode;
  duration?: number;
}

export interface ToastProviderProps {
  children: React.ReactNode;
}

export interface ToastItemProps extends ToastProps {
  id: string;
}

const ToastContext = createContext<{
  toast: (props: ToastProps) => void;
} | null>(null);

const ToastItem: FC<ToastItemProps> = ({
  title = "",
  variant = "default",
  description,
  duration,
}) => {
  const [opacity] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: duration || 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  const variantStyle = getToastStyle(variant);
  return (
    <Animated.View style={[styles.toast, { opacity, ...variantStyle }]}>
      <TitleText style={styles.titleText}>{title}</TitleText>
      <DisplayText style={styles.text}>{description}</DisplayText>
    </Animated.View>
  );
};

const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItemProps[]>([]);
  const toast = useCallback((props: ToastProps) => {
    const id = Date.now().toString();
    const toastItem: ToastItemProps = { ...props, id };
    setToasts((prev) => [...prev, toastItem]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, props.duration || 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <Container style={styles.container}>
        {toasts.map((toastItem) => (
          <ToastItem key={toastItem.id} {...toastItem} />
        ))}
      </Container>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const FormErrorToast = (error: FormError): ToastProps => ({
  title: "Erreur",
  description: (
    <Container>
      {error.allMessages.map((err, i) => (
        <LabelText key={i} style={styles.text}>
          • {err}
        </LabelText>
      ))}
    </Container>
  ),
  variant: "destructive",
  duration: 5000,
});

const Toast = {
  Provider: ToastProvider,
  Item: ToastItem,
  context: ToastContext,
  useToast,
};

export default Toast;
