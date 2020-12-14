import React from "react";

import { Box, Button, LinearProgress, Typography } from "@material-ui/core";
import { ArrowBackIos } from '@material-ui/icons';
import { DataGrid, GridOverlay, sortModelSelector } from '@material-ui/data-grid';

import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";

import moment from 'moment';

import { authLogin, logout } from "../store/actions/auth";
import AppLogo from "../components/AppLogo";
import { getAllEvents, setSearchQuery } from "../store/actions/events";
import SearchBar from "../components/SearchBar";
import { checkEvent, filterEvents } from "../store/utility";
import { API_URL } from "../constants/AppConfig";

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}


class SearchResults extends React.Component {

  constructor(props) {
    super(props)

    this.handleSearch = this.handleSearch.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);

    this.columns = [
      { field: 'speed', headerName: 'Speed(MPH)', type: 'number', flex: 1, sortable: false, align: 'left', headerAlign: 'left' },
      {
        field: 'evt_time', headerName: 'Time', type: 'dateTime', flex: 1, sortable: false, valueFormatter: (params) => {
          return moment.utc(params.value).format('MMM D, yyyy hh:mm A')
        }
      },
      { field: 'vehicle_type', headerName: 'Vehicle type', flex: 1, sortable: false },
      { field: 'photo_file', headerName: 'Photo', flex: 2, sortable: false, renderCell: this.renderPhoto.bind(this) },
      { field: 'license_plate', headerName: 'License plate', flex: 1, sortable: false },
    ];
    if (window.screen.width < 500) {
      this.columns = [
        { field: 'index', headerName: 'Event', flex: 2, renderCell: this.renderMobileCell.bind(this), sortable: false },
        { field: 'vehicle_type', headerName: 'Vehicle', width: 100, sortable: false },
        { field: 'photo_file', headerName: 'Photo', flex: 1, renderCell: this.renderPhoto.bind(this), sortable: false }
      ]
    }
    this.vehicleTypes = this.props.events.reduce((vts, event) => vts.includes(event.vehicle_type) ? vts : [...vts, event.vehicle_type], [])
  }

  componentDidMount() {
    this.eventsUpdateTimer = setInterval(() => {
      this.props.update(this.props.token, this.props.events.length > 0 ? this.props.events[this.props.events.length - 1].evt_time : '');
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.eventsUpdateTimer);
  }

  renderPhoto(param) {
    return (
      <img src={API_URL + '/media' + param.value} width={100} height={100} />
    )
  }

  renderMobileCell(param) {
    const event = this.props.events.find((e, i) => e.index === param.value);
    if (event) {
      return (
        <>
          <div>Speed: <b>{event.speed}</b>MPH</div>
          <div>{moment.utc(event.evt_time).format('yyyy-M-D h:m A')}</div>
        </>
      )
    }
  }

  handleSearch(searchQuery) {
    this.props.setSearchQuery(searchQuery);
  }

  handleRowClick(params) {
    this.props.history.push('/event/' + params.row.index)
  }


  render() {
    const { error, loading, token } = this.props;
    let events = filterEvents(this.props.events, this.props.searchQuery);

    if (!token) {
      return <Redirect to="/login" />;
    }
    return (
      <Box>
        <Box display='flex' justifyContent='space-between' py={1} px={2}>
          <Box display='flex' justifyContent='flex-start' alignItems='center'>
            <NavLink to={'../'} >
              <ArrowBackIos fontSize='small' />
            </NavLink>
            <AppLogo title={'Search'} />
          </Box>
          <Button onClick={this.props.logout}>Logout</Button>
        </Box>

        <Box borderBottom={1} mt={0} mb={{ xs: 1, lg: 4 }} />

        <Box px={2}>
          <SearchBar onSearch={this.handleSearch} searchQuery={this.props.searchQuery} vehicleTypes={this.vehicleTypes} hasSearchButton={false} hasVehicleMenu={true} />
          <div style={{ height: window.screen.height - 300, width: '100%', marginTop: 20 }}>
            <DataGrid
              columns={this.columns}
              components={{
                loadingOverlay: CustomLoadingOverlay,
              }}
              loading={this.props.loading}
              rows={events}
              pageSize={50}
              className={window.screen.width < 500 ? 'collapsedTable' : ''}
              onRowClick={this.handleRowClick}
            />
          </div>
        </Box>
      </Box >
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.events.loading,
    error: state.auth.error,
    token: state.auth.token,
    events: state.events.events,
    searchQuery: state.events.searchQuery
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    update: (token, lastUpdatedTime) => dispatch(getAllEvents(token, lastUpdatedTime)),
    setSearchQuery: (searchQuery) => dispatch(setSearchQuery(searchQuery))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);
