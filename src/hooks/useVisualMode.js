import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (forwardMode, replace = false) => {
    setMode(forwardMode)

    replace ?
      setHistory(prev => [...prev.slice(0, prev.length - 1), forwardMode]) :
      setHistory(prev => [...prev, forwardMode])
  }

  // function transition(currentMode, replace = false) {
  //   setMode(currentMode);
  //   if (replace) {
  //     history[history.length - 1] = currentMode;
  //   } else {
  //     history.push(currentMode)
  //   }
  //   setHistory([...history]);
  //   console.log(history, currentMode)
  // }

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
