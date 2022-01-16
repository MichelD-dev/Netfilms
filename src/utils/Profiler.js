import React from 'react'
import { clientAuth } from 'utils/clientApi'

function Profiler({ phases = [], appData, ...props }) {
  let data = []
  setInterval(() => {
    if (!data.length) return
    clientAuth('monitoring', { data })
    data = []
  }, 10000)

  const handleRender = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions
  ) => {
    if (!phases.length || phases.includes(phase)) {
      data.push({
        id,
        appData,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions,
      })
    }
  }

  return <React.Profiler onRender={handleRender} {...props} />
}
export { Profiler }
