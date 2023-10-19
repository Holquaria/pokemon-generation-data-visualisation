import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Mesh,
  Group,
  MeshLambertMaterial,
  SphereGeometry,
  CircleGeometry,
  CylinderGeometry,
} from "three";
import * as THREE from "three";

function Pokeball({ props }) {
  const pokeball_size = props.scale;
  const pokeball_segments = 48;

  return (
    <mesh position={[props.position[0], props.position[1], props.position[2]]}>
      <mesh>
        <sphereGeometry
          args={[
            pokeball_size,
            pokeball_segments,
            pokeball_segments,
            0,
            Math.PI * 2,
            0,
            (Math.PI / 2) * 0.97,
          ]}
        />
        <meshPhysicalMaterial color={props.color} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <sphereGeometry
          args={[
            pokeball_size,
            pokeball_segments,
            pokeball_segments,
            0,
            Math.PI * 2,
            (Math.PI / 2) * 1.03,
            Math.PI / 2,
          ]}
        />
        <meshPhysicalMaterial side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <sphereGeometry
          args={[pokeball_size * 0.95, pokeball_segments, pokeball_segments]}
        />
        <meshPhysicalMaterial color="black" side={THREE.DoubleSide} />
      </mesh>
      <mesh
        position={[0, 0, pokeball_size * 0.93]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <mesh>
          <cylinderGeometry
            args={[
              pokeball_size / 4,
              pokeball_size / 4,
              (pokeball_size / 20) * 3,
              pokeball_segments,
            ]}
          />
          <meshPhysicalMaterial color="black" side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, (pokeball_size / 200) * 7, 0]}>
          <cylinderGeometry
            args={[
              (pokeball_size / 20) * 3,
              (pokeball_size / 20) * 3,
              (pokeball_size / 20) * 3,
              pokeball_segments,
            ]}
          />
          <meshPhysicalMaterial side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, pokeball_size / 20, 0]}>
          <cylinderGeometry
            args={[
              pokeball_size / 10,
              pokeball_size / 10,
              (pokeball_size / 20) * 3,
              pokeball_segments,
            ]}
          />
          <meshPhysicalMaterial side={THREE.DoubleSide} />
        </mesh>
      </mesh>
    </mesh>
  );
}

export default Pokeball;
