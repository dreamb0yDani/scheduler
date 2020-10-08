import React from "react";

import "./styles.scss";

import Header from "components/Appointment/Header"
import Empty from "components/Appointment/Empty"
import Show from "components/Appointment/Show"
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status"
import Confirm from "components/Appointment/Confirm"
import Error from "components/Appointment/Error"
import { useVisualMode } from "hooks/useVisualMode"


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING"
const CONFIRM = "CONFIRM"
const DELETING = "DELETING"
const EDIT = "EDIT"

const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING)
    const interview = {
      student: name,
      interviewer
    }
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true))
  }


  function cancel() {
    transition(DELETING)
    const interview = null
    props.cancelInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true))
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {
        mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      }

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {
        mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back} />
      }

      {
        mode === EDIT &&
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => transition(SHOW)} />
      }

      {
        mode === SAVING &&
        <Status message={SAVING} /> || mode === DELETING && <Status message={DELETING} />
      }

      {
        mode === CONFIRM &&
        <Confirm
          message={"Are you sure you want to Delete?"}
          onConfirm={cancel}
          onCancel={back} />
      }

      {mode === ERROR_SAVE && <Error message={"Error Saving"} onClose={back} /> || mode === ERROR_DELETE && <Error message={"Error Deleting"} onClose={back} />}
    </article>
  )
}