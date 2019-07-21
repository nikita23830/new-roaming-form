import React from 'react'
import styled from 'styled-components'
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Button, Typography } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import { DataConsumer } from 'Utils/context'
import { DefaultChip } from 'Components/Chip'

export const ExpansionFiles = ({ type, handleDeleteFile }) => (
  <DataConsumer>
  {context => {
    let data = {}
    let name =[]
    let values = undefined
    if (context && context.formApi) {
      values = context.formApi.getState().values
      name = [`sender${type}file`, `receiver${type}file`, `${type}file`]
      data = name.filter(item => values[item] !== undefined ? item : null)
    }

    return (
      <>
        {data.length > 0 && (<>
          <Typography variant="h6">Прикрепленные файлы</Typography>
          <StyleListExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMore color='primary' />}>
              <Typography>{`Файлов: ${data.length}`}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>

              {data.map((item, index) => (
                <DefaultChip nameField={item} handleDeleteFile={handleDeleteFile} file={values[item]} />
              ))}

            </ExpansionPanelDetails>
          </StyleListExpansionPanel>
        </>)}
      </>
    )
  }}
  </DataConsumer>
)

const StyleListExpansionPanel = styled(ExpansionPanel)` && {
  margin-top: 5px;
  margin-botom: 5px;
}`;
