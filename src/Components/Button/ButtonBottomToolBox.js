import React from 'react'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'
import { ButtonAddField, ButtonUpload } from 'Components/Button';
import { DefaultChip } from 'Components/Chip'
import { DataConsumer } from 'Utils/context'
import { ELITE_OPERATORS } from 'Constants'

const ButtonBottomToolBox = ({activeStep, nameFieldArray, length, uploadFile, handleDeleteFile, checkFile}) => (
  <DataConsumer>
  {context => {
    let showDop = false
    if (context && context.formApi) {
      const { values } = context.formApi.getState()
      values[nameFieldArray].map(item =>
        showDop = (ELITE_OPERATORS.indexOf(item.operator) !== -1) ? true : showDop
      )
    }
    return (
      <GridButton container>
        <ButtonAddField activeStep={activeStep} nameFieldArray={nameFieldArray} length={length} />

        {showDop && !checkFile && nameFieldArray === 'receiverAbonent' && <ButtonUpload
          accept='.pdf'
          uploadFile={uploadFile}
          text='Загрузить доп. соглашение'
        />}
        {checkFile && nameFieldArray === 'receiverAbonent' && <DefaultChip
          nameField={undefined}
          handleDeleteFile={handleDeleteFile}
          file={checkFile}
        />}
      </GridButton>
    )
  }}
  </DataConsumer>
)

const GridButton = styled(Grid)` && {
  width: 600px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}`;

export default ButtonBottomToolBox
