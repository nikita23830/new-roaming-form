import React from 'react'
import styled from 'styled-components'
import { Card, Grid } from '@material-ui/core'
import { DefaultField } from 'Components/Fields'
import { DefaultSelect } from 'Components/Select'
<<<<<<< HEAD
import { ButtonDeleteField } from 'Components/Button/ButtonDeleteField'
=======
import { ButtonDeleteField } from 'Component/Button/ButtonDeleteField'
>>>>>>> 09836c522d6da43a47ee5acce3745ef0791d37ce
import { DEFAULT_OBJECT_VALIDATE, NAMED_FIELD } from "Constants"

export const DefaultStep = ({ nameFieldArray, fields, indexKey, index }) => (
  <MainCard>
    <Grid container spacing={1}>
      {DEFAULT_OBJECT_VALIDATE[nameFieldArray].map(item => {
        const { value } = fields
        const fio = ['lastname', 'firstname', 'patronymic']
        let sm = 12
        let showUL = (value[index]['inn'].length === 12) ? false : true
        let showField = true
        if (fio.indexOf(item) !== -1) sm = 4
        if (item === 'kpp' || item === 'inn') sm = (item === 'inn' && !showUL) ? 12 : 6

        showField = (item === 'name' && !showUL) ? false : showField
        showField = ((fio.indexOf(item) !== -1) && showUL) ? false : showField
        showField = (item === 'kpp' && !showUL) ? false : showField

        return (
          <>
            {showField && <Grid item xs={12} sm={sm}>
              {item !== 'operator' && <DefaultField
                label={NAMED_FIELD[item]}
                name={item}
                nameFieldArray={nameFieldArray}
                indexKey={indexKey}
              />}
              {item === 'operator' && <DefaultSelect
                label={NAMED_FIELD[item]}
                name={item}
                nameFieldArray={nameFieldArray}
                indexKey={indexKey}
              />}
            </Grid>}
          </>
        )
      })}
    </Grid>
    <ButtonDeleteField nameFieldArray={nameFieldArray} index={index} length={fields.length} />
  </MainCard>
)

const MainCard = styled(Card)` && {
  width: 580px;
  padding: 10px;
  margin-bottom: 10px;
  position: relative;
  padding: 0 16px 0 16px;
}`;
