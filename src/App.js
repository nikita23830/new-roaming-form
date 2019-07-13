import React, { Component } from "react";
import { Paper, Tab, Tabs } from "@material-ui/core";
import { Person, Business, SignalCellularAlt } from "@material-ui/icons";
import { Form } from 'react-final-form'
import styled from 'styled-components'
import arrayMutators from 'final-form-arrays'

import { FormDiv, Div } from './StyledComponents/'
import { DEFAULT_OBJECT } from './Constants'

import Auth from './Components/auth'
import State from './Components/state'
import Client from './Components/client'

class App extends Component {
  state = {
    activePage: 0
  };

  handleChange = value => e => {
    this.setState({ activePage: value });
  };

  bindFormApi = formApi => {
    this.formApi = formApi;
    const unsubscribe = () => {};
    return unsubscribe;
  };

  onSubmitFinalForm = json => {
    console.log(json)
  }

  render() {
    const { activePage } = this.state;

    return (
      <Form
        onSubmit={this.onSubmitFinalForm}
        decorators={[this.bindFormApi]}
        mutators={{
          ...arrayMutators
        }}
        initialValues={{
          senderClient: [{...DEFAULT_OBJECT}],
          senderOperator: [{...DEFAULT_OBJECT}],
          receiverClient: [{...DEFAULT_OBJECT}],
          receiverOperator: [{...DEFAULT_OBJECT}],
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
            <>
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
            </>
          )
        }}
      />
    );
  }
}

const getStepContent = ({ activePage, values, mutators, formApi }) => {
  // formApi.change('senderClient', [{}]);
  // formApi.change('receiverClient', [{}]);
  // formApi.change('senderOperator', [{}]);
  // formApi.change('receiverOperator', [{}]);
  switch (activePage) {
    case 0:
      return <Client
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
