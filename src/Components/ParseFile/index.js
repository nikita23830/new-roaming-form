import React, { Component } from 'react'
import styled from 'styled-components'
import { Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Card, List, ListItem } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import readXlsxFile from 'read-excel-file'

class ParseFile extends Component {

  state = {
    data: {ul: [], ip: []}
  }

  async componentDidMount() {
    const { file } = this.props
    let data = {ul: [], ip: []};
    if (file) {
      let readFile = await readXlsxFile(file)
      if (readFile.length === 1) data = {ul: ['Юридических лиц нет в списке'], ip: ['Индивидуальных предпринимателей нет в списке']}
      else {
        readFile.map(rows => {
          if (rows[1].length === 10 && rows[0]) data['ul'].push(rows[0])
          if (rows[1].length === 12 && rows[4] && rows[5]) data['ip'].push(`ИП ${rows[4]} ${rows[5]} ${rows[6]}`)
        })
      }
    }
    if (data['ul'].length === 0) data['ul'] = ['Юридических лиц нет в списке']
    if (data['ip'].length === 0) data['ip'] = ['Индивидуальных предпринимателей нет в списке']
    this.setState({data})
  }
  render () {
    const { data } = this.state

    return (
      <MainCard>
        <Typography>Данные из загруженного списка</Typography>
        {Object.keys(data).map(item => (
          <StyledExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>{item === 'ul' ? 'Юридические лица' : 'Индивидуальные предприниматели'}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <StyledList>
                {data[item].map(orgName => (
                  <ListItem>{orgName}</ListItem>
                ))}
              </StyledList>
            </ExpansionPanelDetails>
          </StyledExpansionPanel>
        ))}
      </MainCard>
    )
  }
}

const MainCard = styled(Card)` && {
  width: 580px;
  padding: 10px;
  margin-bottom: 10px;
  position: relative;
}`;

const StyledExpansionPanel = styled(ExpansionPanel)` && {
  margin-top: 5px;
  margin-bottom: 5px;
}`;

const StyledList = styled(List)` && {
  width: 580px;
}`;

export default ParseFile
