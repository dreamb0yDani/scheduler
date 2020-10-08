import { useState, useEffect } from "react"
import axios from "axios";

export function useApplicationData() {
  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    spots: 5
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

  function newDays(days, interview) {
    const currentDay = days.find(singleDay => singleDay.name === state.day)
    //check if the appointment in question has interview === null
    interview ?

      currentDay.spots -= 1 :
      currentDay.spots += 1;
    return days
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

    const newDaysState = newDays([...state.days], interview);

    return axios.
      put(`/api/appointments/${id}`, { interview })
      .then(() => setState({
        ...state,
        appointments,
        newDaysState
      })
      )
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

    const newDaysState = newDays([...state.days], interview);

    return axios.
      delete(`/api/appointments/${id}`, { interview })
      .then(() => setState({
        ...state,
        appointments,
        newDaysState
      })
      )
  }

  return { state, setDay, bookInterview, cancelInterview }
}