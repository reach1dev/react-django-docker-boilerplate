import React from "react";

import { Box, Button, Grid, Typography } from "@material-ui/core";
import { ArrowBackIos } from '@material-ui/icons';

import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import moment from 'moment';
import AppLogo from "../components/AppLogo";
import { API_URL } from "../constants/AppConfig";
import { filterEvents } from "../store/utility";

import { authLogin, logout } from "../store/actions/auth";


class EventView extends React.Component {

  constructor(props) {
    super(props)

    const pathNames = this.props.history.location.pathname.split("/");
    const index = parseInt(pathNames[pathNames.length - 1]);
    const events = filterEvents(this.props.events, this.props.searchQuery);
    this.state = {
      index: index,
      event: events[index],
      events: events,
      showCropped: true
    };
  }

  goNext(dir = 1) {
    const next = this.state.index + dir;
    if (next < 0 | next >= this.state.events.length) {
      return;
    }
    this.setState({
      index: next,
      event: this.state.events[next]
    });
  }

  render() {
    const { error, loading, token } = this.props;

    if (!token) {
      return <Redirect to="/login" />;
    }

    const textDisplay = 'inline';

    const cropImageUrl = API_URL + '/media' +
      (this.state.showCropped ? this.state.event.photo_file.replace(".jpg", ".crop.jpg") : this.state.event.photo_file);

    return (
      <Box>
        <Box display='flex' justifyContent='space-between' py={1} px={2}>
          <Box display='flex' justifyContent='flex-start' alignItems='center'>
            <NavLink to='/search' >
              <ArrowBackIos fontSize='small' />
            </NavLink>
            <AppLogo title={'Event'} />
          </Box>
          <Button onClick={this.props.logout}>Logout</Button>
        </Box>

        <Box borderBottom={1} mt={0} mb={{ xs: 1, lg: 4 }} />

        { this.state.event && (
          <Box p={2} textAlign='center'>
            <img src={cropImageUrl} width={this.state.showCropped ? null : '100%'} style={{ maxWidth: this.state.showCropped ? 'min(100%, 800px)' : 800 }} />

            <Box mb={1} />
            <Button
              color='primary' variant='contained'
              onClick={() => this.setState({ showCropped: !this.state.showCropped })}
            >
              Show {this.state.showCropped ? 'full image' : 'cropped image'}
            </Button>
            <Box mb={2} />

            <Grid container justify='center' alignContent='center' alignItems='center' spacing={2}>
              <Grid item xs={12} lg={3} xl={2}>
                <Typography variant='h6' component='h6' display={textDisplay} > Speed: </Typography>
                <Typography variant='h5' component='h5' display={textDisplay} > {this.state.event.speed}MPH </Typography>
              </Grid>

              <Grid item xs={12} lg={3} xl={2}>
                <Typography variant='h6' component='h6' display={textDisplay} > Time: </Typography>
                <Typography variant='h6' component='h6' display={textDisplay} > {moment.utc(this.state.event.evt_time).format('MMM D, yyyy h:m A')}</Typography>
              </Grid>

              <Grid item xs={12} lg={3} xl={2}>
                <Typography variant='h6' component='h6' display={textDisplay} > Vehicle type: </Typography>
                <Typography variant='h5' component='h5' display={textDisplay} > {this.state.event.vehicle_type} </Typography>
              </Grid>

              <Grid item xs={12} lg={3} xl={2}>
                <Typography variant='h6' component='h6' display={textDisplay} > License plate: </Typography>
                <Typography variant='h5' component='h5' display={textDisplay} > {this.state.event.license_plate} </Typography>
              </Grid>
            </Grid>

            <Grid container justify='center' alignContent='center' alignItems='center' spacing={4}>
              <Grid item xs={6} lg={3} xl={2}>
                {this.state.event.index > 0 && <Button
                  fullWidth
                  color='primary' variant='contained'
                  onClick={() => this.goNext(-1)}
                >
                  Previous
                </Button>}
              </Grid>

              <Grid item xs={6} lg={3} xl={2}>
                {this.state.event.index < this.props.events.length && <Button
                  fullWidth
                  color='primary' variant='contained'
                  onClick={() => this.goNext(1)}
                >
                  Next
                </Button>}
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    )
  }

}


const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token,
    events: state.events.events,
    searchQuery: state.events.searchQuery
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventView);
