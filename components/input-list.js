import React from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';

//Material-Ui-Components
import {
  InputBase,
  IconButton,
  Paper,
  FormHelperText,
  Tooltip,
  FormControlLabel,
  Switch,
  Divider
} from '@material-ui/core';

//Constants
import { URL_API_LIST } from '../lib/constants';

//Material-Ui-Icons
import AddIcon from '@material-ui/icons/Add';

//Edit styles
const useStyles = makeStyles((theme) => ({
  
}));

export default function InputItem() {

  const { register, handleSubmit, watch, errors } = useForm({ mode: "onChange" });
  const classes = useStyles();

  //INCLUIR ITEM
  const onSubmit = async (dados, e) => {
    const res = fetch(URL_API_LIST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados)
    })
    e.target.reset();
  }

  return (
    
  );
}