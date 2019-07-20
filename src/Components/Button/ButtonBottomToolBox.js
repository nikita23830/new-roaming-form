import React from 'react'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'
import { ButtonAddField } from 'Components/Button/ButtonAddField';
import { ButtonUpload } from 'Components/Button/ButtonUpload';
import { DefaultChip } from 'Components/Chip'

export const ButtonBottomToolBox = ({activeStep, nameFieldArray, length, uploadFile, handleDeleteFile, checkFile}) => (
  <GridButton container>
    <ButtonAddField activeStep={activeStep} nameFieldArray={nameFieldArray} length={length} />

    {!checkFile && <ButtonUpload accept='.pdf' uploadFile={uploadFile} text='Загрузить доп. соглашение' />}
    {checkFile && <DefaultChip nameField={undefined} handleDeleteFile={handleDeleteFile} file={checkFile} />}
  </GridButton>
)

const GridButton = styled(Grid)` && {
  width: 600px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}`;
