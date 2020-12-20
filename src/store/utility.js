import moment from 'moment';

export const getCurrentTime = () => {
  return moment.utc().format();
}

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};


export const eventsAvgSpeed = (events) => {
  if (events.length === 0) {
    return 0;
  }
  return (events.reduce((sum, e) => Math.abs(e.speed) + sum, 0) / events.length).toFixed(2);
}

export const eventsMaxSpeed = (events) => {
  return events.reduce((max, e) => e.speed > max ? e.speed : max, 0);
}

export const eventsStatistics = (events) => {
  var now = moment.utc();
  const todayEvents = events.filter((e) => moment.utc(e.evt_time).isSame(now, 'day'));
  const thisWeekEvents = events.filter((e) => moment.utc(e.evt_time).isoWeek() === now.isoWeek());

  return {
    today: {
      count: todayEvents.length,
      avgSpeed: eventsAvgSpeed(todayEvents),
      maxSpeed: eventsMaxSpeed(todayEvents),
    },
    thisWeek: {
      count: thisWeekEvents.length,
      avgSpeed: eventsAvgSpeed(thisWeekEvents),
      maxSpeed: eventsMaxSpeed(thisWeekEvents),
    },
    cumulative: {
      count: events.length,
      avgSpeed: eventsAvgSpeed(events),
      maxSpeed: eventsMaxSpeed(events),
    }
  };
}

export const checkEvent = (event, searchQuery) => {
  const evt_time = event.evt_time;
  const { filterMode, filterDate, filterTime, vehicleType } = searchQuery;

  var now = moment.utc();
  if (filterMode.toLowerCase() === 'today') {
    if (!moment.utc(evt_time).isSame(now, 'day')) {
      return false;
    }
  } else if (filterMode.toLowerCase() === 'this week') {
    if (moment(evt_time).isoWeek() !== now.isoWeek()) {
      return false;
    }
  } else if (filterMode.toLowerCase().includes('specific date')) {
    if (!moment.utc(evt_time).isSame(moment.utc(filterDate), 'day')) {
      return false;
    }
  } else if (filterMode.toLowerCase().includes('specific time')) {
    if (!moment.utc(evt_time).isSame(moment.utc(filterDate + ' ' + filterTime), 'minute')) {
      return false;
    }
  }
  if (vehicleType !== '') {
    if (event.vehicle_type !== vehicleType) {
      return false;
    }
  }
  if (Math.abs(event.speed) < searchQuery.speedThreshold) {
    return false;
  }
  return true;
}

export const filterEvents = (argEvents, searchQuery) => {
  let events = argEvents.filter((e) => checkEvent(e, searchQuery));
  events.sort((a, b) => searchQuery.sortMode.toLowerCase() === 'speed' ? (b.speed - a.speed) : moment.utc(b.evt_time).toDate().getTime() - moment.utc(a.evt_time).toDate().getTime());
  return events.map((e, id) => { return { ...e, id } });
}

export const getAllVehicleTypes = (events) => {
  if (events) {
    return events.reduce((vts, event) => vts.includes(event.vehicle_type) ? vts : [...vts, event.vehicle_type], []);
  }
  return [];
}