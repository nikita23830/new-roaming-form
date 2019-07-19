import React from 'react'
import { Paper, Tabs, Tab } from '@material-ui/core'
import { TABS_ICON, TABS_NAME } from 'Constants/Components/DefaultTabs'

const DefaultTabs = ({ activePage, handleChange }) => {

  return (
    <Paper square>
      <Tabs
        value={activePage}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >

        {TABS_NAME.map((item, index) => (
          <Tab icon={TABS_ICON[index]} label={item} value={index} onClick={handleChange(index)} />
        ))}

      </Tabs>
    </Paper>
  )
}

export default DefaultTabs
