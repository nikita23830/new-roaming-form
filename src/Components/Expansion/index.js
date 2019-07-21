import React from 'react'
import styled from 'styled-components'
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography, Table, TableBody } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import { DataConsumer } from 'Utils/context'
import { CustomTableBody } from 'Components/Expansion/CustomTableBody'
import { STEP } from 'Constants/Components/Expansion/Error'

export const ExpansionData = ({ type, step }) => (
  <DataConsumer>
  {context => {
    let value = []
    if (context && context.formApi) {
      const { errors, values } = context.formApi.getState()
      value = values[`${step}${type}`]
    }
    let showTitle = undefined
    return (
      <>
        {value.map((item, index) => {
          const { name, lastname, firstname, patronimyc } = item
          let nameOrg = ''
          if (name || (lastname && firstname)) nameOrg = name ? name
            : `ИП ${lastname} ${firstname} ${patronimyc ? patronimyc : ''}`
          let arrItem = Object.keys(item).filter(key => (key != 'name' && key !== 'lastname' && key !== 'firstname' && key !== 'patronimyc'))
          showTitle = (showTitle === undefined && nameOrg) ? true : false
          return (
            <>
              {nameOrg && (<>
                {showTitle && <Typography variant="h6">{STEP[type][step === 'sender' ? 0 : 1]}</Typography>}
                <StyleListExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMore color='primary' />}>
                    <Typography>{nameOrg}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Table>
                      <TableBody>
                        <CustomTableBody data={arrItem} values={value[index]} />
                      </TableBody>
                    </Table>
                  </ExpansionPanelDetails>
                </StyleListExpansionPanel>
              </>)}
            </>
          )
        })}
      </>
    )
  }}
  </DataConsumer>
)

const StyleListExpansionPanel = styled(ExpansionPanel)` && {
  margin-top: 5px;
  margin-botom: 5px;
}`;
