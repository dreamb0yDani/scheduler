import React from "react";
import PropTypes from "prop-types";

import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {

  const interviewersMap = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        {...interviewer}
        onChange={event => props.onChange(interviewer.id)}
        selected={props.value === interviewer.id}
      />
    )
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersMap}</ul>
    </section>
  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
