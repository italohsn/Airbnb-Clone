'use client'

import Container from "../Container"

import { IoDiamond} from 'react-icons/io5'
import { BsSnow } from 'react-icons/bs'
import { FaSkiing } from 'react-icons/fa'
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiCutDiamond, GiForestCamp, GiIsland, GiWindmill} from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import CategoryBox from "../CategoryBox"
import { usePathname, useSearchParams } from "next/navigation"

export const categories = [
  {
    label: 'Praia',
    icon: TbBeach,
    description: 'Em frente à praia!'
  },
  {
    label: 'Moinhos',
    icon: GiWindmill,
    description: 'Está propriedade é um Moinho!'
  },
  {
    label: 'Design',
    icon: MdOutlineVilla,
    description: 'Uma propriedade morderna!'
  },
  {
    label: 'No interior',
    icon: TbMountain,
    description: 'Propriedade localizada no interior!'
  },
  {
    label: 'Piscinas incríveis',
    icon: TbPool,
    description: 'Está propriedade tem piscinas!'
  },
  {
    label: 'Ilhas',
    icon: GiIsland,
    description: 'Propriedade  localizada em uma ilha!'
  },
  {
    label: 'Lago',
    icon: GiBoatFishing,
    description: 'Propriedade localizada na beira de um lago!'
  },
  {
    label: 'Esqui',
    icon: FaSkiing,
    description: 'Está propriedade tem atividades para esquiar!'
  },
  {
    label: 'Castelos',
    icon: GiCastle,
    description: 'Está propriedade é um castelo!'
  },
  {
    label: 'Acampamento',
    icon: GiForestCamp,
    description: 'Está propriedade tem atividades de acampamento!'
  },
  {
    label: 'Ártico',
    icon: BsSnow,
    description: 'Propriedade localizada no Ártico!'
  },
  {
    label: 'Grutas',
    icon: GiCaveEntrance,
    description: 'Está propriedade está dentro de uma Gruta!'
  },
  {
    label: 'Deserto',
    icon: GiCactus,
    description: 'Está propriedade está localizada no deserto!'
  },
  {
    label: 'Luxes',
    icon: IoDiamond,
    description: 'Está é uma propriedade de luxo!'
  },
]

const Categories = () => {
  const params = useSearchParams()
  const category = params?.get('category')
  const pathname = usePathname();

  const isMainPage = pathname === '/'

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex
          flex-row
          items-center
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item)=> (
          <CategoryBox 
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}        
      </div>
    </Container>
  )
}

export default Categories