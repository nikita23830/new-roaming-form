import React from 'react'
import { TableRow, TableCell } from '@material-ui/core'
import { NAMED_FIELD } from 'Constants'

export const CustomTableBody = ({ data, values }) => (
  <>
    {data.map(item => (
      <>
        {values[item] && <TableRow hover={true}>
          <TableCell align="left">{NAMED_FIELD[item]}</TableCell>
          <TableCell align="right">{values[item]}</TableCell>
        </TableRow>}
      </>
    ))}
  </>
)
