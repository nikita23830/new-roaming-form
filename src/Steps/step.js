import React, { Component } from "react";
import { withSnackbar } from "notistack";
import { IconButton } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { DefaultField } from 'Components/Fields'
import { DefaultSelect } from 'Components/Select'
import ParseFile from 'Components/ParseFile'
import { DefaultStep } from 'Components/Step'
import { ButtonBottomToolBox, ButtonDeleteField } from 'Components/Button'
import { DataConsumer } from 'Utils/context'

class StepContents extends Component {
  uploadFile = finalformApi => file => {
    const { type, enqueueSnackbar, closeSnackbar } = this.props;
    const files = file.target.files[0];

    if (files.type === "application/pdf") {
      finalformApi.change(`${type}file`, files);
    } else enqueueSnackbar('Файл должен иметь расширение .pdf', {
      variant: 'warning',
      persist: true,
      action: (key) => (
        <IconButton onClick={() => { closeSnackbar(key) }}>
          <DeleteOutline />
        </IconButton>
      )
    });
  };

  handleDeleteFile = ({ finalformApi }) => () => finalformApi.change(`${this.props.type}file`, undefined);

  render() {
    const { type, activeStep } = this.props;

    return (
      <DataConsumer>
      {context => {
        const nameFieldArray = `${activeStep === 0 ? "sender" : "receiver"}${type}`;
        let list = ''
        let checkFile = ''
        if (context && context.formApi) {
          const { values } = context.formApi.getState()
          list = values[`${activeStep === 0 ? "sender" : "receiver"}${type}file`]
          checkFile = values[`${type}file`]
        }
        return (
          <FieldArray name={nameFieldArray}>
            {({ fields }) => (
              <>
                {fields.map((key, index) => {
                  return (
                    <>
                      {!list && <DefaultStep
                        nameFieldArray={nameFieldArray}
                        fields={fields}
                        indexKey={key}
                        index={index}
                      />}
                      {list && <ParseFile file={list} />}
                    </>
                  );
                })}

                <ButtonBottomToolBox
                  activeStep={activeStep}
                  nameFieldArray={nameFieldArray}
                  length={fields.length}
                  uploadFile={this.uploadFile}
                  handleDeleteFile={this.handleDeleteFile}
                  checkFile={checkFile}
                />
              </>
            )}
          </FieldArray>
        )
      }}
      </DataConsumer>
    );
  }
}


export default withSnackbar(StepContents);
