import type { RefObject } from 'react'
import type { Group } from 'three'

type PlayerCharacterProps = {
  playerRef: RefObject<Group | null>
}

export function PlayerCharacter({ playerRef }: PlayerCharacterProps) {
  return (
    <group ref={playerRef} position={[0, 0, 3.8]}>
      <mesh position={[0, 0.58, 0]} scale={[0.46, 0.82, 0.3]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#34d399" emissive="#0f766e" emissiveIntensity={0.32} />
      </mesh>

      <mesh position={[0, 1.15, 0]} scale={[0.34, 0.34, 0.34]}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial color="#f8fafc" emissive="#60a5fa" emissiveIntensity={0.18} />
      </mesh>

      <mesh position={[-0.15, 0.12, 0]} scale={[0.13, 0.35, 0.14]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#22d3ee" emissive="#0891b2" emissiveIntensity={0.25} />
      </mesh>

      <mesh position={[0.15, 0.12, 0]} scale={[0.13, 0.35, 0.14]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#22d3ee" emissive="#0891b2" emissiveIntensity={0.25} />
      </mesh>

      <pointLight color="#22d3ee" intensity={1.6} distance={3.2} position={[0, 1.2, 0]} />
    </group>
  )
}
