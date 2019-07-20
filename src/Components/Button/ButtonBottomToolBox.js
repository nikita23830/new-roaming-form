import React from 'react'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'
import { ButtonAddField, ButtonUpload } from 'Components/Button';
import { DefaultChip } from 'Components/Chip'
import { DataConsumer } from 'Utils/context'

const ButtonBottomToolBox = ({activeStep, nameFieldArray, length, uploadFile, handleDeleteFile, checkFile}) => (
  <DataConsumer>
  {context => {

    return (
      <GridButton container>
        <ButtonAddField activeStep={activeStep} nameFieldArray={nameFieldArray} length={length} />

        {!checkFile && nameFieldArray === 'receiverClient' && <ButtonUpload
          accept='.pdf'
          uploadFile={uploadFile}
          text='Загрузить доп. соглашение'
        />}
        {checkFile && nameFieldArray === 'receiverClient' && <DefaultChip
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
