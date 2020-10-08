import React from "react";
import DayListItem from "components/DayListItem"

export default function DayList(props) {
  const dayList = props.days.map(day => {
    return <DayListItem
      key={day.id}
      {...day}
      selected={day.name === props.day}
      setDay={props.setDay}
    />
  })
  return (
    <ul>{dayList}</ul>
  )
}