'use client'

import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { signIn } from 'next-auth/react'
import {FcGoogle} from "react-icons/fc"
import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import  { 
  FieldValues,
  SubmitHandler,
  useForm
} from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModel'
import useLoginModal from '@/app/hooks/useLoginModal'

import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/input'
import Button from '../Button'


const RegisterModal = () => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const[isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues:{
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios.post('/api/register', data)
      .then(() => {
        toast.success('Sucesso')
        registerModal.onClose()
        loginModal.onOpen()
      })
      .catch((error)=> {
        toast.error('ops... Algo deu errado!')
      })
      .finally(()=> {
        setIsLoading(false)
      })
  }

  const toggle = useCallback(()=> {
    registerModal.onClose();
    loginModal.onOpen()
  },[loginModal, registerModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading 
        title="Bem-vindo ao Airbnb"
        subtitle="Crie sua conta!"
      />
      <Input 
        id="email"
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input 
        id="name"
        label='Nome'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input 
        id="password"
        type='password'
        label='Sua senha'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent  = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button 
        outline
        label="Continue com o Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button 
        outline
        label="Continue com o Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div 
        className="
          text-neutral-500
          text-center
          mt-4
          font-light
        "
      >
        <div 
          className="
            justify-center flex flex-row items-center gap-2"
          >
          <div>
            Você ja possui uma conta?
          </div>
          <div
            onClick={toggle}
            className="
              text-neutral-800
              cursor-pointer
              hover:underline
            "
          >
            Entrar
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal 
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Registro'
      actionLabel='Continue'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
};

export default RegisterModal