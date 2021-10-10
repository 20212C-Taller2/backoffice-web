import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import React, { useState } from 'react';
import iconUbademy from "../../res/images/ubademy.svg";
import { useForm } from '../hooks/useForm';
import isEmail from 'validator/lib/isEmail';
import isEmpty from "validator/lib/isEmpty";
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

interface State {
  invalidEmail: boolean;
  showPassword: boolean;
  invalidCredentials: boolean;
}

export function Login(props): JSX.Element {
  const classes = useStyles();

  const [formValues, handleInputChange] = useForm({
    email: '',
    password: '',
  });

  const { email, password } = formValues;

  const [values, setValues] = useState<State>({
    invalidEmail: false,
    showPassword: false,
    invalidCredentials: false
  });


  const handleClickShowPassword = () => {
    setValues({...values, showPassword: !values.showPassword});
  }

  const handleOnBlurEmail = () => {
    setValues({...values, invalidEmail: !isEmpty(email) && !isEmail(email)});
  }

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: CA 1: Login Exitoso
    /*localStorage.setItem("token", JSON.stringify({email, password}));
    props.history.push("/home");
    */
    // TODO: CA 2: Login fallido (credenciales incorrectas)
    setValues({...values, invalidCredentials: true});
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar src={iconUbademy} className={classes.avatar}/>
        <Typography component="h1" variant="h5">
          Ubademy
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            autoFocus
            error={values.invalidEmail}
            onChange={handleInputChange}
            onBlur={handleOnBlurEmail}
          />
          {values.invalidEmail && <Alert severity="error">Formato de correo incorrecto</Alert>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type={values.showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
            }}
          />
          {values.invalidCredentials && <Alert severity="error">Correo electrónico o contraseña incorrecta</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Ingresar
          </Button>
        </form>
      </div>
    </Container>
  );
}

Login.propTypes = {};
