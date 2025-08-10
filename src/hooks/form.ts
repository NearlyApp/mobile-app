import { createContext, useContext, useMemo } from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

export interface IFormContext<TFieldValues extends FieldValues>
  extends UseFormReturn<TFieldValues> {}

export const FormContext = createContext<IFormContext<FieldValues>>(
  {} as IFormContext<FieldValues>,
);

export const useFormContext = () => useContext(FormContext);

export interface IFormFieldContext<TFieldValues extends FieldValues> {
  path: Path<TFieldValues>;
}

export const FormFieldContext = createContext<IFormFieldContext<FieldValues>>(
  {} as IFormFieldContext<FieldValues>,
);

export const useFormFieldContext = () => useContext(FormFieldContext);

export const useFormMessage = (params: {
  value?: React.ReactNode;
}): { message: Optional<React.ReactNode> } => {
  const { value } = params;
  const { formState } = useFormContext();
  const { path } = useFormFieldContext();

  const message = useMemo(() => {
    if (value) return value;

    const error = formState?.errors[path];
    if (error && typeof error === 'string') return error;
    if (error && typeof error === 'object' && 'message' in error)
      return typeof error.message === 'string' ? error.message : undefined;

    const fieldError = formState?.errors[path];
    if (fieldError?.message) {
      return typeof fieldError.message === 'string'
        ? fieldError.message
        : String(fieldError.message);
    }

    return undefined;
  }, [value, formState?.errors, path]);

  return { message };
};
