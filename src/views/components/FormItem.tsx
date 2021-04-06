import React, { useState, useEffect } from 'react';
import { TextField, TextareaAutosize } from '@material-ui/core';

import { FormConfigType, FormConfig } from '../../constants/form-config';

type FormItemProps = {
  formItem: FormConfig;
  handleChange: Function;
};

function FormItem(props: FormItemProps) {
  const [input, setInput] = useState('');

  useEffect(() => {
    setInput(props.formItem.value);
  }, [props.formItem.value]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
    props.handleChange(e.target.value);
  };

  const textareaChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setInput(e.target.value);
    props.handleChange(e.target.value);
  };

  const parseFormType = (formItem: FormConfig) => {
    switch (formItem.type) {
      case FormConfigType.text:
        return (
          <TextField
            id={`form-item-${props.formItem.id}`}
            label={props.formItem.title}
            placeholder={props.formItem.placeholder ?? ''}
            fullWidth
            value={input ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              inputChangeHandler(e)
            }
          />
        );
      case FormConfigType.textarea:
        return (
          <>
            <label
              className="form-item__label"
              htmlFor={`form-item-${props.formItem.id}`}
            >
              {props.formItem.title}
            </label>
            <TextareaAutosize
              className="form-item__textarea"
              id={`form-item-${props.formItem.id}`}
              placeholder={props.formItem.placeholder ?? ''}
              defaultValue={input ?? ''}
              rowsMin={4}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                textareaChangeHandler(e)
              }
            />
          </>
        );
      case FormConfigType.link:
        return (
          <TextField
            id={`form-item-${props.formItem.id}`}
            label={props.formItem.title}
            placeholder={props.formItem.placeholder ?? ''}
            fullWidth
            value={input ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              inputChangeHandler(e)
            }
          />
        );
      case FormConfigType.checkbox:
        return (
          <TextField
            id={`form-item-${props.formItem.id}`}
            label={props.formItem.title}
            placeholder={props.formItem.placeholder ?? ''}
            fullWidth
            value={input ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              inputChangeHandler(e)
            }
          />
        );

      default:
        return <></>;
    }
  };

  return <div className="form-item">{parseFormType(props.formItem)}</div>;
}

export default FormItem;
