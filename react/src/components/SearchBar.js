import React, { useState, useEffect } from 'react';
import { Box, Button, Fade, Grid, Menu, MenuItem, TextField } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';

export default function SearchBar({ onSearch, searchQuery = {}, vehicleTypes = [], hasSearchButton = true, hasVehicleMenu = false }) {

  const filterModes = ['Select', 'Today', 'This week', 'Cumulative', 'A specific date', 'A specific time'];

  const [filterMode, setFilterMode] = useState(searchQuery.filterMode || 'Cumulative');
  const [filterDate, setFilterDate] = useState(searchQuery.filterDate || '');
  const [filterTime, setFilterTime] = useState(searchQuery.filterTime || '');
  const [sortMode, setSortMode] = useState(searchQuery.sortMode || 'Speed');
  const [speedThreshold, setSpeedThreshold] = useState(searchQuery.speedThreshold || 0);
  const [vehicleType, setVehicleType] = useState(searchQuery.vehicleType || 'all_vehicle');

  const [anchorEl, setAnchorEl] = useState(null);
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [vehicleTypeMenuVisible, setVehicleTypeVisible] = useState(false);

  useEffect(() => {
    if (!hasSearchButton) {
      onSearch({ filterMode, filterDate, filterTime, sortMode, speedThreshold, vehicleType })
    }
    return () => {
    }
  }, [filterMode, filterDate, filterTime, sortMode, speedThreshold, vehicleType, hasSearchButton, onSearch])

  // useEffect(() => {
  //   setFilterMode(searchQuery.filterMode || 'Cumulative');
  //   setFilterDate(searchQuery.filterDate || '');
  //   setFilterTime(searchQuery.filterTime || '');
  //   setSortMode(searchQuery.sortMode || 'Speed');
  //   setSpeedThreshold(searchQuery.speedThreshold || 0);
  //   setVehicleType(searchQuery.vehicleType || '');
  // }, [searchQuery])

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
    setFilterMenuVisible(true);
  }

  const handleMenuClose = () => setFilterMenuVisible(false);

  const handleMenuItemClicked = (item) => {
    setFilterMenuVisible(false);
    setFilterMode(item);
  }

  const handleVTMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
    setVehicleTypeVisible(true);
  }

  const handleVTMenuClose = () => setVehicleTypeVisible(false);

  const handleVTMenuItemClicked = (item) => {
    setVehicleTypeVisible(false);
    setVehicleType(item);
  }

  const inlineSearchButton = !hasVehicleMenu || (window.screen.width < 800 || !filterMode.includes('specific'));

  return (
    <>
      <Grid container direction='row' justify='space-between' spacing={2}>
        <Grid item xs={12} lg={2}>
          <Box boxShadow={3} display='flex' justifyContent='space-between' onClick={handleMenuOpen}>
            <Button style={{ width: '100%' }}>
              {filterMode}
              <ArrowDropDown />
            </Button>
          </Box>
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            keepMounted
            open={filterMenuVisible}
            onClose={handleMenuClose}
            TransitionComponent={Fade}
          >
            {filterModes.map((option, index) => (
              <MenuItem
                key={option}
                disabled={index === 0}
                selected={option === filterMode}
                onClick={() => handleMenuItemClicked(option)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Grid>

        {filterMode.includes('specific') &&
          <Grid container item justify='flex-start' xs={12} lg={filterMode.includes('time') ? 3 : 2} spacing={1}>
            <Grid item xs={12} lg={filterMode.includes('time') ? 6 : 12}>
              <TextField
                id="date"
                variant='outlined'
                size='small'
                fullWidth
                label="Date to filter"
                type="date"
                defaultValue="2017-05-24"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            {filterMode.includes('time') && <Grid item xs={12} lg={6}>
              <TextField
                id="time"
                variant='outlined' size='small'
                fullWidth
                label="Time to filter"
                type="time"
                defaultValue="07:30"
                value={filterTime}
                onChange={(e) => setFilterTime(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>}
          </Grid>}

        {hasVehicleMenu && <Grid item xs={12} lg={2}>
          <Box boxShadow={3} display='flex' justifyContent='space-between' onClick={handleVTMenuOpen}>
            <Button style={{ width: '100%' }}>
              {vehicleType === 'all_vehicle' ? 'All vehicles' : (vehicleType === 'all_photo' ? 'All photos' : vehicleType)}
              <ArrowDropDown />
            </Button>
          </Box>
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            keepMounted
            open={vehicleTypeMenuVisible}
            onClose={handleVTMenuClose}
            TransitionComponent={Fade}
          >
            <MenuItem
              key='all_vehicle'
              selected={'all_vehicle' === vehicleType}
              onClick={() => handleVTMenuItemClicked('all_vehicle')}
            >
              All vehicles
            </MenuItem>
            {vehicleTypes.map((option) => (
              <MenuItem
                key={option}
                selected={option === filterMode}
                onClick={() => handleVTMenuItemClicked(option)}
              >
                {option}
              </MenuItem>
            ))}
            <MenuItem
              key='all_photo'
              selected={'all_photo' === vehicleType}
              onClick={() => handleVTMenuItemClicked('all_photo')}
            >
              All photos
            </MenuItem>
          </Menu>
        </Grid>}

        <Grid item xs={12} lg={3}>
          <Box boxShadow={3} display='flex' justifyContent='center'>
            <Button
              fullWidth
              variant={sortMode === 'Speed' ? "contained" : "outlined"}
              color={sortMode === 'Speed' ? 'primary' : 'default'}
              style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
              onClick={() => setSortMode('Speed')}
            >
              Sort by speed
          </Button>
            <Button
              fullWidth
              variant={sortMode !== 'Speed' ? "contained" : "outlined"}
              color={sortMode !== 'Speed' ? 'primary' : 'default'}
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              onClick={() => setSortMode('Date')}
            >
              Sort by date/time
          </Button>
          </Box>
        </Grid>

        <Grid item xs={12} lg={2}>
          <Box boxShadow={2}>
            <TextField
              fullWidth
              label='Speed threshold (MPH)'
              variant='outlined'
              size='small'
              type='number'
              value={speedThreshold}
              onChange={(e) => setSpeedThreshold(e.target.value)}
            />
          </Box>
        </Grid>

        {(hasSearchButton && inlineSearchButton) && <Grid item xs={12} lg={2}>
          <Box boxShadow={3} onClick={() => onSearch({ filterMode, filterDate, filterTime, sortMode, speedThreshold, vehicleType })}>
            <Button color='secondary' variant='contained' fullWidth>Search vehicles</Button>
          </Box>
        </Grid>}
      </Grid>

      { (hasSearchButton && !inlineSearchButton) && <Box mt={4} display='flex' justifyContent='center'><Grid item xs={12} lg={2}>
        <Box boxShadow={3} onClick={() => onSearch({ filterMode, filterDate, filterTime, sortMode, speedThreshold, vehicleType })}>
          <Button color='secondary' variant='contained' fullWidth>Search vehicles</Button>
        </Box>
      </Grid></Box>}
    </>
  )
}