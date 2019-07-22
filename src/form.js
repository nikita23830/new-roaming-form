import React, { Component } from 'react'
import arrayMutators from "final-form-arrays";
import { Form } from "react-final-form";
import { DataProvider } from 'Utils/context';
import App from 'App';
import { DEFAULT_SENDER_CLIENT, DEFAULT_SENDER_OPERATOR, DEFAULT_RECEIVER_CLIENT, DEFAULT_RECEIVER_OPERATOR } from "Constants";
import { axiosAPI } from 'Utils/axios'
import { withSnackbar } from "notistack";
import { showSnackbar } from 'Utils/Snackbar'

class FinalForm extends Component {

  bindFormApi = formApi => {
    this.formApi = formApi;
    const unsubscribe = () => {};
    return unsubscribe;
  };

  onSubmitFinalForm = async json => {
    const { active, senderOperatorfile, receiverAbonentfile, receiverOperatorfile } = json
    const { enqueueSnackbar, closeSnackbar } = this.props
    let dataSend = {
      sender: active === 0 ? json.senderAbonent : json.senderOperator,
      receiver: active === 0 ? json.receiverAbonent : json.receiverOperator
    }
    var dataForm = new FormData();
    dataForm.set("data", JSON.stringify(dataSend));
    if (active === 0 && receiverAbonentfile) dataForm.append("receiver_list", receiverAbonentfile);
    if (json.Abonentfile) dataForm.append("agreement", json.Abonentfile);
    if (active === 1) {
      if (senderOperatorfile) dataForm.append("sender_list", senderOperatorfile);
      if (receiverOperatorfile) dataForm.append("receiver_list", receiverOperatorfile);
    }

    const { status, data } = await axiosAPI({ path: active === 0 ? 'abonent' : 'operator', dataAxios: dataForm })
    if (status !== 200) showSnackbar({ enqueueSnackbar,
      text: 'Сервер временно не доступен. Повторите позднее', variant: 'error', closeSnackbar })
    else {
      if (data.status === 1) showSnackbar({ enqueueSnackbar,
        text: data.code ? data.code : data.text, variant: 'warning', closeSnackbar })
    }

  }

  render () {
    return (
      <Form
        onSubmit={this.onSubmitFinalForm}
        decorators={[this.bindFormApi]}
        mutators={{ ...arrayMutators }}
        initialValues={{
          senderAbonent: [{...DEFAULT_SENDER_CLIENT}],
          senderOperator: [{...DEFAULT_SENDER_OPERATOR}],
          receiverAbonent: [{...DEFAULT_RECEIVER_CLIENT}],
          receiverOperator: [{...DEFAULT_RECEIVER_OPERATOR}]
        }}
        render={({ handleSubmit, reset, submitting, pristine, values, form, errors, touched }) => {
          const { change, mutators } = form;

          return (
            <DataProvider value={{ formApi: this.formApi, mutators: mutators }}>
              <App values={values} mutators={mutators} formApi={this.formApi} />
            </DataProvider>
          );
        }}
      />
    )
  }
}

export default withSnackbar(FinalForm)
