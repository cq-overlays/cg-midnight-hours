import { useState, useRef, useEffect, forwardRef } from "preact/compat"
import { useReplicant } from "use-nodecg"
import anime from "animejs"
import render from "./_render.jsx"
import logo from "./MH_Logo-wText.svg"
import icon from "./MH_Logo.svg"
import discord from "./MH_Discord.svg"
import bg from "./backgroundglare.png"
import clock from "./MH_ClockBackground-Asset.svg"
import stages from "./stages"

function App() {
  const [changed, setChanged] = useState(0)
  console.log(changed)
  return (
    <div className="flex flex-col bg-theme-space items-center h-screen relative">
      <img
        src={clock}
        className="max-h-[1100px] absolute -bottom-[400px] -left-[400px] overflow-hidden"
      />
      <img
        src={clock}
        className="max-h-[1200px] absolute -top-[400px] -right-[400px] overflow-hidden"
      />
      <BrbScreen changed={changed} setChanged={setChanged} />
      <TeamScreen changed={changed} setChanged={setChanged} />
      <MaplistScreen changed={changed} setChanged={setChanged} />
    </div>
  )
}

const BrbScreen = ({ changed, setChanged }) => {
  const [replicant] = useReplicant("currentBreakScreen", "brb", {
    namespace: "cq-overlay-controls",
  })
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  const ref4 = useRef(null)
  const [onScreen, setOnScreen] = useState()
  const targets = [ref1.current, ref2.current, ref3.current, ref4.current]
  useEffect(() => {
    if (targets.includes(null)) {
      return
    }
    if (replicant !== "brb") {
      anime({
        targets: targets,
        easing: "easeInOutCirc",
        opacity: 0,
        translateX: 150,
        duration: 400,
        delay: anime.stagger(50),
        complete: () => {
          setOnScreen(false)
          setChanged(changed + 1)
        },
      })
    }
  }, [replicant])

  useEffect(() => {
    if (targets.includes(null)) {
      return
    }
    if (replicant === "brb") {
      setOnScreen(true)
      anime({
        targets: targets,
        easing: "easeInOutCirc",
        opacity: 1,
        keyframes: [
          { translateX: -150, duration: 0 },
          { translateX: 0, duration: 400 },
        ],
        duration: 400,
        delay: anime.stagger(50, { start: 100 }),
      })
    }
  }, [changed])

  console.log(onScreen)

  const classlist = onScreen ? "flex flex-col items-center" : "hidden"

  return (
    <div className={classlist}>
      <img ref={ref1} src={logo} className="z-10 w-[1300px]"></img>
      <div className="z-10 flex flex-col gap-12 items-center">
        <Pill ref={ref2}>
          <FlavorText className="text-8xl py-8 px-16 font-medium" />
        </Pill>
        <Pill ref={ref3}>
          <UpNext />
        </Pill>
        <Pill ref={ref4}>
          <div className="text-4xl py-4 px-8 flex gap-4 items-center">
            <div className="w-9">
              <img src={discord} className="h-full"></img>
            </div>
            <span>discord.io/MidnightHoursSpl</span>
          </div>
        </Pill>
      </div>
    </div>
  )
}

const TeamScreen = ({ changed, setChanged }) => {
  const [replicant] = useReplicant("currentBreakScreen", "rosters", {
    namespace: "cq-overlay-controls",
  })
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  const [onScreen, setOnScreen] = useState()
  const targets = [ref1.current, ref2.current, ref3.current]
  useEffect(() => {
    if (targets.includes(null)) {
      return
    }
    if (replicant !== "rosters") {
      anime({
        targets: targets,
        easing: "easeInOutCirc",
        opacity: 0,
        translateX: 150,
        duration: 400,
        delay: anime.stagger(50),
        complete: () => {
          setOnScreen(false)
          setChanged(changed + 1)
        },
      })
    }
  }, [replicant])

  useEffect(() => {
    if (targets.includes(null)) {
      return
    }
    if (replicant === "rosters") {
      setOnScreen(true)
      anime({
        targets: targets,
        easing: "easeInOutCirc",
        opacity: 1,
        keyframes: [
          { translateX: -150, duration: 0 },
          { translateX: 0, duration: 400 },
        ],
        duration: 400,
        delay: anime.stagger(50),
      })
    }
  }, [changed])

  const classlist = onScreen
    ? "py-12 px-40 flex flex-col gap-20 w-screen items-center h-full"
    : "hidden"

  return (
    <div className={classlist}>
      <div ref={ref1} className="w-full">
        <Pill>
          <div className="flex items-center px-16 gap-16">
            <img src={icon} className="w-32"></img>
            <FlavorText className="text-8xl text-center w-full" />
            <div className="w-32" />
          </div>
        </Pill>
      </div>
      <div className="flex gap-20 h-full mb-20">
        <div ref={ref2} className="grid w-[600px]">
          <div
            className="text-theme-space col-start-1 row-start-1 rounded-[4rem] z-10 bg-cover bg-center"
            style={{ backgroundImage: `url(${bg})` }}
          >
            <TeamName index={0}></TeamName>
            <div className="rounded-full bg-theme-blue mx-9 h-3" />
            <TeamRoster index={0}></TeamRoster>
          </div>
          <div className="bg-theme-blue col-start-1 row-start-1 rounded-[4rem] -translate-x-3 translate-y-3" />
        </div>
        <div ref={ref3} className="grid w-[600px]">
          <div
            className="text-theme-space col-start-1 row-start-1 rounded-[4rem] z-10 bg-cover bg-center"
            style={{ backgroundImage: `url(${bg})` }}
          >
            <TeamName index={1}></TeamName>
            <div className="rounded-full bg-theme-blue mx-9 h-3" />
            <TeamRoster index={1}></TeamRoster>
          </div>
          <div className="bg-theme-blue col-start-1 row-start-1 rounded-[4rem] -translate-x-3 translate-y-3" />
        </div>
      </div>
    </div>
  )
}

const MaplistScreen = ({ changed, setChanged }) => {
  const [replicant] = useReplicant("currentBreakScreen", "maplist", {
    namespace: "cq-overlay-controls",
  })

  const ref = useRef()
  const [onScreen, setOnScreen] = useState()

  useEffect(() => {
    if (!ref?.current) {
      return
    }
    if (replicant === "maplist") {
      setOnScreen(true)
      anime({
        targets: [ref.current, ".map"],
        easing: "easeInOutCirc",
        opacity: 1,
        keyframes: [
          { translateX: -150, duration: 0 },
          { translateX: 0, duration: 400 },
        ],
        duration: 400,
        delay: anime.stagger(50),
      })
    }
  }, [changed])

  const classlist = onScreen
    ? "py-12 px-40 flex flex-col gap-20 w-screen h-screen items-center"
    : "hidden"

  const [roundReplicant] = useReplicant(
    "currentRound",
    {
      name: "Test Round",
      value: [],
    },
    { namespace: "cq-overlay-controls" }
  )
  const [winnersReplicant] = useReplicant("currentMapWinners", [], {
    namespace: "cq-overlay-controls",
  })

  useEffect(() => {
    console.log("currentMapWinners", winnersReplicant)
  }, [winnersReplicant])

  const [maps, setMaps] = useState([])

  useEffect(() => {
    if (roundReplicant?.value !== maps) {
      setMaps(roundReplicant.value)
    }
  }, [roundReplicant])

  useEffect(() => {
    if (!ref?.current) {
      return
    }
    if (replicant !== "maplist") {
      anime({
        targets: [ref.current, ".map"],
        easing: "easeInOutCirc",
        opacity: 0,
        translateX: 150,
        duration: 400,
        delay: anime.stagger(50),
        complete: () => {
          setOnScreen(false)
          setChanged(changed + 1)
        },
      })
    }
  }, [replicant])

  const [prevReplicant, setPrevReplicant] = useState()
  useEffect(() => {
    if (!ref?.current) {
      return
    }
    if (replicant !== prevReplicant && replicant !== "maplist") {
      setPrevReplicant(replicant)
      anime({
        targets: [ref.current, ".map"],
        easing: "easeInOutCirc",
        opacity: 0,
        translateX: 150,
        duration: 400,
        delay: anime.stagger(50),
        complete: () => {
          setOnScreen(false)
          setChanged(changed + 1)
        },
      })
    }
  }, [maps])

  return (
    <div className={classlist}>
      <div ref={ref} className="w-full">
        <Pill>
          <div className="flex items-center px-16 gap-16">
            <img src={icon} className="w-32"></img>
            <FlavorText className="text-8xl text-center w-full" />
            <div className="w-32" />
          </div>
        </Pill>
      </div>
      <div className="flex gap-16 h-full w-full justify-center">
        {roundReplicant.value.map((round, index) => (
          <Map
            key={index}
            mode={round.mode}
            mapName={round.map}
            winner={winnersReplicant?.[index]}
          />
        ))}
      </div>
    </div>
  )
}

const Map = forwardRef(({ mode, mapName, winner = null }, ref) => {
  return (
    <div className="grid max-w-[14rem] pb-3 map flex-1" ref={ref}>
      <div className="text-theme-space col-start-1 row-start-1 rounded-[4rem] z-10 overflow-hidden relative">
        <div
          className={`absolute h-full w-full bg-center bg-cover ${
            winner !== null && "grayscale-[0.25] brightness-50"
          }`}
          style={{ backgroundImage: `url('${stages[mapName]}')` }}
        >
          <div className="h-full w-full bg-gradient-to-t from-theme-night to-transparent" />
        </div>
        {winner === null ? (
          <>
            <div className="absolute h-full w-full">
              <div className="flex flex-col pb-16 items-center text-center justify-end h-full text-theme-white">
                <div className="text-3xl">{mode}</div>
                <div className="text-2xl">{mapName}</div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="absolute h-full w-full">
              <div className="flex flex-col pb-16 items-center text-center justify-between h-full text-theme-white">
                <div />
                <div>
                  <div className="text-4xl font-medium">{winner}</div>
                </div>
                <div>
                  <div className="text-3xl grayscale-[0.25] brightness-50">
                    {mode}
                  </div>
                  <div className="text-2xl grayscale-[0.25] brightness-50">
                    {mapName}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="bg-theme-blue col-start-1 row-start-1 rounded-[4rem] -translate-x-3 translate-y-3" />
    </div>
  )
})

const FlavorText = ({ className }) => {
  const [replicant] = useReplicant("currentFlavorText", "Hello World", {
    namespace: "cq-overlay-controls",
  })
  const [state, setState] = useState()
  const ref = useRef(null)
  useEffect(() => {
    if (replicant !== state) {
      console.log("FADE FLAVOR TEXT", ref.current, replicant)
      subtleFade(ref.current, replicant, setState)
    }
  }, [replicant])

  return (
    <div className={className}>
      <div ref={ref}>{state}</div>
    </div>
  )
}

const UpNext = () => {
  const [replicant] = useReplicant(
    "currentRound",
    { name: "No Round" },
    {
      namespace: "cq-overlay-controls",
    }
  )
  const [state, setState] = useState()
  const ref = useRef(null)
  useEffect(() => {
    console.log("upnext", replicant.name, state)
    if (`Up Next: ${replicant.name}` !== state) {
      subtleFade(ref.current, `Up Next: ${replicant.name}`, setState)
    }
  }, [replicant])
  return (
    <div className="text-6xl py-6 px-12">
      <div ref={ref}>{state}</div>
    </div>
  )
}

const TeamName = ({ index }) => {
  const [replicant] = useReplicant(
    "currentTeams",
    [
      {
        name: "Team A",
        roster: ["Player A1", "Player A2", "Player A3", "Player A4"],
      },
      {
        name: "Team B",
        roster: ["Player B1", "Player B2", "Player B3", "Player B4"],
      },
    ],
    { namespace: "cq-overlay-controls" }
  )
  const [state, setState] = useState(replicant[index].name)
  const ref = useRef(null)
  useEffect(() => {
    if (replicant[index].name !== state) {
      subtleFade(ref.current, replicant[index].name, setState)
    }
  }, [replicant])
  return (
    <div className="text-5xl py-6 px-8 font-medium text-center">
      <div ref={ref}>{state}</div>
    </div>
  )
}

const TeamRoster = ({ index }) => {
  const [replicant] = useReplicant(
    "currentTeams",
    [
      {
        name: "Team A",
        roster: ["Player A1", "Player A2", "Player A3", "Player A4"],
      },
      {
        name: "Team B",
        roster: ["Player B1", "Player B2", "Player B3", "Player B4"],
      },
    ],
    { namespace: "cq-overlay-controls" }
  )
  const [state, setState] = useState()
  const ref = useRef(null)
  useEffect(() => {
    if (replicant[index].roster !== state) {
      setState(replicant[index].roster)
    }
  }, [replicant])
  return (
    <div className="text-5xl p-14 flex flex-col gap-6" ref={ref}>
      {(state ? state : []).map((player, index) => (
        <div key={index}>{player}</div>
      ))}
    </div>
  )
}

const Pill = forwardRef((props, ref) => (
  <div className="grid" ref={ref}>
    <div
      className="text-theme-space col-start-1 row-start-1 rounded-full z-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {props.children}
    </div>
    <div className="bg-theme-blue col-start-1 row-start-1 rounded-full -translate-x-3 translate-y-3" />
  </div>
))

const subtleFade = (ref, newState, setState) => {
  const tl = anime.timeline({
    targets: ref,
    duration: 600,
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
  return getTextWidth(text, getCanvasFontSize(element))
}

function getTextWidth(text, font) {
  // re-use canvas object for better performance
  const canvas =
    getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement("canvas"))
  const context = canvas.getContext("2d")
  context.font = font
  const metrics = context.measureText(text)
  return metrics.width
}

function getCssStyle(element, prop) {
  return window.getComputedStyle(element, null).getPropertyValue(prop)
}

function getCanvasFontSize(el = document.body) {
  const fontWeight = getCssStyle(el, "font-weight") || "normal"
  const fontSize = getCssStyle(el, "font-size") || "16px"
  const fontFamily = getCssStyle(el, "font-family") || "Times New Roman"

  return `${fontWeight} ${fontSize} ${fontFamily}`
}

render(App)
