import React from 'react'
import { Button } from '@material-ui/core'
import { COMMON_OBJECT } from 'Constants/Components/Button'
import { DataConsumer } from 'Utils/context'

const ButtonAddField = ({ activeStep, nameFieldArray, length }) => (
  <DataConsumer>
  {context => {
    let push = undefined
    if (context && context.mutators) push = context.mutators.push
    let dataInsert = COMMON_OBJECT[nameFieldArray]
    let visible = ((nameFieldArray === 'senderAbonent') || length > 99) ? false : true
    return (
      <>
        {visible && <Button
          variant="outlined"
          color="primary"
          disabled={length > 99 ? true : false}
          onClick={() => push(nameFieldArray, dataInsert)}
        >
          {activeStep === 0
            ? "Добавить клиента"
            : "Добавить контрагента"}
        </Button>}
      </>
    )
  }}
  </DataConsumer>
)

export default ButtonAddField
