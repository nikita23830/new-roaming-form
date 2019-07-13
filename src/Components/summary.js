import React, { Component } from 'react'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'

class Summary extends Component {

  render () {
    return (
      <>
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
