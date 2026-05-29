import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, MathUtils, Mesh, Vector3 } from 'three'
import type { RefObject } from 'react'

type PlayerCharacterProps = {
  playerRef: RefObject<Group | null>
}

export function PlayerCharacter({ playerRef }: PlayerCharacterProps) {
  const leftArmRef = useRef<Mesh>(null)
  const rightArmRef = useRef<Mesh>(null)
  const leftLegRef = useRef<Mesh>(null)
  const rightLegRef = useRef<Mesh>(null)
  const lastPositionRef = useRef(new Vector3(0, 0, 3.8))
  const walkPhaseRef = useRef(0)

  useFrame((_state, delta) => {
    const player = playerRef.current
    if (!player) return

    const distance = player.position.distanceTo(lastPositionRef.current)
    const isWalking = distance > 0.002

    if (isWalking) {
      walkPhaseRef.current += delta * 10
    }

    const swing = isWalking ? Math.sin(walkPhaseRef.current) * 0.55 : 0

    if (leftArmRef.current) {
      leftArmRef.current.rotation.x = MathUtils.lerp(leftArmRef.current.rotation.x, swing, 0.2)
    }

    if (rightArmRef.current) {
      rightArmRef.current.rotation.x = MathUtils.lerp(rightArmRef.current.rotation.x, -swing, 0.2)
    }

    if (leftLegRef.current) {
      leftLegRef.current.rotation.x = MathUtils.lerp(
        leftLegRef.current.rotation.x,
        -swing * 0.65,
        0.2,
      )
    }

    if (rightLegRef.current) {
      rightLegRef.current.rotation.x = MathUtils.lerp(
        rightLegRef.current.rotation.x,
        swing * 0.65,
        0.2,
      )
    }

    lastPositionRef.current.copy(player.position)
  })

  return (
    <group ref={playerRef} position={[0, 0, 3.8]}>
      <mesh position={[0, 0.42, 0]} scale={[0.3, 0.56, 0.2]}>
        <capsuleGeometry args={[1, 1, 10, 18]} />
        <meshStandardMaterial
          color="#111827"
          emissive="#0f172a"
          emissiveIntensity={0.2}
          roughness={0.55}
        />
      </mesh>

      <mesh position={[0, 1.08, 0]} scale={[0.28, 0.3, 0.27]}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial color="#ffd9b3" roughness={0.5} />
      </mesh>

      <mesh position={[0, 1.27, -0.02]} scale={[0.3, 0.14, 0.28]}>
        <sphereGeometry args={[1, 18, 14]} />
        <meshStandardMaterial color="#111111" roughness={0.48} />
      </mesh>

      <mesh position={[-0.09, 1.08, 0.23]} scale={[0.025, 0.04, 0.025]}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      <mesh position={[0.09, 1.08, 0.23]} scale={[0.025, 0.04, 0.025]}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      <mesh position={[0, 0.76, 0.18]} scale={[0.09, 0.09, 0.025]}>
        <torusGeometry args={[1, 0.3, 8, 18, Math.PI * 1.35]} />
        <meshStandardMaterial color="#f8fafc" emissive="#f8fafc" emissiveIntensity={0.2} />
      </mesh>

      <mesh position={[0, 0.58, -0.22]} scale={[0.28, 0.42, 0.08]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#202020" roughness={0.6} />
      </mesh>

      <mesh
        ref={leftArmRef}
        position={[-0.38, 0.48, 0.03]}
        rotation={[0.1, 0, -0.08]}
        scale={[0.055, 0.3, 0.055]}
      >
        <capsuleGeometry args={[1, 1, 8, 14]} />
        <meshStandardMaterial color="#111827" roughness={0.55} />
      </mesh>

      <mesh
        ref={rightArmRef}
        position={[0.38, 0.48, 0.03]}
        rotation={[-0.1, 0, 0.08]}
        scale={[0.055, 0.3, 0.055]}
      >
        <capsuleGeometry args={[1, 1, 8, 14]} />
        <meshStandardMaterial color="#111827" roughness={0.55} />
      </mesh>

      <mesh position={[-0.38, 0.17, 0.05]} scale={[0.06, 0.07, 0.055]}>
        <sphereGeometry args={[1, 12, 10]} />
        <meshStandardMaterial color="#ffd9b3" roughness={0.5} />
      </mesh>

      <mesh position={[0.38, 0.17, 0.05]} scale={[0.06, 0.07, 0.055]}>
        <sphereGeometry args={[1, 12, 10]} />
        <meshStandardMaterial color="#ffd9b3" roughness={0.5} />
      </mesh>

      <mesh ref={leftLegRef} position={[-0.17, 0.08, 0.03]} scale={[0.08, 0.26, 0.08]}>
        <capsuleGeometry args={[1, 1, 8, 14]} />
        <meshStandardMaterial color="#7a845e" roughness={0.55} />
      </mesh>

      <mesh ref={rightLegRef} position={[0.17, 0.08, 0.03]} scale={[0.08, 0.26, 0.08]}>
        <capsuleGeometry args={[1, 1, 8, 14]} />
        <meshStandardMaterial color="#7a845e" roughness={0.55} />
      </mesh>

      <mesh position={[-0.17, 0.03, 0.14]} scale={[0.1, 0.06, 0.18]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.42} />
      </mesh>

      <mesh position={[0.17, 0.03, 0.14]} scale={[0.1, 0.06, 0.18]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.42} />
      </mesh>

      <pointLight color="#22d3ee" intensity={1.6} distance={3.2} position={[0, 1.1, 0.24]} />
    </group>
  )
}
