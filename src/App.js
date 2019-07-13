import React, { Component } from "react";
import { Paper, Tab, Tabs } from "@material-ui/core";
import { Person, Business, SignalCellularAlt } from "@material-ui/icons";
import { Form } from 'react-final-form'
import styled from 'styled-components'
import arrayMutators from 'final-form-arrays'

import { FormDiv, Div } from './StyledComponents/'

import Auth from './Components/auth'
import State from './Components/state'
import FirstStepClient from './Steps/first-step-client'

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

        <Form
          onSubmit={this.onSubmitFinalForm}
          decorators={[this.bindFormApi]}
          mutators={{
            ...arrayMutators
          }}
          initialValues={{
            senderClient: [{}],
            receiverClient: [{}],
            senderOperator: [{}],
            receiverOperator: [{}],
          }}
          render={({
            handleSubmit,
            reset,
            submitting,
            pristine,
            values,
            form,
            errors,
            touched
          }) => {
            const { change } = form

            return (
              <FormDiv onSubmit={handleSubmit}>
                <Div>

                  {getStepContent({
                    activePage,
                    values,
                    formApi: this.formApi,
                  })}

                </Div>
              </FormDiv>
            )
          }}
        />

      </>
    );
  }
}

const getStepContent = ({ activePage, values, formApi }) => {
  switch (activePage) {
    case 0:
      return <FirstStepClient />;
    case 1:
      return <Auth
        finalformApi={formApi}
        valuesFinalForm={values}
      />;
    case 2:
      return <State />;
    default:
      throw new Error("Unknown step");
  }
};

export default App;
