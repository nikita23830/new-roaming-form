import React, { Component } from "react";
import { Paper, Tab, Tabs } from "@material-ui/core";
import { Person, Business, SignalCellularAlt } from "@material-ui/icons";
import { Form } from 'react-final-form'
import styled from 'styled-components'
import arrayMutators from 'final-form-arrays'
import { SnackbarProvider, withSnackbar } from 'notistack';

import { FormDiv, Div } from './StyledComponents/'
import {
  DEFAULT_SENDER_CLIENT,
  DEFAULT_SENDER_OPERATOR,
  DEFAULT_RECEIVER_CLIENT,
  DEFAULT_RECEIVER_OPERATOR
} from './Constants'

import Auth from './Components/auth'
import State from './Components/state'
import Client from './Components/client'

import { validate } from './Validate'

class App extends Component {
  state = {
    activePage: 1
  };

  handleChange = value => e => {
    this.setState({ activePage: value })
  };

  bindFormApi = formApi => {
    this.formApi = formApi;
    const unsubscribe = () => {};
    return unsubscribe;
  };

  onSubmitFinalForm = json => {
    // console.log(json)
  }

  render() {
    const { activePage } = this.state;

    return (
      <Form
        onSubmit={this.onSubmitFinalForm}
        decorators={[this.bindFormApi]}
        validate={validate}
        mutators={{
          ...arrayMutators
        }}
        initialValues={{
          senderClient: [(activePage === 0) ? {...DEFAULT_SENDER_CLIENT} : {}],
          senderOperator: [(activePage === 1) ? {...DEFAULT_SENDER_OPERATOR} : {}],
          receiverClient: [(activePage === 0) ? {...DEFAULT_RECEIVER_CLIENT} : {}],
          receiverOperator: [(activePage === 1) ? {...DEFAULT_RECEIVER_OPERATOR} : {}],
        }}
        render={({
          handleSubmit,
          reset,
          submitting,
          pristine,
          values,
          form,
          errors,
          touched,
        }) => {
          const { change, mutators } = form

          return (
            <SnackbarProvider maxSnack={10}>
              <Paper square>
                <Tabs
                  value={activePage}
                  variant="fullWidth"
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab
                    icon={<Person />}
                    label="Клиентам"
                    value={0}
                    onClick={this.handleChange(0)}
                  />
                  <Tab
                    icon={<Business />}
                    label="Операторам"
                    value={1}
                    onClick={this.handleChange(1)}
                  />
                  <Tab
                    icon={<SignalCellularAlt />}
                    label="Состояние роуминга"
                    value={2}
                    onClick={this.handleChange(2)}
                  />
                </Tabs>
              </Paper>

              <FormDiv onSubmit={handleSubmit}>
                <Div>

                  {getStepContent({
                    activePage,
                    values,
                    mutators,
                    formApi: this.formApi,
                  })}

                </Div>
              </FormDiv>
            </SnackbarProvider>
          )
        }}
      />
    );
  }
}

const getStepContent = ({ activePage, values, mutators, formApi }) => {
  switch (activePage) {
    case 0:
      return <Client
        name='Client'
        finalformApi={formApi}
        valuesFinalForm={values}
        mutatorsFinalForm={mutators}
      />;
    case 1:
      return <Auth
        finalformApi={formApi}
        valuesFinalForm={values}
        mutatorsFinalForm={mutators}
      />;
    case 2:
      return <State />;
    default:
      throw new Error("Unknown step");
  }
};



export default App;
