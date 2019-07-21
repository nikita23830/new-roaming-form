import React from 'react'
import styled from 'styled-components'
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Button, Typography } from '@material-ui/core'
import { ExpandMore, Send } from '@material-ui/icons'
import { DataConsumer } from 'Utils/context'
import { STEP } from 'Constants/Components/Expansion/Error'

export const ExpansionError = ({ type, handleStep }) => (
  <DataConsumer>
  {context => {
    let data = {}
    if (context && context.formApi) {
      const { errors } = context.formApi.getState()
      data = {
        errors: !Object.keys(errors).length ? false : true,
        errorSender: !errors[`sender${type}`] ? false : true,
        errorReceiver: !errors[`receiver${type}`] ? false : true,
      }
    }
    return (
      <>
        {data.errors && <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary expandIcon={<ExpandMore color='secondary'/>}>
            <StyledTypography>Некорретные данные</StyledTypography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <StyledDiv>
              <Typography>Некорретные или неполные данные. Перейдите на нужный этап для исправления ошибок.</Typography>
              {data.errorSender &&
                <StyledButton variant="outlined" aria-label="Delete" color='primary' onClick={handleStep(0)} >
                  {STEP[type][0]}
                  <Send color='primary' />
                </StyledButton>
              }
              {data.errorReceiver &&
                <StyledButton variant="outlined" aria-label="Delete" color='primary' onClick={handleStep(1)} >
                  {STEP[type][1]}
                  <Send color='primary' />
                </StyledButton>
              }
            </StyledDiv>
          </ExpansionPanelDetails>
        </ExpansionPanel>}
      </>
    )
  }}
  </DataConsumer>
)

const StyledTypography = styled(Typography)` && {
  color: #f00;
}`;

const StyledDiv = styled.div` && {
  width: 600px;
  display: flex;
  flex-direction: column;
}`;

const StyledButton = styled(Button)` && {
  width: 350px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
  justify-content: space-between;
}`;
