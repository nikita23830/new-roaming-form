import React, { Component } from "react";
import { Paper, Tab, Tabs } from "@material-ui/core";
import { Person, Business, SignalCellularAlt } from "@material-ui/icons";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { SnackbarProvider } from "notistack";

import { FormDiv, Div } from "./StyledComponents/";

import Auth from "Components/auth";
import State from "Components/state";
import Client from "Components/client";
import DefaultTabs from 'Components/Tabs'

class App extends Component {
  state = { activePage: 1 };

  handleChange = value => e => this.setState({ activePage: value });

  render() {
    const { activePage } = this.state;
    const { values, mutators, formApi } = this.props

    return (
      <>
        <DefaultTabs activePage={activePage} handleChange={this.handleChange} />

        <FormDiv>
          <Div>
            {getStepContent({
              activePage,
              values,
              mutators,
              formApi: formApi
            })}
          </Div>
        </FormDiv>
      </>
    );
  }
}

const getStepContent = ({ activePage, values, mutators, formApi }) => {
  if (formApi) formApi.change('active', activePage)
  switch (activePage) {
    case 0:
      return (
        <Client
          name="Abonent"
          finalformApi={formApi}
          valuesFinalForm={values}
          mutatorsFinalForm={mutators}
        />
      );
    case 1:
      return (
        <Auth
          finalformApi={formApi}
          valuesFinalForm={values}
          mutatorsFinalForm={mutators}
        />
      );
    case 2:
      return <State />;
    default:
      throw new Error("Unknown step");
  }
};

export default App;
