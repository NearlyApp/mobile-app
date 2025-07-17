import {
  TextInput,
  TextInputProps,
  View,
  TouchableOpacity,
} from "react-native";
import { Check } from "lucide-react-native";
import styles from "./styles";
import { COLORS } from "@styles/variables";
import React, { FC } from "react";
import { LabelText } from "@components/typography";

interface FieldTextProps extends TextInputProps {
  isGhost?: boolean;
}

export const FieldText: FC<FieldTextProps> = ({ isGhost, style, ...props }) => {
  return (
    <TextInput
      {...props}
      placeholderTextColor={COLORS.gray700}
      style={[
        styles.text,
        isGhost && { backgroundColor: "transparent" },
        style,
      ]}
    />
  );
};

interface FieldCheckboxProps {
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string | React.ReactNode;
}

export const FieldCheckbox: FC<FieldCheckboxProps> = ({
  value,
  onChange,
  label,
}) => {
  return (
    <TouchableOpacity onPress={() => onChange(!value)} style={styles.wrapper}>
      <View style={[styles.checkbox, value && styles.checked]}>
        {value && <Check size={16} color={COLORS.gray100} />}
      </View>
      {!!label && typeof label === "string" ? (
        <LabelText>{label}</LabelText>
      ) : (
        label
      )}
    </TouchableOpacity>
  );
};
