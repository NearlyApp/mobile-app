import { LabelText } from '@components/ui/typography';
import { COLORS } from '@styles/variables';
import { Check } from 'lucide-react-native';
import React, { FC } from 'react';
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';

interface TextField extends TextInputProps {
  errored?: boolean;
  isGhost?: boolean;
}

export const TextField: FC<TextField> = ({
  isGhost,
  style,
  errored,
  ...props
}) => {
  return (
    <TextInput
      {...props}
      placeholderTextColor={COLORS.gray700}
      style={[
        styles.textFieldErrored,
        !!errored && styles.textFieldErrored,
        isGhost && { backgroundColor: 'transparent' },
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
      {!!label && typeof label === 'string' ? (
        <LabelText>{label}</LabelText>
      ) : (
        label
      )}
    </TouchableOpacity>
  );
};
