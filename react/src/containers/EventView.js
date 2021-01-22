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

    //const pathNames = this.props.history.location.pathname.split("/");
    const index = this.props.selectedRow;// parseInt(pathNames[pathNames.length - 1]);
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

    if (this.props.selectedRow < 0) {
      return null;
    }

    const textDisplay = 'inline';

    const cropImageUrl = API_URL + '/media' +
      (this.state.showCropped ? this.state.event.crop_file : this.state.event.photo_file);

    return (
      <Box display='flex' justifyContent='space-between' flexDirection='column' style={{ height: '100%' }}>
        <Box display='flex' flex={0} justifyContent='space-between' py={1} px={2} borderBottom={1}>
          <Box display='flex' justifyContent='flex-start' alignItems='center'>
            <NavLink to='./' onClick={(e) => { this.props.goBack(); e.preventDefault() }} >
              <ArrowBackIos fontSize='small' />
            </NavLink>
            <AppLogo title={'Event'} />
          </Box>
          <Button onClick={this.props.logout}>Logout</Button>
        </Box>

        { this.state.event && (
          <Box p={2} flex={1} textAlign='center' style={{ maxHeight: '80%', overflowY: 'scroll' }}>
            <img src={cropImageUrl} width={'100%'} style={{ maxWidth: 'min(75vw, 60vh)' }} />

            <Box mb={1} />
            <Button
              color='primary' variant='contained'
              onClick={() => this.setState({ showCropped: !this.state.showCropped })}
            >
              Show {this.state.showCropped ? 'full image' : 'cropped image'}
            </Button>
            <Box mb={2} />

            <Grid container justify='center' alignContent='center' alignItems='center' spacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>
                <Typography variant='h6' component='h6' display={textDisplay} > Speed: </Typography>
                <Typography variant='h5' component='h5' display={textDisplay} > {this.state.event.speed}MPH </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>
                <Typography variant='h6' component='h6' display={textDisplay} > Time: </Typography>
                <Typography variant='h6' component='h6' display={textDisplay} > {moment.utc(this.state.event.evt_time).format('MMM D, yyyy h:m A')}</Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>
                <Typography variant='h6' component='h6' display={textDisplay} > Vehicle type: </Typography>
                <Typography variant='h6' component='h6' display={textDisplay} > {this.state.event.vehicle_type} </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>
                <Typography variant='h6' component='h6' display={textDisplay} > License plate: </Typography>
                <Typography variant='h6' component='h6' display={textDisplay} > {this.state.event.license_plate} </Typography>
              </Grid>
            </Grid>


          </Box>
        )}
        <Box
          display='flex' flex={0} justifyContent='space-between' alignContent='center' alignItems='center'
          borderTop={1} pl={1} pr={1} pt={1} pb={3} spacing={4}
        >

          {this.state.event.index > 0 &&
            <Button
              color='primary' variant='contained'
              onClick={() => this.goNext(-1)}
              style={{ width: 120 }}
            >
              Previous
            </Button>
          }

          {this.state.event.index < this.props.events.length &&
            <Button
              color='primary' variant='contained'
              onClick={() => this.goNext(1)}
              style={{ width: 120 }}
            >
              Next
            </Button>
          }
        </Box>
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
