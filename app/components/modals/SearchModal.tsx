'use client'

import { formatISO } from "date-fns";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import { Range } from "react-date-range"
import dynamic from "next/dynamic"

import Modal from "./Modal"
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect"
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

import useSearchModal from "@/app/hooks/useSearchModal"


enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2
}

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [location, setLocation] = useState<CountrySelectValue>()
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false,
  }), [location]);

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  },[])

  const onNext = useCallback(() => {
    setStep((value) => value + 1)
  },[])
  
  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext()
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount
    }

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate)
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate)
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true})

    setStep(STEPS.LOCATION);
    searchModal.onClose();

    router.push(url)
  },
  [
    step,
    searchModal,
    location,
    router,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
    onNext,
    params
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Pesquisar'
    }

    return 'Próximo'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if ( step === STEPS.LOCATION) {
      return undefined
    }

    return 'Voltar'
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading 
        title="Aonde você quer ir?"
        subtitle="Encontre o local perfeito!"
      />
      <CountrySelect 
        value={location}
        onChange={(value) => 
          setLocation(value as CountrySelectValue)
        }
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  ) 
  
  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="Quando você planeja viajar?"
          subtitle="Certifique-se de que todos estão livres!"
        />
        <Calendar 
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="Mais informações"
          subtitle="Encontre o seu lugar perfeito!"
        />
        <Counter 
          title="Convidados"
          subtitle="Quantos convidados estão vindo?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter 
          title="Quartos"
          subtitle="Quantos quartos você precisa?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter 
          title="Banheiros"
          subtitle="Quantos banheiros você precisa?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    )
  }

  return (
    <Modal 
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filtros"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body= {bodyContent}    
   />
  )
}


export default SearchModal