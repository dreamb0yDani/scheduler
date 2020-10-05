import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // const transition = (forwardMode, replace = false) => {
  //   setMode(forwardMode)
  //   const forwardHistory = [...history];
  //   const len = forwardHistory.length - 1;

  //   replace ?
  //     setHistory(prev => [...prev, forwardHistory[len] = forwardMode]) :
  //     setHistory(prev => [...prev, forwardMode])
  // }

  function transition(currentMode, replace = false) {
    setMode(currentMode);
    if (replace) {
      history[history.length - 1] = currentMode;
    } else {
      history.push(currentMode)
    }
    setHistory([...history]);
  }

  const back = () => {
    const backHistory = [...history]

    if (backHistory.length >= 1) {
      backHistory.pop()
      setHistory([...backHistory])
      setMode(backHistory[backHistory.length - 1])
    }

    if (backHistory.length === 0) {
      setMode(initial)
    }
  }
  return { mode, transition, back }
}
