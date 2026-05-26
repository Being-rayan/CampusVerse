import { Text } from '@react-three/drei'
import type { District } from '../../types/city'

type BuildingBlockProps = {
  district: District
  active: boolean
  onSelect: (district: District) => void
}

export function BuildingBlock({ district, active, onSelect }: BuildingBlockProps) {
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

      <Text
        fontSize={0.24}
        color="#eef7ff"
        anchorX="center"
        anchorY="middle"
        position={[0, height + 0.7, 0]}
        maxWidth={2.4}
      >
        {district.name}
      </Text>
    </group>
  )
}
