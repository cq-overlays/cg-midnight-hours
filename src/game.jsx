import { useRef, useEffect, useState } from "preact/compat"
import { useReplicant } from "use-nodecg"
import anime from "animejs"
import render from "./_render.jsx"
import mhLogo from "./MH_Logo.svg"
import clockAsset from "./MH_ClockBackground-Asset.svg"

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

  return (
    <div
      className="flex flex-col gap-4 items-stretch text-theme-white"
      ref={ref}
    >
      <Block>
        <div
          className="flex flex-col gap-2 px-5 py-2 bg-cover bg-center"
          style={{ backgroundImage: `url(${clockAsset})` }}
        >
          <div className="flex gap-4 items-center">
            <div className="flex gap-4 items-center">
              <Score index={0} />
              <Color index={0} />
            </div>
            <Name index={0} />
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex gap-4 items-center">
              <Score index={1} />
              <Color index={1} />
            </div>
            <Name index={1} />
          </div>
        </div>
      </Block>
      <Block>
        <div className="flex gap-3 px-5 py-2 h-11 relative items-center text-2xl">
          <img src={mhLogo} className="h-full"></img>
          <FlavorText />
        </div>
      </Block>
    </div>
  )
}

const FlavorText = () => {
  const [replicant] = useReplicant("currentFlavorText", "Hello World", {
    namespace: "cq-overlay-controls",
  })
  const [state, setState] = useState(replicant)
  const ref = useRef(null)
  useEffect(() => {
    if (replicant !== state) {
      fadeText(ref.current, replicant, setState)
    }
  }, [replicant])

  return <div ref={ref}>{state}</div>
}

const Score = ({ index }) => {
  const [replicant] = useReplicant("currentScores", [0, 0], {
    namespace: "cq-overlay-controls",
  })
  const [state, setState] = useState(replicant[index])
  const ref = useRef(null)

  useEffect(() => {
    if (replicant[index] !== state) {
      fadeChange(ref.current, () => {
        setState(replicant[index])
      })
    }
  }, [replicant])

  return (
    <div className="text-4xl font-mono w-8 text-center" ref={ref}>
      {state}
    </div>
  )
}

const Color = ({ index }) => {
  const [replicant] = useReplicant("currentColors", ["#4eb3d3", "#4eb3d3"], {
    namespace: "cq-overlay-controls",
  })
  const ref = useRef(null)
  useEffect(() => {
    anime({
      targets: ref.current,
      easing: "easeInOutSine",
      duration: 300,
      backgroundColor: replicant[index],
    })
  }, [replicant])

  return (
    <div
      className="rounded-full h-6 w-6 border-2 border-theme-white/25"
      ref={ref}
    />
  )
}

const Name = ({ index }) => {
  const [replicant] = useReplicant("currentTeams", ["Team A", "Team B"], {
    namespace: "cq-overlay-controls",
  })
  const [state, setState] = useState(replicant[index].name)
  const ref = useRef(null)
  useEffect(() => {
    if (replicant[index].name !== state) {
      fadeText(ref.current, replicant[index].name, setState)
    }
  }, [replicant])
  return (
    <div className="text-3xl">
      <div ref={ref}>{state}</div>
    </div>
  )
}

const Block = ({ children, ref }) => (
  <div ref={ref} className="grid">
    <div className="bg-theme-space col-start-1 row-start-1 rounded-xl z-10 shadow-sm shadow-theme-night/50 overflow-hidden">
      {children}
    </div>
    <div className="bg-theme-blue col-start-1 row-start-1 rounded-xl -translate-x-1.5 translate-y-1.5" />
  </div>
)

const fadeChange = (ref, onChange) => {
  anime({
    targets: ref,
    easing: "easeInOutSine",
    opacity: 0,
    duration: 300,
    complete: () => {
      onChange()
      anime({
        targets: ref,
        easing: "easeInOutSine",
        opacity: 1,
        duration: 300,
      })
    },
  })
}

const fadeText = (ref, newState, setState) => {
  const tl = anime.timeline({
    targets: ref,
    duration: 500,
    easing: "easeInOutSine",
  })
  tl.add({
    opacity: 0,
    duration: 300,
    complete: () => {
      setState("\xa0")
    },
  })
  tl.add({
    minWidth: `${measureText(newState, ref)}px`,
    complete: () => {
      setState(newState)
    },
  })
  tl.add({
    duration: 300,
    opacity: 1,
  })
}

const measureText = (text, element) => {
  const measurer = document.createElement("div")

  measurer.style.position = "absolute"
  measurer.style.top = "1100px"
  measurer.style.opacity = "0"
  measurer.style.zIndex = "-99999"
  measurer.style.padding = 0
  measurer.classList = element.classList
  measurer.innerText = text
  element.appendChild(measurer)
  let width = measurer.getBoundingClientRect().width
  measurer.parentNode.removeChild(measurer)
  return width
}

function App() {
  const [currentGameScreen] = useReplicant(
    "currentGameScreen",
    {},
    { namespace: "cq-overlay-controls" }
  )
  return (
    <div className="p-5 flex flex-col gap-5 items-start">
      <Scoreboard showScores={currentGameScreen.showScores} />
    </div>
  )
}

render(App)
