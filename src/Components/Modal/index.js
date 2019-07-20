import React from 'react';
import styled from 'styled-components'
import { Modal, IconButton, Typography, Button } from '@material-ui/core';
import { CancelOutlined, ArrowDownward } from '@material-ui/icons';

export const DefaultModal = ({ openModalFile, handleModalClose }) => (
  <Modal open={openModalFile} onClose={handleModalClose}>
    <ModalDiv>
      <StyledIconButton
        aria-label="Close"
        onClick={handleModalClose}
      >
        <CancelOutlined color="primary" />
      </StyledIconButton>

      <Typography variant="subtitle1">
        Вы можете загрузить список контрагентов файлом с форматом .xls или
        xlsx, если он сопоставим с шаблоном:
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        href="https://astral.ru/roaming/tempalates/abonent-receiver.xlsx"
      >
        <ArrowDownward />
        Загрузить шаблон
      </Button>
      <Typography variant="subtitle1">
        Обращаем Ваше внимание, что загрузка списка контрагентов файлом
        удалит введеные вручную данные контрагентов!
      </Typography>
    </ModalDiv>
  </Modal>
)

const ModalDiv = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 650px;
  position: absolute;
  width: 400px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  padding: 30px;
  border-radius: 4px;
  outline: none;
`

const StyledIconButton = styled(IconButton)` && {
  position: absolute;
  top: 0px;
  right: 0px;
}`
