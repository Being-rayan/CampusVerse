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

const movementKeys = new Set([
  'KeyW',
  'KeyA',
  'KeyS',
  'KeyD',
  'ArrowUp',
  'ArrowLeft',
  'ArrowDown',
  'ArrowRight',
])
const cityBounds = {
  minX: -7.4,
  maxX: 7.4,
  minZ: -5.7,
  maxZ: 5.7,
}

function KeyboardCity({ activeDistrict, onSelect }: CitySceneProps) {
  const { camera } = useThree()
  const playerRef = useRef<Group>(null)
  const keysRef = useRef<Set<string>>(new Set())
  const activeIdRef = useRef(activeDistrict.id)
  const cameraTarget = useRef(new Vector3(0, 5.8, 8.2))
  const lookTarget = useRef(new Vector3(0, 0.7, 0))

  const roadLines = useMemo(
    () =>
      Array.from({ length: 13 }, (_, index) => ({
        id: index,
        z: -5.7 + index * 0.95,
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

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
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

    let moveX = 0
    let moveZ = 0
    const keys = keysRef.current

    if (keys.has('KeyW') || keys.has('ArrowUp')) moveZ -= 1
    if (keys.has('KeyS') || keys.has('ArrowDown')) moveZ += 1
    if (keys.has('KeyA') || keys.has('ArrowLeft')) moveX -= 1
    if (keys.has('KeyD') || keys.has('ArrowRight')) moveX += 1

    if (moveX !== 0 || moveZ !== 0) {
      const length = Math.hypot(moveX, moveZ)
      const speed = 4.4

      player.position.x = MathUtils.clamp(
        player.position.x + (moveX / length) * speed * delta,
        cityBounds.minX,
        cityBounds.maxX,
      )
      player.position.z = MathUtils.clamp(
        player.position.z + (moveZ / length) * speed * delta,
        cityBounds.minZ,
        cityBounds.maxZ,
      )
      player.rotation.y = Math.atan2(moveX, moveZ)
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

    cameraTarget.current.set(player.position.x, 5.8, player.position.z + 7.2)
    lookTarget.current.set(player.position.x, 0.75, player.position.z - 0.7)
    camera.position.lerp(cameraTarget.current, 0.08)
    camera.lookAt(lookTarget.current)
  })

  return (
    <>
      <color attach="background" args={['#040711']} />
      <fog attach="fog" args={['#060915', 7, 18]} />
      <PerspectiveCamera makeDefault position={[0, 5.8, 8.2]} fov={48} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 6, 4]} intensity={1.35} />
      <pointLight color="#11d9ff" position={[-5, 4, -2]} intensity={9} distance={8} />
      <pointLight color="#ff5ea8" position={[5, 4, 1]} intensity={8} distance={8} />
      <pointLight color="#ffcc66" position={[0, 3, -4]} intensity={6} distance={7} />

      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[17, 13]} />
        <meshStandardMaterial color="#07111f" metalness={0.2} roughness={0.45} />
      </mesh>

      {roadLines.map((line) => (
        <mesh key={line.id} position={[0, 0.018, line.z]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[0.035, 16]} />
          <meshStandardMaterial
            color={line.id % 2 === 0 ? '#0fc8ff' : '#ff5ea8'}
            emissive={line.id % 2 === 0 ? '#0fc8ff' : '#ff5ea8'}
            emissiveIntensity={0.65}
          />
        </mesh>
      ))}

      {districts.map((district) => (
        <BuildingBlock
          key={district.id}
          district={district}
          active={district.id === activeDistrict.id}
          onSelect={onSelect}
        />
      ))}

      <PlayerCharacter playerRef={playerRef} />
    </>
  )
}

export function CityScene({ activeDistrict, onSelect }: CitySceneProps) {
  return (
    <Canvas style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <KeyboardCity activeDistrict={activeDistrict} onSelect={onSelect} />
    </Canvas>
  )
}
