import { motion } from 'framer-motion'
import {
  BriefcaseBusiness,
  Coffee,
  Code2,
  FlaskConical,
  Gamepad2,
  Handshake,
  type LucideIcon,
  Trophy,
} from 'lucide-react'
import { districts } from '../../data/districts'
import type { District } from '../../types/city'

type CitySceneProps = {
  activeDistrict: District
  onSelect: (district: District) => void
}

type CampusSpot = {
  x: number
  y: number
  width: number
  height: number
  accent: string
  icon: LucideIcon
  tone: 'purple' | 'blue' | 'green' | 'gold'
}

const campusSpots: Record<string, CampusSpot> = {
  'hackathon-hub': {
    x: 13,
    y: 54,
    width: 15.8,
    height: 33,
    accent: '#7c55d9',
    icon: Trophy,
    tone: 'purple',
  },
  'research-lab': {
    x: 30.8,
    y: 56,
    width: 14.2,
    height: 28,
    accent: '#2f8fc7',
    icon: FlaskConical,
    tone: 'blue',
  },
  'startup-cafe': {
    x: 50,
    y: 54,
    width: 19,
    height: 29,
    accent: '#c98424',
    icon: Coffee,
    tone: 'gold',
  },
  'freelance-market': {
    x: 69.3,
    y: 56,
    width: 14.5,
    height: 28,
    accent: '#4f8f3a',
    icon: Handshake,
    tone: 'green',
  },
  'open-source-arena': {
    x: 87,
    y: 54,
    width: 15.8,
    height: 33,
    accent: '#2f8fc7',
    icon: Code2,
    tone: 'blue',
  },
  'internship-tower': {
    x: 50,
    y: 23,
    width: 8.6,
    height: 28,
    accent: '#66845c',
    icon: BriefcaseBusiness,
    tone: 'green',
  },
  'chill-zone': {
    x: 50,
    y: 78,
    width: 12,
    height: 12,
    accent: '#7ba95b',
    icon: Gamepad2,
    tone: 'green',
  },
}

const toneStyles = {
  purple: {
    awning: '#8b64d8',
    interior: '#dacbf6',
    counter: '#5b3e9e',
  },
  blue: {
    awning: '#4b9fd0',
    interior: '#bfe5ea',
    counter: '#326c83',
  },
  green: {
    awning: '#6aa856',
    interior: '#cfe6bf',
    counter: '#416f42',
  },
  gold: {
    awning: '#d3a64e',
    interior: '#eed6a5',
    counter: '#876329',
  },
}

function Backdrop() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 900" aria-hidden="true">
      <rect width="1600" height="900" fill="#dff3ff" />
      <path
        d="M0 315 C180 276 310 298 462 266 C641 227 790 196 960 252 C1138 311 1325 281 1600 304 L1600 900 L0 900 Z"
        fill="#c8e6b4"
        stroke="#1d2b22"
        strokeWidth="4"
      />
      <path
        d="M0 401 C218 335 368 364 542 323 C706 286 828 274 976 320 C1144 371 1315 348 1600 382 L1600 900 L0 900 Z"
        fill="#94c976"
        stroke="#1d2b22"
        strokeWidth="4"
      />
      <path
        d="M595 900 L700 492 L900 492 L1005 900 Z"
        fill="#f1ece4"
        stroke="#1d2b22"
        strokeWidth="4"
      />
      <path
        d="M508 900 L650 586 L706 574 L610 900 Z"
        fill="#ece4d8"
        stroke="#1d2b22"
        strokeWidth="4"
      />
      <path
        d="M1092 900 L950 586 L894 574 L990 900 Z"
        fill="#ece4d8"
        stroke="#1d2b22"
        strokeWidth="4"
      />
      {Array.from({ length: 9 }, (_, index) => (
        <path
          key={index}
          d={`M${666 - index * 18} ${560 + index * 38} L${934 + index * 18} ${560 + index * 38}`}
          stroke="#d7cec3"
          strokeWidth="3"
        />
      ))}
      <path
        d="M142 742 C260 701 366 715 470 756"
        stroke="#518f3f"
        strokeWidth="76"
        strokeLinecap="round"
      />
      <path
        d="M1130 756 C1240 716 1360 706 1470 742"
        stroke="#518f3f"
        strokeWidth="76"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Cloud({ className }: { className: string }) {
  return (
    <div className={`absolute ${className}`}>
      <div className="relative h-12 w-40">
        <span className="absolute bottom-0 left-0 h-8 w-18 rounded-full border-[3px] border-[#1d2b22] bg-white" />
        <span className="absolute bottom-1 left-9 h-12 w-22 rounded-full border-[3px] border-[#1d2b22] bg-white" />
        <span className="absolute right-0 bottom-0 h-8 w-20 rounded-full border-[3px] border-[#1d2b22] bg-white" />
        <span className="absolute right-2 bottom-0 left-2 h-7 border-b-[3px] border-[#1d2b22] bg-white" />
      </div>
    </div>
  )
}

function Tree({ className, small = false }: { className: string; small?: boolean }) {
  return (
    <div className={`absolute ${className}`} style={{ width: small ? '4.3%' : '5.5%' }}>
      <div className="relative aspect-square">
        <span className="absolute bottom-0 left-1/2 h-[46%] w-[12%] -translate-x-1/2 rounded-full border-[3px] border-[#1d2b22] bg-[#7c542f]" />
        <span className="absolute top-[18%] left-[10%] h-[52%] w-[58%] rounded-full border-[3px] border-[#1d2b22] bg-[#82b95d]" />
        <span className="absolute top-[2%] left-[32%] h-[58%] w-[55%] rounded-full border-[3px] border-[#1d2b22] bg-[#6aa44a]" />
        <span className="absolute top-[34%] left-[43%] h-[48%] w-[52%] rounded-full border-[3px] border-[#1d2b22] bg-[#4f8f3a]" />
      </div>
    </div>
  )
}

function Bush({ className }: { className: string }) {
  return (
    <div className={`absolute ${className}`}>
      <div className="relative h-20 w-52">
        {Array.from({ length: 7 }, (_, index) => (
          <span
            key={index}
            className="absolute bottom-0 rounded-full border-[3px] border-[#1d2b22] bg-[#5d9c42]"
            style={{
              left: `${index * 14}%`,
              height: `${42 + (index % 3) * 15}px`,
              width: `${54 + (index % 2) * 12}px`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

function FlowerBed({ className }: { className: string }) {
  return (
    <div
      className={`absolute rounded-[1.4rem] border-[3px] border-[#1d2b22] bg-[#f2eadc] p-2 shadow-[0_16px_24px_rgba(28,47,24,0.14)] ${className}`}
    >
      <div className="flex h-full items-center justify-around rounded-[1rem] border-2 border-[#1d2b22] bg-[#76af53] px-3">
        {Array.from({ length: 9 }, (_, index) => (
          <span
            key={index}
            className={`h-3 w-3 rounded-full border border-[#1d2b22] ${
              index % 3 === 0 ? 'bg-white' : index % 3 === 1 ? 'bg-[#f6ee9b]' : 'bg-[#ffd1d1]'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function Bench({ className, flip = false }: { className: string; flip?: boolean }) {
  return (
    <div className={`absolute ${className}`} style={{ transform: flip ? 'scaleX(-1)' : undefined }}>
      <div className="relative h-20 w-40">
        <span className="absolute top-5 left-1 h-4 w-36 rounded border-[3px] border-[#1d2b22] bg-[#b98234]" />
        <span className="absolute top-12 left-0 h-5 w-40 rounded border-[3px] border-[#1d2b22] bg-[#c89442]" />
        <span className="absolute bottom-0 left-5 h-9 w-2 rounded bg-[#1d2b22]" />
        <span className="absolute right-5 bottom-0 h-9 w-2 rounded bg-[#1d2b22]" />
      </div>
    </div>
  )
}

function Lamp({ className }: { className: string }) {
  return (
    <div className={`absolute ${className}`}>
      <div className="relative h-24 w-10">
        <span className="absolute bottom-0 left-1/2 h-16 w-2 -translate-x-1/2 rounded-full border border-[#1d2b22] bg-[#263238]" />
        <span className="absolute top-1 left-1/2 h-8 w-8 -translate-x-1/2 rounded-t-xl border-[3px] border-[#1d2b22] bg-[#fff2b2]" />
        <span className="absolute top-8 left-2 h-2 w-6 rounded bg-[#1d2b22]" />
      </div>
    </div>
  )
}

function Vines({ dense = false }: { dense?: boolean }) {
  return (
    <>
      {Array.from({ length: dense ? 8 : 4 }, (_, index) => (
        <span
          key={index}
          className="absolute top-2 w-2 rounded-full bg-[#3b7a32]"
          style={{
            left: `${8 + index * (dense ? 11 : 24)}%`,
            height: `${dense ? 28 + (index % 3) * 16 : 34 + (index % 2) * 20}%`,
          }}
        >
          <span className="absolute top-[45%] -left-2 h-3 w-4 rounded-full bg-[#6aa44a]" />
          <span className="absolute top-[70%] left-0 h-3 w-4 rounded-full bg-[#6aa44a]" />
        </span>
      ))}
    </>
  )
}

function Interior({ tone, large = false }: { tone: CampusSpot['tone']; large?: boolean }) {
  const style = toneStyles[tone]

  return (
    <div className="absolute inset-x-[9%] top-[42%] bottom-[10%] rounded-b-xl border-x-[3px] border-b-[3px] border-[#1d2b22] bg-[#d8c49e] p-[5%]">
      <div className="grid h-full grid-cols-2 gap-[5%]">
        <span className="rounded-md border-[3px] border-[#1d2b22] bg-[#9fd0d4]" />
        <span className="rounded-md border-[3px] border-[#1d2b22] bg-[#9fd0d4]" />
        <span
          className="col-span-2 rounded-md border-[3px] border-[#1d2b22]"
          style={{ backgroundColor: style.counter }}
        >
          <span className="mt-[6%] ml-[8%] block h-[18%] w-[28%] rounded bg-[#eef6e7]" />
          <span className="mt-[5%] ml-[8%] block h-[10%] w-[48%] rounded bg-[#b9d98e]" />
        </span>
        {large && (
          <>
            <span className="absolute right-[14%] bottom-[18%] h-[18%] w-[10%] rounded-t-lg border-[3px] border-[#1d2b22] bg-[#7fb657]" />
            <span className="absolute right-[11%] bottom-[14%] h-[5%] w-[16%] rounded-full border-2 border-[#1d2b22] bg-[#4f8f3a]" />
          </>
        )}
      </div>
    </div>
  )
}

function DistrictBuilding({
  active,
  district,
  onSelect,
  spot,
}: {
  active: boolean
  district: District
  onSelect: (district: District) => void
  spot: CampusSpot
}) {
  const Icon = spot.icon
  const style = toneStyles[spot.tone]
  const sideSkew = spot.x < 24 ? '-skew-y-2' : spot.x > 76 ? 'skew-y-2' : ''

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(district)}
      whileHover={{ y: -4 }}
      className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 text-left outline-none ${sideSkew}`}
      style={{
        left: `${spot.x}%`,
        top: `${spot.y}%`,
        width: `${spot.width}%`,
        height: `${spot.height}%`,
      }}
    >
      <span className="absolute right-[8%] bottom-[-7%] left-[8%] h-6 rounded-full bg-[#1e351d]/16 blur-[1px]" />
      <span
        className={`relative block h-full w-full overflow-hidden rounded-t-[2.1rem] border-[3px] border-[#1d2b22] bg-[#f8eedf] shadow-[0_16px_24px_rgba(35,52,29,0.16)] transition ${
          active ? 'ring-8 ring-[#72a956]/30' : ''
        }`}
      >
        <span className="absolute inset-x-0 top-0 h-[9%] bg-[#2f6b3b]" />
        <Vines dense={district.id === 'startup-cafe'} />
        <span className="absolute top-[13%] left-[8%] flex max-w-[84%] items-center gap-2 text-[clamp(0.54rem,1vw,1.12rem)] font-black text-[#111827]">
          <span className="flex aspect-square w-[16%] min-w-7 items-center justify-center rounded-lg border-[3px] border-[#1d2b22] bg-white">
            <Icon size={18} color={spot.accent} strokeWidth={2.8} />
          </span>
          <span className="leading-tight">{district.name}</span>
        </span>
        <span
          className="absolute inset-x-[9%] top-[33%] h-[10%] rounded-t-xl border-[3px] border-[#1d2b22]"
          style={{ backgroundColor: style.awning }}
        />
        <Interior tone={spot.tone} large={district.id === 'startup-cafe'} />
        <span
          className="absolute right-[10%] bottom-[11%] h-[18%] w-[14%] rounded border-[3px] border-[#1d2b22]"
          style={{ backgroundColor: style.interior }}
        >
          <span className="mx-auto mt-[20%] block h-[12%] w-[58%] rounded bg-[#1d2b22]" />
          <span className="mx-auto mt-[14%] block h-[12%] w-[42%] rounded bg-[#1d2b22]" />
        </span>
      </span>
    </motion.button>
  )
}

function ClockTower({
  active,
  district,
  onSelect,
}: {
  active: boolean
  district: District
  onSelect: (district: District) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(district)}
      className="absolute top-[9%] left-1/2 z-10 h-[31%] w-[9%] -translate-x-1/2 text-left outline-none"
      aria-label="Internship Tower"
    >
      <span className="absolute right-[14%] bottom-[-4%] left-[14%] h-5 rounded-full bg-[#1e351d]/16" />
      <span
        className={`relative block h-full rounded-t-[2rem] border-[3px] border-[#1d2b22] bg-[#f1e5cf] shadow-[0_14px_20px_rgba(35,52,29,0.16)] ${
          active ? 'ring-8 ring-[#72a956]/30' : ''
        }`}
      >
        <span className="absolute inset-x-[18%] top-[-7%] h-[20%] rounded-t-full border-[3px] border-[#1d2b22] bg-[#8d846f]" />
        <span className="absolute top-[13%] left-1/2 h-[25%] w-[48%] -translate-x-1/2 rounded-full border-[3px] border-[#1d2b22] bg-[#fff8ed]">
          <span className="absolute top-1/2 left-1/2 h-[3px] w-[28%] origin-left bg-[#1d2b22]" />
          <span className="absolute top-1/2 left-1/2 h-[3px] w-[20%] origin-left rotate-90 bg-[#1d2b22]" />
        </span>
        <span className="absolute top-[38%] left-1/2 flex w-[78%] -translate-x-1/2 items-center justify-center gap-1 rounded-lg border-2 border-[#1d2b22] bg-white/86 px-1 py-1 text-[clamp(0.42rem,0.72vw,0.74rem)] font-black text-[#14351f]">
          <BriefcaseBusiness size={13} color="#66845c" strokeWidth={2.8} />
          {district.name}
        </span>
        <span className="absolute inset-x-[28%] bottom-[12%] h-[38%] rounded-t-2xl border-[3px] border-[#1d2b22] bg-[#9fd0d4]" />
        <Vines dense />
      </span>
    </button>
  )
}

function SecondarySign({
  active,
  district,
  onSelect,
  spot,
}: {
  active: boolean
  district: District
  onSelect: (district: District) => void
  spot: CampusSpot
}) {
  const Icon = spot.icon

  return (
    <button
      type="button"
      onClick={() => onSelect(district)}
      className="absolute z-30 -translate-x-1/2 -translate-y-1/2 outline-none"
      style={{
        left: `${spot.x}%`,
        top: `${spot.y}%`,
        width: `${spot.width}%`,
        height: `${spot.height}%`,
      }}
    >
      <span
        className={`flex h-full w-full items-center justify-center gap-2 rounded-t-2xl border-[3px] border-[#1d2b22] bg-[#f8eedf] px-3 text-[clamp(0.5rem,0.88vw,0.88rem)] font-black text-[#14351f] shadow-[0_10px_16px_rgba(28,47,24,0.16)] ${
          active ? 'ring-6 ring-[#72a956]/30' : ''
        }`}
      >
        <Icon size={17} color={spot.accent} strokeWidth={2.8} />
        {district.name}
      </span>
    </button>
  )
}

function Avatar() {
  return (
    <div className="absolute top-[76%] left-1/2 z-40 w-[7.2%] -translate-x-1/2 -translate-y-full">
      <span className="absolute top-[94%] left-1/2 h-5 w-[76%] -translate-x-1/2 rounded-full bg-black/18" />
      <svg className="relative h-auto w-full" viewBox="0 0 180 260" aria-hidden="true">
        <g stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5">
          <ellipse cx="90" cy="244" rx="52" ry="10" fill="#000000" opacity="0.14" stroke="none" />
          <path d="M52 101 C38 123 38 155 47 187 L68 184 C64 153 65 126 75 108 Z" fill="#1f1f1f" />
          <path
            d="M128 101 C142 123 142 155 133 187 L112 184 C116 153 115 126 105 108 Z"
            fill="#1f1f1f"
          />
          <path d="M58 171 L50 225 L72 225 L82 174 Z" fill="#7a845e" />
          <path d="M98 174 L108 225 L130 225 L122 171 Z" fill="#7a845e" />
          <path d="M48 223 L78 223 L80 241 L42 241 C42 233 44 228 48 223 Z" fill="#1f1f1f" />
          <path d="M102 223 L132 223 C136 228 138 233 138 241 L100 241 Z" fill="#1f1f1f" />
          <path
            d="M56 101 C62 80 76 70 91 70 C107 70 120 81 125 102 L132 174 C106 184 76 184 49 174 Z"
            fill="#1f1f1f"
          />
          <path
            d="M68 115 C74 128 107 128 113 115 L113 166 C99 172 80 172 66 166 Z"
            fill="#202020"
          />
          <path d="M63 130 L45 133 L48 181 L65 179 Z" fill="#262626" />
          <path d="M117 130 L135 133 L132 181 L115 179 Z" fill="#262626" />
          <path d="M52 185 C55 195 67 194 70 184" fill="#ffd9b3" />
          <path d="M128 185 C125 195 113 194 110 184" fill="#ffd9b3" />
          <path
            d="M53 96 C51 72 67 54 90 54 C113 54 130 72 127 96 C117 111 66 111 53 96 Z"
            fill="#ffd9b3"
          />
          <path
            d="M45 74 C51 43 74 28 101 32 C127 37 141 59 129 90 C125 72 111 66 102 55 C94 70 70 64 58 89 C55 83 51 78 45 74 Z"
            fill="#111111"
          />
          <path d="M58 52 C72 43 79 42 91 42" />
          <path d="M81 35 C93 27 110 32 118 43" />
          <path d="M100 34 C113 26 129 34 134 48" />
          <path d="M59 109 C74 122 106 122 121 109" fill="none" />
          <path d="M64 224 L78 224 L78 234 L58 234" stroke="#ffffff" />
          <path d="M102 224 L116 224 L122 234 L102 234" stroke="#ffffff" />
        </g>
      </svg>
    </div>
  )
}

export function CityScene({ activeDistrict, onSelect }: CitySceneProps) {
  const internshipDistrict = districts.find((district) => district.id === 'internship-tower')

  return (
    <section className="absolute inset-0 z-0 flex items-center justify-center bg-[#dff3ff] px-3 pt-40 pb-20 md:px-6 md:pt-20 md:pb-20">
      <div className="relative aspect-video w-full max-w-[1680px] overflow-hidden rounded-[1.75rem] border border-emerald-950/10 bg-[#dff3ff] shadow-[0_28px_65px_rgba(37,64,34,0.16)]">
        <Backdrop />
        <Cloud className="top-[10%] left-[14%] scale-75 md:scale-100" />
        <Cloud className="top-[12%] right-[11%] hidden scale-90 md:block" />
        <Cloud className="top-[24%] left-[58%] hidden scale-75 md:block" />
        {internshipDistrict && (
          <ClockTower
            active={activeDistrict.id === internshipDistrict.id}
            district={internshipDistrict}
            onSelect={onSelect}
          />
        )}

        <Tree className="top-[23%] left-[3%]" />
        <Tree className="top-[27%] left-[20%]" small />
        <Tree className="top-[28%] right-[20%]" small />
        <Tree className="top-[23%] right-[3%]" />
        <Tree className="top-[63%] left-[1%]" />
        <Tree className="top-[63%] right-[1%]" />
        <Bush className="bottom-[2%] left-[0%]" />
        <Bush className="right-[0%] bottom-[2%]" />
        <FlowerBed className="bottom-[6%] left-[6%] h-[12%] w-[22%]" />
        <FlowerBed className="right-[6%] bottom-[6%] h-[12%] w-[22%]" />
        <Bench className="bottom-[8%] left-[8%] hidden md:block" />
        <Bench className="right-[8%] bottom-[8%] hidden md:block" flip />
        <Lamp className="bottom-[23%] left-[26%]" />
        <Lamp className="right-[26%] bottom-[23%]" />
        <Lamp className="bottom-[31%] left-[41%]" />
        <Lamp className="right-[41%] bottom-[31%]" />

        {districts.map((district) => {
          const spot = campusSpots[district.id]
          if (!spot || district.id === 'internship-tower') return null

          if (district.id === 'chill-zone') {
            return (
              <SecondarySign
                key={district.id}
                active={district.id === activeDistrict.id}
                district={district}
                onSelect={onSelect}
                spot={spot}
              />
            )
          }

          return (
            <DistrictBuilding
              key={district.id}
              active={district.id === activeDistrict.id}
              district={district}
              onSelect={onSelect}
              spot={spot}
            />
          )
        })}

        <Avatar />
      </div>
    </section>
  )
}
