import { Billboard, Text } from '@react-three/drei'
import type { District } from '../../types/city'

type BuildingBlockProps = {
  active: boolean
  district: District
  onSelect: (district: District) => void
}

export function BuildingBlock({ active, district, onSelect }: BuildingBlockProps) {
  const [x, , z] = district.position
  const [, height] = district.scale

  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, height / 2, 0]} scale={district.scale} onClick={() => onSelect(district)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={district.color}
          emissive={district.glow}
          emissiveIntensity={active ? 1.25 : 0.42}
          metalness={0.45}
          roughness={0.34}
        />
      </mesh>

      <mesh
        position={[0, height + 0.08, 0]}
        scale={[district.scale[0] + 0.18, 0.1, district.scale[2] + 0.18]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={active ? '#ffffff' : district.glow}
          emissive={district.glow}
          emissiveIntensity={active ? 1.4 : 0.65}
        />
      </mesh>

      <Billboard position={[0, height + 0.7, 0]}>
        <Text anchorX="center" anchorY="middle" color="#eef7ff" fontSize={0.24} maxWidth={2.4}>
          {district.name}
        </Text>
      </Billboard>
    </group>
  )
}
