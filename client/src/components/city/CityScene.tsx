import { useEffect, useMemo, useRef } from 'react'
import { PerspectiveCamera } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { Group, MathUtils, Vector3 } from 'three'
import { districts } from '../../data/districts'
import type { District } from '../../types/city'
import { BuildingBlock } from './BuildingBlock'
import { PlayerCharacter } from './PlayerCharacter'

type CitySceneProps = {
  activeDistrict: District
  onSelect: (district: District) => void
}

type CampusVerseDebugState = {
  cameraAngle: number
  cameraX: number
  cameraZ: number
  playerX: number
  playerZ: number
}

declare global {
  interface Window {
    __campusverse3d?: CampusVerseDebugState
  }
}

const movementKeys = new Set([
  'KeyW',
  'KeyA',
  'KeyS',
  'KeyD',
  'ArrowUp',
  'ArrowLeft',
  'ArrowDown',
  'ArrowRight',
  'KeyQ',
  'KeyE',
])

const cityBounds = {
  minX: -13,
  maxX: 13,
  minZ: -12,
  maxZ: 8.8,
}

const citySize = {
  width: 29,
  depth: 23,
}

function keepPlayerOutsideBuildings(position: Vector3) {
  for (const district of districts) {
    const [buildingX, , buildingZ] = district.position
    const [buildingWidth, , buildingDepth] = district.scale
    const halfWidth = buildingWidth / 2 + 0.5
    const halfDepth = buildingDepth / 2 + 0.5
    const offsetX = position.x - buildingX
    const offsetZ = position.z - buildingZ

    if (Math.abs(offsetX) >= halfWidth || Math.abs(offsetZ) >= halfDepth) {
      continue
    }

    const overlapX = halfWidth - Math.abs(offsetX)
    const overlapZ = halfDepth - Math.abs(offsetZ)

    if (overlapX < overlapZ) {
      position.x += (offsetX >= 0 ? 1 : -1) * overlapX
    } else {
      position.z += (offsetZ >= 0 ? 1 : -1) * overlapZ
    }
  }

  position.x = MathUtils.clamp(position.x, cityBounds.minX, cityBounds.maxX)
  position.z = MathUtils.clamp(position.z, cityBounds.minZ, cityBounds.maxZ)
}

function KeyboardCity({ activeDistrict, onSelect }: CitySceneProps) {
  const { camera } = useThree()
  const playerRef = useRef<Group>(null)
  const keysRef = useRef<Set<string>>(new Set())
  const activeIdRef = useRef(activeDistrict.id)
  const cameraAngleRef = useRef(0)
  const isDraggingRef = useRef(false)
  const dragXRef = useRef(0)
  const cameraTarget = useRef(new Vector3(0, 7.2, 12.2))
  const lookTarget = useRef(new Vector3(0, 0.85, 0))
  const moveVector = useRef(new Vector3())
  const forwardVector = useRef(new Vector3())
  const rightVector = useRef(new Vector3())

  const roadLines = useMemo(
    () =>
      Array.from({ length: 13 }, (_, index) => ({
        id: index,
        z: cityBounds.minZ + 1 + index * 1.65,
      })),
    [],
  )

  const crossLines = useMemo(
    () =>
      Array.from({ length: 9 }, (_, index) => ({
        id: index,
        x: cityBounds.minX + 1 + index * 3,
      })),
    [],
  )

  useEffect(() => {
    activeIdRef.current = activeDistrict.id
  }, [activeDistrict.id])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!movementKeys.has(event.code)) return
      event.preventDefault()
      keysRef.current.add(event.code)
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      keysRef.current.delete(event.code)
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!(event.target instanceof HTMLCanvasElement)) return
      isDraggingRef.current = true
      dragXRef.current = event.clientX
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDraggingRef.current) return
      const deltaX = event.clientX - dragXRef.current
      dragXRef.current = event.clientX
      cameraAngleRef.current -= deltaX * 0.008
    }

    const stopDragging = () => {
      isDraggingRef.current = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', stopDragging)
    window.addEventListener('pointercancel', stopDragging)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', stopDragging)
      window.removeEventListener('pointercancel', stopDragging)
    }
  }, [])

  useEffect(() => {
    gsap.fromTo(
      '.city-panel',
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
    )
  }, [activeDistrict.id])

  useFrame((_state, delta) => {
    const player = playerRef.current
    if (!player) return

    const keys = keysRef.current

    if (keys.has('KeyQ')) {
      cameraAngleRef.current -= delta * 1.75
    }

    if (keys.has('KeyE')) {
      cameraAngleRef.current += delta * 1.75
    }

    let inputX = 0
    let inputZ = 0

    if (keys.has('KeyW') || keys.has('ArrowUp')) inputZ -= 1
    if (keys.has('KeyS') || keys.has('ArrowDown')) inputZ += 1
    if (keys.has('KeyA') || keys.has('ArrowLeft')) inputX -= 1
    if (keys.has('KeyD') || keys.has('ArrowRight')) inputX += 1

    if (inputX !== 0 || inputZ !== 0) {
      const length = Math.hypot(inputX, inputZ)
      const angle = cameraAngleRef.current
      const speed = 5.1

      forwardVector.current.set(-Math.sin(angle), 0, -Math.cos(angle))
      rightVector.current.set(Math.cos(angle), 0, -Math.sin(angle))

      moveVector.current
        .copy(forwardVector.current)
        .multiplyScalar(inputZ / -length)
        .addScaledVector(rightVector.current, inputX / length)
        .normalize()

      player.position.addScaledVector(moveVector.current, speed * delta)
      keepPlayerOutsideBuildings(player.position)
      player.rotation.y = Math.atan2(moveVector.current.x, moveVector.current.z)
    }

    let nearestDistrict = activeDistrict
    let nearestDistance = Number.POSITIVE_INFINITY

    for (const district of districts) {
      const distance = Math.hypot(
        player.position.x - district.position[0],
        player.position.z - district.position[2],
      )

      if (distance < nearestDistance) {
        nearestDistance = distance
        nearestDistrict = district
      }
    }

    if (nearestDistance < 2.25 && nearestDistrict.id !== activeIdRef.current) {
      activeIdRef.current = nearestDistrict.id
      onSelect(nearestDistrict)
    }

    const angle = cameraAngleRef.current
    cameraTarget.current.set(
      player.position.x + Math.sin(angle) * 11.4,
      player.position.y + 7.2,
      player.position.z + Math.cos(angle) * 11.4,
    )
    lookTarget.current.set(player.position.x, 0.95, player.position.z)
    camera.position.lerp(cameraTarget.current, 0.09)
    camera.lookAt(lookTarget.current)

    window.__campusverse3d = {
      cameraAngle: cameraAngleRef.current,
      cameraX: camera.position.x,
      cameraZ: camera.position.z,
      playerX: player.position.x,
      playerZ: player.position.z,
    }
  })

  return (
    <>
      <color attach="background" args={['#040711']} />
      <fog attach="fog" args={['#060915', 13, 31]} />
      <PerspectiveCamera makeDefault position={[0, 7.2, 12.2]} fov={50} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 6, 4]} intensity={1.35} />
      <pointLight color="#11d9ff" position={[-9, 4, -4]} intensity={10} distance={12} />
      <pointLight color="#ff5ea8" position={[9, 4, 3]} intensity={9} distance={12} />
      <pointLight color="#ffcc66" position={[0, 4, -8]} intensity={7} distance={10} />

      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[citySize.width, citySize.depth]} />
        <meshStandardMaterial color="#07111f" metalness={0.2} roughness={0.45} />
      </mesh>

      {roadLines.map((line) => (
        <mesh key={line.id} position={[0, 0.018, line.z]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[0.04, citySize.width - 1]} />
          <meshStandardMaterial
            color={line.id % 2 === 0 ? '#0fc8ff' : '#ff5ea8'}
            emissive={line.id % 2 === 0 ? '#0fc8ff' : '#ff5ea8'}
            emissiveIntensity={0.48}
          />
        </mesh>
      ))}

      {crossLines.map((line) => (
        <mesh key={line.id} position={[line.x, 0.016, -1.2]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.025, citySize.depth - 3]} />
          <meshStandardMaterial
            color={line.id % 2 === 0 ? '#0fc8ff' : '#ff5ea8'}
            emissive={line.id % 2 === 0 ? '#0fc8ff' : '#ff5ea8'}
            emissiveIntensity={0.22}
          />
        </mesh>
      ))}

      {districts.map((district) => (
        <BuildingBlock
          key={district.id}
          active={district.id === activeDistrict.id}
          district={district}
          onSelect={onSelect}
        />
      ))}

      <PlayerCharacter playerRef={playerRef} />
    </>
  )
}

export function CityScene({ activeDistrict, onSelect }: CitySceneProps) {
  return (
    <Canvas
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        cursor: 'grab',
        touchAction: 'none',
      }}
    >
      <KeyboardCity activeDistrict={activeDistrict} onSelect={onSelect} />
    </Canvas>
  )
}
