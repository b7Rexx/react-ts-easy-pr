import React, { Component } from 'react';

import gfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { Grid, Button } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

import FormItem from './components/FormItem';
import { DEFAULT_CONFIG } from '../constants/form-config';
import { FormConfig, FormConfigType } from '../common/form-interface';

type HomeProps = {};
type HomeStates = {
  isGenerate: boolean;
  firstInit: boolean;
  formConfig: Array<FormConfig>;
  previewText: string;
};

class Home extends Component<HomeProps, HomeStates> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      isGenerate: false,
      firstInit: true,
      formConfig: DEFAULT_CONFIG,
      previewText: ''
    };
    this.generateAction = this.generateAction.bind(this);
    this.formItemChangeHandler = this.formItemChangeHandler.bind(this);
  }

  spreadForm() {
    return this.state.formConfig.map((item) => (
      <div key={`form-config-item-${item.id}`}>
        <FormItem
          formItem={item}
          handleChange={(value: any) => this.formItemChangeHandler(item, value)}
        />
      </div>
    ));
  }

  formItemChangeHandler(item: FormConfig, val: any) {
    let preview = '';
    const updatedForm = this.state.formConfig.map((fcitem) => {
      switch (fcitem.type) {
        case FormConfigType.checkbox: {
          const mappedFcCheckboxItem = fcitem;
          let checkboxString = '';
          if (this.state.firstInit || mappedFcCheckboxItem.id === item.id) {
            if (mappedFcCheckboxItem.options) {
              const updateCheckboxItems = mappedFcCheckboxItem.options.map(
                (checkboxItem) => {
                  if (val.option && checkboxItem.id === val.option.id) {
                    checkboxString += `- [${val.checked ? 'x' : ' '}] ${
                      checkboxItem.name
                    }\n`;
                    return { ...checkboxItem, checked: val.checked };
                  }
                  checkboxString += `- [${checkboxItem.checked ? 'x' : ' '}] ${
                    checkboxItem.name
                  }\n`;
                  return checkboxItem;
                }
              );
              mappedFcCheckboxItem.options = updateCheckboxItems;
            }
          }

          preview += mappedFcCheckboxItem.output.replace(
            '@input@',
            checkboxString
          );

          return mappedFcCheckboxItem;
        }

        default: {
          const mappedFcItem = fcitem;
          if (mappedFcItem.id === item.id) {
            mappedFcItem.value = val;
          }
          if (mappedFcItem.allowEmpty) {
            preview += mappedFcItem.output.replace(
              '@input@',
              mappedFcItem.value
            );
          }
          if (!mappedFcItem.allowEmpty) {
            if (mappedFcItem.value) {
              preview += mappedFcItem.output.replace(
                '@input@',
                mappedFcItem.value
              );
            }
          }
          return mappedFcItem;
        }
      }
    });

    this.setState((prevState) => ({
      ...prevState,
      isGenerate: false,
      firstInit: false,
      formConfig: updatedForm,
      previewText: preview
    }));
  }

  generateAction() {
    this.setState((prevState) => ({
      ...prevState,
      isGenerate: true
    }));
  }

  render() {
    return (
      <>
        <div className="home__header">
          <div>Easy PR</div>
          <div>
            <Button color="default" startIcon={<SettingsIcon />}>
              Settings
            </Button>
          </div>
        </div>
        <Grid className="home" container>
          <Grid className="home__form" item xs={12} md={6}>
            <div className="home__title">PR markdown form</div>
            <div>{this.spreadForm()}</div>
          </Grid>
          <Grid className="home__preview" item xs={12} md={6}>
            {!this.state.isGenerate && (
              <div>
                <div className="home__title">Preview</div>
                <ReactMarkdown plugins={[gfm]}>
                  {this.state.previewText}
                </ReactMarkdown>
              </div>
            )}
            {this.state.isGenerate && (
              <div>
                <div className="home__title">Generated markdown text</div>
                <div>{this.state.previewText}</div>
              </div>
            )}
          </Grid>
        </Grid>
        <div className="home__footer">
          <Button
            variant="contained"
            size="large"
            color="primary"
            fullWidth={true}
            onClick={this.generateAction}
          >
            Generate & Copy
          </Button>
        </div>
      </>
    );
  }
}

export default Home;
