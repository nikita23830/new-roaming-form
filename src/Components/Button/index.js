import React from 'react'

import Button_Add_Field from './ButtonAddField'
import Button_Upload from './ButtonUpload'
import Button_Bottom_ToolBox from './ButtonBottomToolBox'
import Button_Delete_Field from './ButtonDeleteField'
import Button_Navigate from './ButtonNavigate'

export const ButtonAddField = ({...rest}) => <Button_Add_Field {...rest} />
export const ButtonUpload = ({...rest}) => <Button_Upload {...rest} />
export const ButtonBottomToolBox = ({...rest}) => <Button_Bottom_ToolBox {...rest} />
export const ButtonDeleteField = ({...rest}) => <Button_Delete_Field {...rest} />
export const ButtonNavigate = ({...rest}) => <Button_Navigate {...rest} />
