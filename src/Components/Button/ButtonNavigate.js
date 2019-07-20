import React from 'react'
import styled from 'styled-components'
import { Grid, Button } from '@material-ui/core'

const ButtonNavigate = ({ activeStep, handleBack, handleNext, handleSend }) => (
  <StyledGrid container>
    <BtnGrid item xs={12} sm={6} align='flex-start'>
      <Button
        variant="outlined"
        color="primary"
        disabled={activeStep === 0 ? true : false}
        onClick={activeStep === 0 ? null : handleBack}
      >
        Назад
      </Button>
    </BtnGrid>
    <BtnGrid item xs={12} sm={6} align='flex-end'>
      <Button
        variant="outlined"
        color="primary"
        onClick={activeStep === 2 ? handleSend : handleNext}
      >
        {activeStep !== 2 ? "Вперед" : "Отправить"}
      </Button>
    </BtnGrid>
  </StyledGrid>
)

const StyledGrid = styled(Grid)` && {
  margin-top: 20px;
  width: 600px;
}`

const BtnGrid = styled(Grid)` && {
  display: flex;
  justify-content: ${(props) => props.align};
}`

export default ButtonNavigate
