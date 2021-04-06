import { FormConfigType, FormConfig } from '../common/form-interface';

export const REPLACE_ENCODE_INPUT = '@input@';

export const DEFAULT_CONFIG: Array<FormConfig> = [
  {
    id: 0,
    type: FormConfigType.text,
    title: 'Title',
    placeholder: 'Add title here',
    value: '',
    output: `### Title\n${REPLACE_ENCODE_INPUT}\n`,
    allowEmpty: false
  },
  {
    id: 1,
    type: FormConfigType.textarea,
    title: 'Description',
    output: `#### Description\n${REPLACE_ENCODE_INPUT}\n`,
    value: '',
    allowEmpty: true
  },
  {
    id: 2,
    type: FormConfigType.link,
    title: 'Ticket Link',
    output: `#### Ticket\nThe related issue ticket link is [here](${REPLACE_ENCODE_INPUT}).\n`,
    allowEmpty: false
  },
  {
    id: 3,
    type: FormConfigType.link,
    title: 'Design Link',
    output: `#### Design\nThe related design link is [here](${REPLACE_ENCODE_INPUT}).\n`,
    allowEmpty: false
  },
  {
    id: 4,
    type: FormConfigType.checkbox,
    title: 'Related to',
    output: `#### Related to\n${REPLACE_ENCODE_INPUT}\n`,
    allowEmpty: false,
    options: [
      {
        id: 0,
        name: 'Android',
        checked: false
      },
      {
        id: 1,
        name: 'IOS',
        checked: false
      },
      {
        id: 2,
        name: 'Web',
        checked: false
      }
    ]
  }
];
