import React from "react";

import { Box, Button, Container, FormGroup, Grid, TextField, Typography } from "@material-ui/core";
import { palette, spacing, typography } from '@material-ui/system';

import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";

import { authLogin } from "../store/actions/auth";
import Header from "../components/Header";
import Message from "../components/Message";
import AppLogo from "../components/AppLogo";

class LoginForm extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.login(username, password);
  };

  render() {
    const { error, loading, token } = this.props;
    const { username, password } = this.state;
    if (token) {
      return <Redirect to="/" />;
    }
    return (
      <Grid container>
        <Grid container item justify='center'>
          <Box mt={10}><AppLogo size='large' /></Box>
        </Grid>
        <Box mx="auto" mt={10} minWidth={300} p={3} boxShadow={2} width='fit-content' textAlign='center'>

          <FormGroup >
            <form size="large" onSubmit={this.handleSubmit}>
              <Grid container direction='column' spacing={2}>
                <Grid container item justify='center'>
                  <Typography component='h6' variant='h6'>
                    Log-in to your account
                  </Typography>
                </Grid>

                <Grid container item>
                  <TextField
                    variant='outlined'
                    size='small'
                    onChange={this.handleChange}
                    value={username}
                    name="username"
                    fullWidth
                    placeholder="Username"
                  />
                </Grid>

                <Grid container item>
                  <TextField
                    variant='outlined'
                    size='small'
                    onChange={this.handleChange}
                    value={password}
                    name="password"
                    fullWidth
                    placeholder="Password"
                    type="password"
                  />
                </Grid>

                <Grid container item>
                  <Button
                    variant="contained"
                    fullWidth={true}
                    onClick={this.handleSubmit}
                    disabled={loading}
                  >
                    Login
                  </Button>
                </Grid>

                <span style={{ color: 'red' }}>{error && <p>{this.props.error.message}</p>}</span>

                <Grid container item justify='center'>
                  <Message>
                    New to us? <NavLink to="/signup">Sign Up</NavLink>
                  </Message>
                </Grid>
              </Grid>
            </form>

          </FormGroup>
        </Box>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(authLogin(username, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
