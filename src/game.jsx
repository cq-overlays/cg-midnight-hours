import React, { useRef, useEffect, useState } from "react"
import { useReplicant } from "use-nodecg"
import anime from "animejs"
import render from "./_render.jsx"

const Scoreboard = ({ showScores }) => {
  const ref = useRef(null)

  useEffect(() => {
    showScores
      ? anime({
          targets: ref.current,
          easing: "easeInOutExpo",
          opacity: 1,
          scale: 1,
          duration: 400,
        })
      : anime({
          targets: ref.current,
          easing: "easeInOutExpo",
          opacity: 0,
          scale: 0.9,
          duration: 400,
        })
  }, [showScores])

  const [currentTeams] = useReplicant("currentTeams", ["Team A", "Team B"], {
    namespace: "cq-overlay-controls",
  })
  const teamRefs = [useRef(null), useRef(null)]
  const [teamNames, setTeamNames] = useState([
    currentTeams[0].name,
    currentTeams[1].name,
  ])
  useEffect(() => {
    currentTeams.forEach((value, i) => {
      if (value.name !== teamNames[i]) {
        fadeChange(teamRefs[i].current, () => {
          setTeamNames([currentTeams[0].name, currentTeams[1].name])
        })
      }
    })
  }, [currentTeams])

  const [currentColors] = useReplicant(
    "currentColors",
    ["#4eb3d3", "#4eb3d3"],
    {
      namespace: "cq-overlay-controls",
    }
  )
  const colorRefs = [useRef(null), useRef(null)]
  useEffect(() => {
    currentColors.forEach((value, i) => {
      anime({
        targets: colorRefs[i].current,
        easing: "easeInOutSine",
        duration: 400,
        backgroundColor: value,
      })
    })
  }, [currentColors])

  return (
    <div ref={ref} className="flex flex-col rounded-lg overflow-hidden">
      <div className="flex flex-col items-stretch">
        <div className="bg-slate-700 pl-4 py-1 font-bold text-white text-lg">
          Scoreboard
        </div>
        <div className="flex items-stretch">
          <div className="flex flex-col p-4 gap-4 bg-slate-200">
            <div className="flex gap-4 items-center">
              <div ref={colorRefs[0]} className="rounded-md h-8 w-8" />
              <div
                ref={teamRefs[0]}
                className="text-2xl font-semibold leading-none"
              >
                {teamNames[0]}
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div ref={colorRefs[1]} className="rounded-md h-8 w-8" />
              <div
                ref={teamRefs[1]}
                className="text-2xl font-semibold leading-none"
              >
                {teamNames[1]}
              </div>
            </div>
          </div>
          <Scores />
        </div>
      </div>
    </div>
  )
}

const fadeChange = (ref, onChange) => {
  anime({
    targets: ref,
    easing: "easeInOutSine",
    opacity: 0,
    duration: 200,
    complete: () => {
      onChange()
      anime({
        targets: ref,
        easing: "easeInOutSine",
        opacity: 1,
        duration: 200,
      })
    },
  })
}

const Scores = () => {
  const [currentScores] = useReplicant("currentScores", [0, 0], {
    namespace: "cq-overlay-controls",
  })
  const [scores, setScores] = useState(currentScores)
  const scoreRefs = [useRef(null), useRef(null)]

  useEffect(() => {
    currentScores.forEach((value, i) => {
      if (value !== scores[i]) {
        fadeChange(scoreRefs[i].current, () => {
          setScores(Object.assign([], currentScores))
        })
      }
    })
  }, [currentScores])

  return (
    <div className="flex flex-col py-4 px-2 gap-4 bg-indigo-400">
      <div
        ref={scoreRefs[0]}
        className="h-8 w-8 flex items-center justify-center text-3xl text-white font-mono"
      >
        {scores[0]}
      </div>
      <div
        ref={scoreRefs[1]}
        className="h-8 w-8 flex items-center justify-center text-3xl text-white font-mono"
      >
        {scores[1]}
      </div>
    </div>
  )
}

const Commentators = ({ currentGameScreen }) => {
  const ref = useRef(null)

  useEffect(() => {
    currentGameScreen.showScores && currentGameScreen.showCommentators
      ? anime({
          targets: ref.current,
          easing: "easeInOutExpo",
          opacity: 1,
          scale: 1,
          duration: 400,
          delay: 100,
        })
      : anime({
          targets: ref.current,
          easing: "easeInOutExpo",
          opacity: 0,
          scale: 0.9,
          duration: 400,
          delay: 100,
        })
  }, [currentGameScreen])

  return (
    <div ref={ref} className="flex flex-col rounded-lg overflow-hidden">
      <div className="flex flex-col items-stretch">
        <div className="bg-slate-700 pl-4 py-1 font-bold text-white text-lg">
          Commentators
        </div>
        <div className="flex items-stretch">
          <div className="flex flex-col p-4 gap-4 bg-slate-200">
            <div className="text-2xl font-semibold flex items-center">
              Chaedr
              <div className="bg-slate-700 text-xl text-slate-300 rounded-lg mx-2 px-2 py-0.5">
                they/them
              </div>
            </div>
            <div className="text-2xl font-semibold flex items-center">
              Quark
              <div className="bg-slate-700 text-xl text-slate-300 rounded-lg mx-2 px-2 py-0.5">
                they/them
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [currentGameScreen] = useReplicant(
    "currentGameScreen",
    {},
    { namespace: "cq-overlay-controls" }
  )
  return (
    <div className="p-8 flex flex-col gap-8 items-start">
      <Scoreboard showScores={currentGameScreen.showScores} />
      <Commentators currentGameScreen={currentGameScreen} />
    </div>
  )
}

render(App)
