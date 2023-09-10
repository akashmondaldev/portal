/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FieldValues, RegisterOptions, SubmitHandler, UseFormRegisterReturn, useForm } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs"
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';
import Button from '@/components/Button/Button';
import AuthSocialButton from '@/components/Button/AuthSocialButton';
import { Typography } from '../Material';
import { LoginFireBase, RegisterFireBase } from '../../services/firebase/auth';

import routesName from '@/routes';
import { GetToken } from '@/functions/localData';

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isAvatar, setIsAvatar] = useState<File>()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER")
    } else {
      setVariant("LOGIN")
    }
  }, [variant])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      bio: "",
      avatar: "",
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true)

    if (variant === 'REGISTER') {
      const newData = { ...data, avatar: isAvatar }
      RegisterFireBase(newData)
        .then((data) => {
          if (data?.status === 400) {
            toast.error(data.message)
          }
        })
        .catch(() => {
          toast.error("Something went wrong!")
        }).finally(() => {
          setLoading(false)
        })
    }

    if (variant === "LOGIN") {
      LoginFireBase({ email: data.email, password: data.password })
        .then((data) => {
          if (data?.status === 400) {
            toast.error(data.message)
          }
        })
        .catch(() => {
          toast.error("Something went wrong!")
        }).finally(() => {
          setLoading(false)
        })
    }
  }
  useEffect(() => {
    const token = GetToken()
    if (token) {
      router.replace(routesName.home)
    }
  }, [router, loading])

  return (
    <React.Fragment>
      <div className="h-screen items-center justify-center flex">
        <div
          className="
          bg-white
            px-4
            py-8
            sm:rounded-lg
            sm:px-10
            w-[500px]
            h-[500px]
          "
        >
          <form id='auth' name='auth' className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h1">Chat {variant === "REGISTER" ? "Register" : "Login"}</Typography>
            {variant === "REGISTER" && (<>
              {/* upload photo */}
              <div className='flex items-center gap-4'>
                <div className='mt-1 flex items-center'>
                  {isAvatar ? <label htmlFor='myImage'>
                    <img className='w-16 h-16 rounded-full object-cover'
                      alt="not found"
                      src={URL.createObjectURL(isAvatar)} />
                  </label>
                    : <span className='inline-block h-16 w-16 rounded-full overflow-hidden bg-gray-100 p-1'>
                      <svg className='h-full w-full text-gray-300' fill='currentColor' viewBox='0 0 24 24'>
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M12 14c2.21 0 4-1.79 4-4 0-2.21-1.79-4-4-4-2.21 0-4 1.79-4 4 0 2.21 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z'
                        />
                      </svg>
                    </span>}
                </div>
                {
                  isAvatar ? <div onClick={() => setIsAvatar(undefined)} className='sm:cursor-pointer border-[1px] border-red-300
                  px-4 py-2 rounded-full font-semibold text-red-400'>
                    Remove
                  </div> :
                    <label htmlFor='myImage' className='sm:cursor-pointer font-semibold
                    border-[1px] px-5 py-2 rounded-full hover:bg-gray-300 bg-gray-200'>
                      Upload
                    </label>
                }
              </div>
              <Input
                label='name'
                id='name'
                type='name'
                register={register}
                disabled={loading}
                errors={errors} />
            </>)}

            <Input
              label='email'
              id='email'
              type='email'
              register={register}
              disabled={loading}
              errors={errors} />
            <Input
              label='password'
              id='password'
              type="password"
              register={register}
              disabled={loading}
              errors={errors} />
            <div>
              <Button
                disabled={loading}
                fullWidth
                type='submit'
              >{variant === "LOGIN" ? "Sign in" : "Register"}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute 
                  inset-0 
                  flex 
                  items-center
                "
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <AuthSocialButton
                icon={BsGithub}
                onClick={() => { }}
              />
              <AuthSocialButton
                icon={BsGoogle}
                onClick={() => { }}
              />
            </div>
          </div>
          <div
            className="
              flex 
              gap-2 
              justify-center 
              text-sm 
              mt-6 
              px-2 
              text-gray-500
            "
          >
            <div>
              {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
            </div>
            <div
              onClick={toggleVariant}
              className="underline sm:cursor-pointer"
            >
              {variant === 'LOGIN' ? 'Create an account' : 'Login'}
            </div>
          </div>
        </div>
        <input
          multiple
          className='hidden'
          type="file"
          name="myImage"
          id="myImage"
          onChange={(event: any) => setIsAvatar(event.target.files[0])}
        />
      </div>
    </React.Fragment>
  )
}

export default AuthForm