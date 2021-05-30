import React from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';


//COMPONENTES
import {
  InputBase,
  IconButton,
  Paper,
  FormHelperText,
  Grid,
  Tooltip
} from '@material-ui/core';

//CONSTANTES
import {URL_API_LIST} from '../lib/constants';

//ICONES
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles((theme) => ({
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: '100%'
  },
  iconButton: {
    padding: 10,
  },
  paperInput: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    border: 'none',
    boxShadow: 'rgba(0, 0, 0, 0.3) 0 1px 3px',
  },
  helptext: {
    color: theme.palette.error.light,
  }
}));

export default function InputItem() {

  const { register, handleSubmit, watch, errors } = useForm({ mode: "onChange" });
  const classes = useStyles();

  //INCLUIR ITEM
  const onSubmit = async (dados, e) => {
    const res = fetch(URL_API_LIST, {
      method: "POST",
      body: JSON.stringify(dados)
    })
    e.target.reset();
  }

  return (
    <>
      <Paper onSubmit={handleSubmit(onSubmit)} component="form" className={classes.paperInput}>
        <InputBase
          autoFocus 
          placeholder="Add a List..."
          className={classes.input}
          inputRef={register({ required: "List is required", maxLength: { value: 200, message: "Max lenght is 200 characters" } })}
          type="text"
          name="list"
          inputProps={{
            maxLength: 200,
          }}
        />
        <Tooltip title="Add">
          <IconButton color="inherit" type="submit" className={classes.iconButton} aria-label="add">
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Paper>
      {errors.list && <FormHelperText className={classes.helptext}>{errors.list.message}</FormHelperText>}
    </>
  );
}