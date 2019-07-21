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
  StyleListExpansionPanel,
  Styledp,
  StyledAvatar,
  StyledChip
} from '../StyledComponents/step/summary'
import { mayShow } from '../Utils'
import { withSnackbar } from 'notistack';

import { ExpansionError } from 'Components/Expansion/Error'
import { ExpansionData } from 'Components/Expansion'
import { ExpansionFiles } from 'Components/Expansion/Files'
import { showSnackbar } from 'Utils/Snackbar'

class Summary extends Component {

  chipDeleteFile = ({ finalformApi, nameField }) => () => {
    const { enqueueSnackbar, closeSnackbar } = this.props
    finalformApi.change(nameField, undefined)
    showSnackbar({ enqueueSnackbar, text: 'Файл удален успешно', variant: 'success', closeSnackbar })
  }

  render () {
    const { type, valuesFinalForm, handleStep } = this.props
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
      showErrors = ((showSender || files[0]) && (showReceiver || files[1])) ? false : true
    }
    files.map(item => { collFiles = !item ? collFiles : collFiles + 1 })

    return (
      <>
        <ExpansionError type={type} handleStep={handleStep} />
        <ExpansionData type={type} step='sender' />
        <ExpansionData type={type} step='receiver' />
        <ExpansionFiles type={type} handleDeleteFile={this.chipDeleteFile} />
      </>
    )
  }
}

export default withSnackbar(Summary)
