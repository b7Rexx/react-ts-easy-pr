export const REPLACE_ENCODE_INPUT = '@input@';

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
  value?: any;
  output: string;
  allowEmpty: boolean;
}

export const DEFAULT_CONFIG: Array<FormConfig> = [
  {
    id: 0,
    type: FormConfigType.text,
    title: 'Title',
    placeholder: 'Add title here',
    value: '',
    output: `### Title

    ${REPLACE_ENCODE_INPUT}

    `,
    allowEmpty: false
  },
  {
    id: 1,
    type: FormConfigType.textarea,
    title: 'Description',
    output: `
    ### Description

    ${REPLACE_ENCODE_INPUT}

    `,
    value: '',
    allowEmpty: true
  },
  {
    id: 2,
    type: FormConfigType.link,
    title: 'Ticket Link',
    output: `### Ticket

    The related issue ticket link is [here](${REPLACE_ENCODE_INPUT}).
    
    `,
    allowEmpty: false
  },
  {
    id: 3,
    type: FormConfigType.checkbox,
    title: 'Related to',
    output: REPLACE_ENCODE_INPUT,
    allowEmpty: false
  }
];
