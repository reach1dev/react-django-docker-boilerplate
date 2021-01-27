import React from "react";

import { Box, Button, LinearProgress, Typography } from "@material-ui/core";
import { ArrowBackIos } from '@material-ui/icons';
import { GridOverlay } from '@material-ui/data-grid';

import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";

import moment from 'moment';

import { authLogin, logout } from "../store/actions/auth";
import AppLogo from "../components/AppLogo";
import { getAllEvents, setSearchQuery } from "../store/actions/events";
import SearchBar from "../components/SearchBar";
import { checkEvent, filterEvents, getAllVehicleTypes } from "../store/utility";
import { API_URL } from "../constants/AppConfig";
import EventView from "./EventView";
import { XGrid } from '@material-ui/x-grid';

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

    const pathNames = this.props.history.location.pathname.split("/").filter((s) => s);
    let scrollToRow = -1;
    if (pathNames.length > 1) {
      scrollToRow = parseInt(pathNames[pathNames.length - 1]);
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);

    this.state = {
      scrollToRow: scrollToRow
    }

    this.rowHeight = 121;
    this.columns = [
      { field: 'thumb_file', headerName: 'Photo', flex: 1, sortable: false, renderCell: this.renderPhoto.bind(this) },
      { field: 'speed', headerName: 'Speed(MPH)', type: 'number', flex: 1, sortable: false, align: 'left', headerAlign: 'left' },
      {
        field: 'evt_time', headerName: 'Time', type: 'dateTime', flex: 2, sortable: false, valueFormatter: (params) => {
          return moment.utc(params.value).format('MMM D, yyyy h:mm A')
        }
      },
      { field: 'vehicle_type', headerName: 'Vehicle type', flex: 1, sortable: false },
      { field: 'license_plate', headerName: 'License plate', flex: 1, sortable: false },
    ];
    if (window.screen.width < 500) {
      this.columns = [
        { field: 'thumb_file', headerName: 'Photo', flex: 4, renderCell: this.renderPhoto.bind(this), sortable: false },
        { field: 'index', headerName: 'Event', flex: 5, renderCell: this.renderMobileCell.bind(this), sortable: false }
      ]
    }
  }

  componentDidMount() {
    this.eventsUpdateTimer = setInterval(() => {
      console.log('events update')
      this.props.update(this.props.token, this.props.events.length > 0 ? this.props.events[this.props.events.length - 1].evt_time : '');
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.eventsUpdateTimer);
  }

  renderPhoto(param) {
    const photoUrl = API_URL + '/media' + param.value; //.replace(".jpg", ".thumb.jpg");
    return (
      <img width={this.rowHeight} height={this.rowHeight} src={photoUrl} style={{ width: this.rowHeight, height: this.rowHeight, objectFit: 'contain' }} />
    )
  }

  renderMobileCell(param) {
    const event = this.props.events.find((e, i) => e.index === param.value);
    if (event) {
      return (
        <>
          <div>Speed: <b>{event.speed}</b>MPH</div>
          <div>{moment.utc(event.evt_time).format('yyyy-M-D h:mm A')}</div>
          <div>Type: <b>{event.vehicle_type}</b></div>
          <div>LP: <b>{event.license_plate}</b></div>
        </>
      )
    }
  }

  renderMobileTypeCell(param) {
    const event = this.props.events.find((e, i) => e.index === param.row.index);
    if (event) {
      return (
        <>
          <div>Type: <b>{event.vehicle_type}</b></div>
          <div>LP: <b>{event.license_plate}</b></div>
        </>
      )
    }
  }

  handleSearch(searchQuery) {
    this.props.setSearchQuery(searchQuery);
  }

  handleRowClick(param) {
    //const events = filterEvents(this.props.events, this.props.searchQuery);
    //this.props.history.push('/event/' + param.row.id);
    this.setState({
      scrollToRow: param.row.id
    })

    this.clearListener = this.props.history.listen(location => {
      if (this.props.history.action === "POP") {
        this.props.history.push('/search');
        this.setState({
          scrollToRow: -1
        })
        this.clearListener();
      }
    });
  }

  handleGoBack() {
    this.setState({ scrollToRow: -1 });
    if (this.clearListener) {
      this.clearListener();
    }
  }


  render() {
    const { error, loading, token } = this.props;
    const events = filterEvents(this.props.events, this.props.searchQuery);
    const vehicleTypes = getAllVehicleTypes(this.props.events);

    if (!token) {
      return <Redirect to="/login" />;
    }
    return (
      <>
        <Box display={this.state.scrollToRow >= 0 ? 'none' : 'unset'} flexDirection='column' >
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
            <SearchBar onSearch={this.handleSearch} searchQuery={this.props.searchQuery} vehicleTypes={vehicleTypes} hasSearchButton={false} hasVehicleMenu={true} />
            <div style={{ height: window.screen.height - 300, width: '100%', marginTop: 20 }} ref={(container) => { this.container = container; }} >
              <XGrid
                columns={this.columns}
                rowHeight={this.rowHeight + 10}
                // components={{
                //   loadingOverlay: CustomLoadingOverlay,
                // }}
                loading={this.props.loading}
                rows={events}
                className={window.screen.width < 500 ? 'collapsedTable' : ''}
                onRowClick={this.handleRowClick}
              />
            </div>
          </Box>
        </Box>

        {
          this.state.scrollToRow >= 0 &&
          <div style={{ position: 'absolute', top: 8, right: 0, bottom: 0, left: 8 }}>
            <EventView selectedRow={this.state.scrollToRow} goBack={() => this.handleGoBack()} />
          </div>
        }
      </>
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
