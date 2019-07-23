import React from 'react'
import styled from 'styled-components'
import { Typography, Button } from '@material-ui/core'
import { CheckCircle, Cached } from '@material-ui/icons'
import { DataConsumer } from 'Utils/context'

export const Complete = ({ type, reset }) => (
  <DataConsumer>
  {context => (
    <>
      <Typography variant="h5" gutterBottom>
        Ваш запрос на установку связи успешно отправлен.
      </Typography>
      <Stylediv>
      <Typography variant="subtitle1">
        Срок ответа на заявку от 2 до 6 рабочих дней.
      </Typography>
      {type === 'Abonent' && <Typography variant="subtitle1">
        По итогу настройки на указанный вами e-mail придет извещение.
      </Typography>}
      <StyleCheckCircle fontSize='large' />
      <StyleButton color='primary' variant='outlined' onClick={reset(context.formApi)}>
        Очистить форму
        <StyleCached color='primary'/>
      </StyleButton>
      </Stylediv>
    </>
  )}
  </DataConsumer>
)

const Stylediv = styled.div` && {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 300px;
  justify-content: center;
  position: relative;
}`

const StyleCheckCircle = styled(CheckCircle)` && {
  color: #43a047;
}`

const StyleCached = styled(Cached)` && {
  margin-left: 10px;
  color: #7d37a7;
}`

const StyleButton = styled(Button)` && {
  position: absolute;
  bottom: 0px;
  left: 0px;
}`
