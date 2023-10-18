"use client"

import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import pokemonData from './data/pokemon-types-by-generation.json'
import { OrbitControls, PerspectiveCamera, Text, Text3D } from '@react-three/drei'
import { DoubleSide } from 'three'

type GenerationData = {
  generation: {
    types: {

    },
    pokemon: [string]
  }
}

export default function Home() {
  const meshRef = useRef()
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [data, setData] = useState([] as any)
  const [generation, setGeneration] = useState(0)
  const [typeAndGeneration, setTypeAndGeneration] = useState([])

  const colors = {
    grass: '#52b146',
    poison: '#9454cb',
    psychic: '#e96a8d',
    steel: '#6caec9',
    rock: '#8c886c',
    normal: '#dcd8df',
    fairy: '#e08dde',
    ice: '#90efef',
    dark: '#4f4747',
    ground: '#b7844d',
    dragon: '#596fbf',
    water: '#59b3ee',
    ghost: '#6f466f',
    electric: '#f1d461',
    flying: '#a8d5f6',
    bug: '#cacb5a',
    fighting: '#e59222',
    fire: '#e6623f'
  }

  const generations = [
    'Generation 1: Red, Blue, Yellow',
    'Generation 2: Silver, Gold, Crystal',
    'Generation 3: Ruby, Sapphire, Emerald',
    'Generation 4: Diamond, Pearl, Platinum',
    'Generation 5: Black and White',
    'Generation 6: X and Y',
    'Generation 7: Sun and Moon',
    'Generation 8: Sword and Shield',
    'Generation 9: Scarlet and Violet'
  ]

  console.log('typeAndGeneration', typeAndGeneration)

  const yAxis = [0, 5, 10, 15, 20, 25, 30, 35]

  useEffect(() => {
    setData(pokemonData)
  }, [])

  const Box = (props: any) => {

    // useFrame((state, delta) => (meshRef.current.rotation.x += delta))
    return (
      <mesh
        {...props}
        scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    )
  }

  const Bar = ({props}) => {
    const [active, setActive] = useState(false)
    return <mesh
    key={props.key}
    // scale={active ? 1.2 : 1}
    position={[(props.key * 2), (((props.type1 / 2))), active ? 1 : 0]}
    onClick={(event) => setTypeAndGeneration(data[generation][generation].pokemon[props.type0])}
    onPointerOver={event => setActive(!active)}
    onPointerOut={(event) => setActive(!active)}
  >
    <boxGeometry args={[1, props.type1, 1]} />
    <meshPhysicalMaterial color={colors[props.type0]} />
  </mesh>
  }

  const BarsByGeneration = () => {
    if (data) {
      return (
        <mesh key={''} position={[-15, -10, 0]}>
          <mesh
            position={[-2, 17, 0]}
          >
            <planeGeometry args={[0.5, 35]} />
            <meshPhysicalMaterial color={'grey'} side={DoubleSide} />
          </mesh>
          <mesh>
            {yAxis.map((number, i) => {
              return <Text3D
                key={number}
                font="./fonts/helvetiker_regular.typeface.json"
                position={[-5, ((i * 5)), 0]}
                rotation={[0, 0, 0]}
              >
                {number}
                <meshPhysicalMaterial color='white'/>
              </Text3D>
            })}
          </mesh>
          <mesh
            position={[16.75, -0.25, 0]}
          >
            <planeGeometry args={[38, 0.5]} />
            <meshPhysicalMaterial color={'grey'} side={DoubleSide} />
          </mesh>
          {(Object.entries(data[generation][generation].types)).map((type, j) => {
            return <mesh key={''}>
              <Text3D
                font="./fonts/helvetiker_regular.typeface.json"
                position={[(j * 2), -0.5, 0]}
                rotation={[0, 0, -1.5]}
              >
                {/* <meshStandardMaterial /> */}
                {type[0]}
                <meshPhysicalMaterial color='white'/>
              </Text3D>
              <Bar props={{key: j, type0: type[0], type1: type[1]}} />

            </mesh>
          })}
        </mesh>
      )
    }
  }

  const GenerationSelector = () => {
    return (
      <div className='flex flex-row gap-4 justify-center my-2 absolute left-1/2 -translate-x-1/2 z-20'>
        <h2>Select A Generation:</h2>
        {generations.map((gen, i) => {
          return <button key={gen} onClick={() => setGeneration(i)}>{(i + 1)}</button>
        })}
      </div>
    )
  }

  const GenerationHeader = () => {
    return <h1 className='justify-center flex absolute top-10 left-1/2 -translate-x-1/2 z-20'>{generations[generation]}</h1>
  }

  const PokemonList = () => {
    if (typeAndGeneration.length !== 0) {
      return (
      <div className='flex flex-row gap-2 flex-wrap justify-center flex absolute bottom-2 left-1/2 -translate-x-1/2 z-20'>
        {typeAndGeneration.map((pokemon) => {
          console.log(pokemon)
          return <p key={pokemon}>{pokemon}</p>
        })}
      </div>
      )
    } else {
      return <div className='flex flex-row gap-2 flex-wrap justify-center flex absolute bottom-2 left-1/2 -translate-x-1/2 z-20'>
        <p>Select a type to see the Pokemon added in this generation</p>
    </div>
    }
  }

  return (
    <main className="w-full h-full">
      <GenerationSelector />
      <GenerationHeader />
      <div className='z-10 w-full h-full'>
        <Canvas>
          <PerspectiveCamera makeDefault fov={75} near={0.1} far={1000} position={[15, 15, 40]} />
          <ambientLight intensity={0.2} />
          <directionalLight position={[15, 15, 40]} castShadow={true} />
          {/* <Bars /> */}
          <BarsByGeneration />
          <OrbitControls />
        </Canvas>
      </div>
      <PokemonList />
      {/* <Data /> */}
    </main>
  )
}
