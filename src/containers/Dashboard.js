import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@material-ui/core";

import { authLogin, logout } from "../store/actions/auth";
import AppLogo from "../components/AppLogo";
import StatsCard from "../components/StatsCard";
import SearchBar from "../components/SearchBar";
import { clearSearchQuery, getAllEvents, setSearchQuery } from "../store/actions/events";
import { eventsStatistics } from "../store/utility";


class Dashboard extends React.Component {

  constructor(props) {
    super(props)

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    // this.props.clearSearchQuery();
    this.props.getAllEvents(this.props.token);
  }

  handleSearch(searchQuery) {
    this.props.setSearchQuery(searchQuery)
    this.props.history.push('/search', searchQuery)
  }

  render() {
    const { error, loading, token } = this.props;
    const stats = eventsStatistics(this.props.events);
    const vehicleTypes = this.props.events.reduce((vts, event) => vts.includes(event.vehicle_type) ? vts : [...vts, event.vehicle_type], []);

    if (!token) {
      return <Redirect to="/login" />;
    }
    return (
      <Box>
        <Box display='flex' justifyContent='space-between' py={1} px={2}>
          <AppLogo />
          <Button onClick={this.props.logout}>Logout</Button>
        </Box>

        <Box borderBottom={1} mt={0} mb={{ xs: 1, lg: 4 }} />

        <Box py={1} px={2}>
          <Box mb={1} ml={2} >
            <Typography variant='h6' component='h6'>Traffic Statistics</Typography>
          </Box>
          <Grid container direction='row' justify='space-between' spacing={4}>
            <Grid container item xs={12} lg={4}>
              <StatsCard
                title='Today'
                numberOfVehicles={stats.today.count}
                avgSpeed={stats.today.avgSpeed}
                maxSpeed={stats.today.maxSpeed} />
            </Grid>

            <Grid container item xs={12} lg={4}>
              <StatsCard
                title='This week'
                titleVariant='h6'
                numberOfVehicles={stats.thisWeek.count}
                avgSpeed={stats.thisWeek.avgSpeed}
                maxSpeed={stats.thisWeek.maxSpeed} />
            </Grid>

            <Grid container item xs={12} lg={4}>
              <StatsCard
                title='Cumulative'
                numberOfVehicles={stats.cumulative.count}
                titleVariant='h6'
                avgSpeed={stats.cumulative.avgSpeed}
                maxSpeed={stats.cumulative.maxSpeed} />
            </Grid>
          </Grid>

          <Box mb={2} mt={4} ml={2}>
            <Typography variant='h6' component='h6'>Search vehicles</Typography>
          </Box>

          <SearchBar onSearch={this.handleSearch} searchQuery={this.props.searchQuery} vehicleTypes={vehicleTypes} hasVehicleMenu={true} />
        </Box>
      </Box >
    );
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
    login: (username, password) => dispatch(authLogin(username, password)),
    logout: () => dispatch(logout()),
    getAllEvents: (authToken) => dispatch(getAllEvents(authToken)),
    setSearchQuery: (searchQuery) => dispatch(setSearchQuery(searchQuery)),
    clearSearchQuery: () => dispatch(clearSearchQuery()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard));
