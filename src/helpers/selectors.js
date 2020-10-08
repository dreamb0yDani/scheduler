export function getAppointmentsForDay(state, day) {

  if (!state.days.length || !state.days.find(e => day === e.name)) {
    return []
  }

  return state.days
    .filter(elem => elem.name === day)[0].appointments.map(ele => state.appointments[ele])
}

export function getInterview(state, interview) {

  if (!interview) return null;
  const newObj = { ...interview, interviewer: state.interviewers[interview.interviewer] }

  return newObj
}

export function getInterviewersForDay(state, day) {

  if (!state.days.length || !state.days.find(e => day === e.name)) {
    return []
  }

  return state.days
    .filter(elem => elem.name === day)[0].interviewers.map(ele => state.interviewers[ele])
}