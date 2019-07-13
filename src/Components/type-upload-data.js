import React, { Component } from "react";
import { Button, Grid, Typography } from '@material-ui/core'
import { AttachFileOutlined } from '@material-ui/icons'
import { StyledCollapse, AuthCard, StyledTextField, MainCard, StyledTypeGrid } from '../StyledComponents/components/type-upload-data/'

class TypeUploadData extends Component {


  render () {
    const { activeStep, type } = this.props

    return (
      <>
        <StyledTypeGrid container spacing={1}>
          <Grid item sm={12} xs={8}>
            <Typography variant="h6">
              Вы можете загрузить список файлом
            </Typography>
          </Grid>
          <Grid item sm={12} xs={4}>
            <Button
              fullWidth
              variant='outlined'
              color='primary'
            >
              <AttachFileOutlined color='primary' />
              Выбрать файл
            </Button>
          </Grid>
        </StyledTypeGrid>
      </>
    )
  }
}

export default TypeUploadData
