export interface CheckboxOption {
  id: string | number;
  name: string;
  checked: boolean;
}

export enum FormConfigType {
  text,
  link,
  textarea,
  checkbox
}

export interface FormConfig {
  id: number | string;
  type: FormConfigType;
  title: string;
  placeholder?: string;
  output: string;
  allowEmpty: boolean;

  value?: any;
  options?: Array<CheckboxOption> | undefined;
}
