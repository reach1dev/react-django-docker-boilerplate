import React from "react";

import { Box, Button, LinearProgress, Typography } from "@material-ui/core";
import { ArrowBackIos } from '@material-ui/icons';
import { DataGrid, GridOverlay, sortModelSelector } from '@material-ui/data-grid';
import ReactDataGrid from "react-data-grid";

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

    this.state = {
      selectedRow: -1
    }

    this.rowHeight = 121;
    this.columns = [
      { key: 'thumb_file', name: 'Photo', flex: 1, sortable: false, formatter: this.renderPhoto.bind(this) },
      { key: 'speed', name: 'Speed(MPH)', type: 'number', flex: 1, sortable: false, align: 'left', headerAlign: 'left' },
      {
        key: 'evt_time', name: 'Time', type: 'dateTime', flex: 2, sortable: false, formatter: (params) => {
          return moment.utc(params.value).format('MMM D, yyyy hh:mm A')
        }
      },
      { key: 'vehicle_type', name: 'Vehicle type', flex: 1, sortable: false },
      { key: 'license_plate', name: 'License plate', flex: 1, sortable: false },
    ];
    if (window.screen.width < 500) {
      this.columns = [
        { key: 'thumb_file', name: 'Photo', flex: 1, formatter: this.renderPhoto.bind(this), sortable: false },
        { key: 'index', name: 'Event', flex: 2, formatter: this.renderMobileCell.bind(this), sortable: false }
      ]
    }
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
    const photoUrl = API_URL + '/media' + param.value; //.replace(".jpg", ".thumb.jpg");
    return (
      <div width={this.rowHeight} height={this.rowHeight} style={{ backgroundImage: 'url(' + photoUrl + ')', margin: 2, width: this.rowHeight, height: this.rowHeight, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} />
    )
  }

  renderMobileCell(param) {
    const event = this.props.events.find((e, i) => e.index === param.value);
    if (event) {
      return (
        <>
          <div>Speed: <b>{event.speed}</b>MPH</div>
          <div>Speed: <b>{event.speed}</b>MPH</div>
          <div>{moment.utc(event.evt_time).format('yyyy-M-D h:m A')}</div>
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

  handleRowClick(idx) {
    //const events = filterEvents(this.props.events, this.props.searchQuery);
    //this.props.history.push('/event/' + events[idx].id);
    this.setState({
      selectedRow: idx
    })
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
        <Box display={this.state.selectedRow >= 0 ? 'none' : 'flex'} flexDirection='column'>
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
              <ReactDataGrid
                ref={(ref) => this.dataGrid = ref}
                columns={this.columns}
                rowGetter={(i) => events[i]}
                rowsCount={events.length}
                headerRowHeight={30}
                rowHeight={this.rowHeight + 10}
                minHeight={window.screen.height - 300}
                components={{
                  loadingOverlay: CustomLoadingOverlay,
                }}
                onScroll={(e) => {
                  console.log(this.dataGrid)
                }}
                enableCellSelect={false}
                enableDragAndDrop={false}
                loading={this.props.loading}
                rows={events}
                className={window.screen.width < 500 ? 'collapsedTable' : ''}
                //onCellSelected={this.handleRowClick}
                onRowClick={this.handleRowClick}
              //onRowSelect={this.handleRowClick}
              />
            </div>
          </Box>
        </Box >
        { this.state.selectedRow >= 0 &&
          <EventView selectedRow={this.state.selectedRow} goBack={() => this.setState({ selectedRow: -1 })} />
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
