import React, { Component } from "react";
import { Paper, Tab, Tabs } from "@material-ui/core";
import { Person, Business, SignalCellularAlt } from "@material-ui/icons";
import { Form } from 'react-final-form'
import styled from 'styled-components'
import arrayMutators from 'final-form-arrays'
import Notifier from './notifier';
import { inject, observer } from 'mobx-react';

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
    console.log(json)
  }

  handleClick = () => {
    this.props.store.enqueueSnackbar({
      message: 'Произошла какая-то неизвестная ошибка',
        options: {
          variant: 'warning',
        },
    });
  };

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
          senderClient: [{...DEFAULT_SENDER_CLIENT}],
          senderOperator: [{...DEFAULT_SENDER_OPERATOR}],
          receiverClient: [{...DEFAULT_RECEIVER_CLIENT}],
          receiverOperator: [{...DEFAULT_RECEIVER_OPERATOR}],
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
              <Notifier />
              
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
                    showSnackbar: this.props.store,
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

const getStepContent = ({ activePage, values, mutators, formApi, showSnackbar }) => {
  // formApi.change('senderClient', [{}]);
  // formApi.change('receiverClient', [{}]);
  // formApi.change('senderOperator', [{}]);
  // formApi.change('receiverOperator', [{}]);
  switch (activePage) {
    case 0:
      return <Client
        name='Client'
        finalformApi={formApi}
        valuesFinalForm={values}
        mutatorsFinalForm={mutators}
        showSnackbar={showSnackbar}
      />;
    case 1:
      return <Auth
        finalformApi={formApi}
        valuesFinalForm={values}
        mutatorsFinalForm={mutators}
        showSnackbar={showSnackbar}
      />;
    case 2:
      return <State />;
    default:
      throw new Error("Unknown step");
  }
};

export default App;
