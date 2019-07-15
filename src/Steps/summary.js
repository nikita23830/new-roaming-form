import React, { Component } from 'react'
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  IconButton
} from '@material-ui/core'
import { ExpandMore, Send, AttachFileRounded, DeleteOutline } from '@material-ui/icons'
import { EXPANSION, STEP } from '../Constants'
import {
  StyledDiv,
  StyledButton,
  StyledTypography,
  StyledExpansionPanel,
  StyleListExpansionPanel,
  Styledp,
  StyledAvatar,
  StyledChip
} from '../StyledComponents/step/summary'
import { mayShow } from '../Utils'
import { withSnackbar } from 'notistack';

class Summary extends Component {

  chipDeleteFile = (index) => () => {
    const { finalformApi, valuesFinalForm, type } = this.props
    const nameFields = { sender: `sender${type}`, receiver: `receiver${type}` }
    const files = [
      `${nameFields.sender}file`,
      `${nameFields.receiver}file`,
      `${type}file`
    ]
    finalformApi.change(files[index], undefined)
    this.props.enqueueSnackbar('Файл удален успешно', {
      variant: 'success',
      persist: true,
      action: (key) => (
        <IconButton onClick={() => { this.props.closeSnackbar(key) }}>
          <DeleteOutline color='primary' />
        </IconButton>
      )
    })
  }

  render () {
    const { type, valuesFinalForm } = this.props
    const nameFields = { sender: `sender${type}`, receiver: `receiver${type}` }
    const files = [
      valuesFinalForm[`${nameFields.sender}file`],
      valuesFinalForm[`${nameFields.receiver}file`],
      valuesFinalForm[`${type}file`]
    ]

    let objSender = []
    let showSender = false
    let showReceiver = false
    let showFiles = (files[0] || files[1] || files[2]) ? true : false
    let collFiles = 0
    let showErrors = true
    let objReceiver = []
    let errors = true
    let objFiles = { show: false, data: [{}] }

    if (valuesFinalForm && valuesFinalForm[nameFields.sender] && valuesFinalForm[nameFields.receiver]) {
      objSender = mayShow(valuesFinalForm[nameFields.sender])
      objReceiver = mayShow(valuesFinalForm[nameFields.receiver])
      showSender = objSender.length === 0 ? false : true
      showReceiver = objReceiver.length === 0 ? false : true
      showErrors = ((showReceiver || files[0]) && (showReceiver || files[1])) ? false : true
    }
    files.map(item => { collFiles = !item ? collFiles : collFiles + 1 })

    return (
      <>
        {showErrors && <StyledExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMore color='secondary'/>}>
            <StyledTypography>Некорретные данные</StyledTypography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <StyledDiv>
              <StyledTypography>Некорретные или неполные данные. Перейдите на нужный этап для исправления ошибок</StyledTypography>
              {(!showSender && !files[0]) && <Grid item sm={12} sx={4}>
                <StyledButton variant="outlined" aria-label="Delete" color='primary' >
                  {STEP[type][0]}
                  <Send color='primary' />
                </StyledButton>
              </Grid>}
              {(!showReceiver && !files[1]) && <Grid item sm={12} sx={4}>
                <StyledButton variant="outlined" aria-label="Delete" color='primary' >
                  {STEP[type][1]}
                  <Send color='primary' />
                </StyledButton>
              </Grid>}
            </StyledDiv>
          </ExpansionPanelDetails>
        </StyledExpansionPanel>}

        {showSender && <Typography variant="h6">{STEP[type][0]}</Typography>}
        {showSender && objSender.map(item => (
          <StyleListExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMore color='primary'/>}>
              <Typography>{item.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Table>
                <CustomTableBody item={item} />
              </Table>
            </ExpansionPanelDetails>
          </StyleListExpansionPanel>
        ))}

        {showFiles && <Typography variant="h6">Прикрепленные файлы</Typography>}
        {showFiles && <StyleListExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMore color='primary'/>}>
            <Typography>Файлов: {collFiles}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>

          {showFiles && files.map((item, index) => (
            <>
              {item && <StyledChip
                avatar={
                  <StyledAvatar>
                    <AttachFileRounded color='primary' />
                  </StyledAvatar>
                }
                label={
                  <Styledp>
                    {item.name}
                  </Styledp>
                }
                variant='outlined'
                onDelete={this.chipDeleteFile(index)}
                color='primary'
              />}
            </>
          ))}

          </ExpansionPanelDetails>
        </StyleListExpansionPanel>}

        {showReceiver && <Typography variant="h6">{STEP[type][0]}</Typography>}
        {showReceiver && objReceiver.map(item => (
          <StyleListExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMore color='primary'/>}>
              <Typography>{item.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Table>
                <CustomTableBody item={item} />
              </Table>
            </ExpansionPanelDetails>
          </StyleListExpansionPanel>
        ))}
      </>
    )
  }
}

const CustomTableBody = ({ item }) => {

  return (
    <TableBody>
      {item.inn && <TableRow hover={true}>
        <TableCell align="left">ИНН</TableCell>
        <TableCell align="right">{item.inn}</TableCell>
      </TableRow>}
      {item.kpp && <TableRow>
        <TableCell align="left">КПП</TableCell>
        <TableCell align="right">{item.kpp}</TableCell>
      </TableRow>}
      {item.id && <TableRow>
        <TableCell align="left">Идентификатор</TableCell>
        <TableCell align="right">{item.id}</TableCell>
      </TableRow>}
      {item.operator && <TableRow>
        <TableCell align="left">Оператор</TableCell>
        <TableCell align="right">{item.operator}</TableCell>
      </TableRow>}
      {item.email && <TableRow>
        <TableCell align="left">E-mail</TableCell>
        <TableCell align="right">{item.email}</TableCell>
      </TableRow>}
      {item.number && <TableRow>
        <TableCell align="left">Номер заявки</TableCell>
        <TableCell align="right">{item.number}</TableCell>
      </TableRow>}
    </TableBody>
  )
}

export default withSnackbar(Summary)
