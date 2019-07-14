import React, { Component } from 'react'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Grid, Typography } from '@material-ui/core'
import { ExpandMore, Send } from '@material-ui/icons'
import { EXPANSION, STEP } from '../Constants'
import { StyledDiv, StyledButton, StyledTypography } from '../StyledComponents/step/summary'
import { mayShow } from '../Utils'

class Summary extends Component {

  render () {
    const { type, valuesFinalForm } = this.props
    const nameFields = { sender: `sender${type}`, receiver: `receiver${type}` }

    let objSender = { show: false, data: [{}] }
    let objReceiver = { show: false, data: [{}] }
    let errors = true
    let objFiles = { show: false, data: [{}] }

    if (valuesFinalForm && valuesFinalForm[nameFields.sender] && valuesFinalForm[nameFields.receiver]) {
      objSender = mayShow(valuesFinalForm[nameFields.sender])
      console.log(objSender)
    }


    return (
      <>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMore color='privary'/>}>

            <StyledTypography>Некорретные данные</StyledTypography>

          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {/* InDetails */}
            <StyledDiv>
              <StyledTypography>Некорретные или неполные данные. Перейдите на нужный этап для исправления ошибок</StyledTypography>
              {STEP[type].map((item, index) => { if (index < 2) return(
                <Grid item sm={12} sx={4}>
                  <StyledButton variant="outlined" aria-label="Delete" color='primary' >
                    {STEP[type][index]}
                    <Send color='primary' />
                  </StyledButton>
                </Grid>
              )} )}
            </StyledDiv>
            {/* InDetails */}
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <Typography variant="h6">Данные вашего клиента</Typography>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMore color='privary'/>}>

            <Typography>Expansion Panel 1</Typography>

          </ExpansionPanelSummary>
          <ExpansionPanelDetails>

            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget.
            </Typography>

          </ExpansionPanelDetails>
        </ExpansionPanel>
        <Typography variant="h6">Прикрепленные файлы</Typography>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMore color='privary'/>}>

            <Typography>Expansion Panel 1</Typography>

          </ExpansionPanelSummary>
          <ExpansionPanelDetails>

            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget.
            </Typography>

          </ExpansionPanelDetails>
        </ExpansionPanel>
        <Typography variant="h6">Данные контрагентов в АО Калуга Астрал</Typography>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMore color='privary'/>}>

            <Typography>Expansion Panel 1</Typography>

          </ExpansionPanelSummary>
          <ExpansionPanelDetails>

            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget.
            </Typography>

          </ExpansionPanelDetails>
        </ExpansionPanel>
      </>
    )
  }
}

export default Summary
