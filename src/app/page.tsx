"use client"

import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import pokemonData from './data/pokemon-types-by-generation.json'
import { OrbitControls, PerspectiveCamera, SpotLight, Text, Text3D, useHelper } from '@react-three/drei'
import { DoubleSide, SpotLightHelper } from 'three'
import Link from 'next/link'
import Pokeball from './Pokeball.jsx'

type colorsObject = {
  grass: string,
  poison: string,
  psychic: string,
  steel: string,
  rock: string,
  normal: string,
  fairy: string,
  ice: string,
  dark: string,
  ground: string,
  dragon: string,
  water: string,
  ghost: string,
  electric: string,
  flying: string,
  bug: string,
  fighting: string,
  fire: string
}

export default function Home() {
  const meshRef = useRef()
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [data, setData] = useState([] as any)
  const [generation, setGeneration] = useState(0)
  const [typeAndGeneration, setTypeAndGeneration] = useState([])

  const colors: colorsObject = {
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

  const capitaliseFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const pokemonNameFormatting = (pokemonName: string) => {
    const splitArray = pokemonName.split("-");
    const formattedArray = splitArray.map((string) => {
      return capitaliseFirstLetter(string);
    });
    return formattedArray.join(' ')
  };



  const yAxis = [0, 5, 10, 15, 20, 25, 30, 35]

  useEffect(() => {
    setData(pokemonData)
  }, [])

  const Bar = ({ props }: any) => {
    const [active, setActive] = useState(false)
    return <mesh>
      <mesh
        key={props.key}
        castShadow={true}
        position={[(props.key * 2), (((props.type1 / 2))), active ? 0.5 : 0]}
        onClick={(event) => setTypeAndGeneration(data[generation][generation].pokemon[props.type0])}
        onPointerOver={event => setActive(!active)}
        onPointerOut={(event) => setActive(!active)}
      >
        <boxGeometry args={[1, props.type1, 1]} />
        <meshPhysicalMaterial color={colors[props.type0]} />
      </mesh>
      <Text3D
            key={props.type0}
            font="./fonts/helvetiker_regular.typeface.json"
            position={[((props.key * 2) - (props.type1 > 9 ? 0.8 : 0.4)), ((props.type1) + 1), active ? 0.5 : 0]}
          >
            {props.type1}
            <meshPhysicalMaterial color='white' />
          </Text3D>
      <Pokeball props={{color: colors[props.type0], scale: 0.6, position: [((props.key * 2)), (props.type1 + 3), active ? 0.5 : 0]}} />
    </mesh>
  }

  const GraphAxes = () => {
    return <mesh>
      <mesh
        position={[-2, 17, 0]}
        castShadow={true}
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
            <meshPhysicalMaterial color='white' />
          </Text3D>
        })}
      </mesh>
      <mesh
        position={[16.75, -0.25, 0]}
      >
        <planeGeometry args={[38, 0.5]} />
        <meshPhysicalMaterial color={'grey'} side={DoubleSide} />
      </mesh>
    </mesh>
  }

  const BarsByGeneration = () => {
    if (data) {
      return (
        <mesh key={''} position={[-15, -15, 0]}>
          <GraphAxes />
          {(Object.entries(data[generation][generation].types)).map((type, j) => {
            return <mesh key={type[0]}>
              <Text3D
                font="./fonts/helvetiker_regular.typeface.json"
                position={[(j * 2) - 0.5, -1.5, 0]}
                rotation={[0, 0, -1.5]}
                castShadow={true}
                scale={1.2}
              >
                {capitaliseFirstLetter(type[0])}
                <meshPhysicalMaterial color='white' />
              </Text3D>
              <Bar props={{ key: j, type0: type[0], type1: type[1] }} />

            </mesh>
          })}
        </mesh>
      )
    } else return <Text3D
    font="./fonts/helvetiker_regular.typeface.json"
    position={[(j * 2) - 0.5, -1.5, 0]}
    rotation={[0, 0, -1.5]}
    castShadow={true}
    scale={1.2}
  >
    Loading...
    <meshPhysicalMaterial color='white' />
  </Text3D>
  }

  const GenerationSelector = () => {
    return (
      <div className='my-2'>
        <div className='justify-center absolute top-8 left-1/2 -translate-x-1/2'>
          <h2>Select A Generation:</h2>
        </div>
        <div className='flex flex-row gap-4 justify-center my-2 absolute left-1/2 top-12 -translate-x-1/2 z-20'>
          {generations.map((gen, i) => {
            return <button className='underline' key={gen} onClick={() => setGeneration(i)}>{(i + 1)}</button>
          })}
        </div>
      </div>
    )
  }

  const Title = () => {
    return <h1 className='justify-center flex absolute top-2 left-1/2 -translate-x-1/2 z-20 text-center'>
      Pokemon type numbers
    </h1>
  }

  const GenerationHeader = () => {
    return <h1 className='justify-center flex absolute top-20 left-1/2 -translate-x-1/2 z-20 text-center'>{generations[generation]}</h1>
  }

  const PokemonList = () => {
    if (typeAndGeneration.length !== 0) {
      return (
        <div className='flex flex-row gap-2 flex-wrap justify-center flex absolute bottom-2 left-1/2 -translate-x-1/2 z-20 w-full'>
          {typeAndGeneration.map((pokemon) => {
            return <a className='underline' target='blank' href={`https://sparkly-selkie-21fcb9.netlify.app/pokemon/${pokemon}`} key={pokemon}>{pokemonNameFormatting(pokemon)}</a>
          })}
        </div>
      )
    } else {
      return <div className='flex flex-row gap-2 flex-wrap justify-center flex absolute bottom-2 left-1/2 -translate-x-1/2 z-20 w-full'>
        <p className='text-center'>Select a type to see the Pokemon added in this generation</p>
      </div>
    }
  }

  const Lights = () => {
    return <group>
      <ambientLight intensity={0.4} />
      <spotLight position={[15, 15, 40]} decay={0} />
    </group>
  }

  return (
    <main className="w-full h-full">
      <Title />
      <GenerationSelector />
      <GenerationHeader />
      <div className='z-10 w-full h-full'>
        <Canvas shadows>
          <PerspectiveCamera makeDefault fov={75} near={0.1} far={1000} position={[0, 0, 40]} />
          <Lights />
          <BarsByGeneration />
          <OrbitControls />
        </Canvas>
      </div>
      <PokemonList />
    </main>
  )
}
