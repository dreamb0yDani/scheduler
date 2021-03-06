import { useState, useEffect } from "react"
import axios from "axios";

export function useApplicationData() {

  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // appointments: {},
    interviewers: {},
  });


  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then(all => {
        setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }))
      })
  }
    , [])

  function updateSpots(days, interview, id) {

    // console.log(state.appointments[id][interview], state.day)
    const recentDay = days.find(day => day.name === state.day)

    interview ?
      recentDay.spots -= 1 :
      recentDay.spots += 1;
    return state.days
  }


  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    const updatedSpotsStatus = state.appointments[id].interview ? [...state.days] : updateSpots([...state.days], interview, id);

    return axios.
      put(`/api/appointments/${id}`, { interview })
      .then(() => setState({
        ...state,
        appointments,
        updatedSpotsStatus
      })
      )
      .then(() => {
        Promise.all([
          axios.get('/api/days'),
          axios.get('/api/appointments'),
          axios.get('/api/interviewers')
        ])
          .then(all => {
            setState(prev => ({
              ...prev,
              days: all[0].data,
              appointments: all[1].data,
              interviewers: all[2].data
            }))
          })
      })
      .catch(err => err.status(500).json({}))
  }

  function cancelInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    const updatedSpotsStatus = updateSpots([...state.days], interview, id);

    return axios.
      delete(`/api/appointments/${id}`, { interview })
      .then(() => setState({
        ...state,
        appointments,
        updatedSpotsStatus
      })
      )
  }

  return { state, setDay, bookInterview, cancelInterview }
}