'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { BtnInstagram } from '../Button/Button'

interface ModalProps {
    isOpen?: boolean
    onClose: () => void
    onSubmit: () => void
    title?: string
    body?: React.ReactElement
    footer?: React.ReactElement
    actionLabel?: string
    disabled?: boolean
    secondaryAction?: () => void
    secondaryActionLabel?: string
}

const Modal = ({
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel,
    onSubmit,
    onClose,
    isOpen
}: ModalProps) => {

    const [showModal, setShowModal] = useState(isOpen)

    useEffect(() => {
        setShowModal(isOpen)
    }, [isOpen])

    const handleClose = useCallback(() => {
        if (disabled) {
            return
        }
        setShowModal(false)
        setTimeout(() => {
            onClose()
        }, 300)
    }, [disabled, onClose])

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return
        }
        onSubmit()

    }, [disabled, onSubmit])

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return
        }
        secondaryAction()
    }, [disabled, secondaryAction])

    if (!isOpen) {
        return null
    }

    return (
        <div className='
    justify-center
    items-center
    flex
    overflow-x-hidden
    overflow-y-auto
    fixed
    inset-0
    z-50
    outline-none
    focus:outline-none
    bg-gray-900 bg-opacity-70
    '>
            <div className='
      relative
      w-full 
      md:w-4/6 
      lg:w-3/6 
      xl:w-2/5 
      my-6
      lg:h-auto
      md:h-auto
      mx-10
      '>
                {/*content*/}
                <div className={`
        translate
        duration-300
        full
        ${showModal ? 'opacity-100' : 'opacity-0'}
        ${showModal ? 'translate-y-0' : 'translate-y-full'}
        `}>
                    {/*body*/}
                    <div className='
          translate
          h-full
          lg:h-auto
          md:h-auto
          border-0
          rounded-3xl
          shadow-lg
          flex
          flex-col
          w-full
          bg-white
          outline-none
          focus:outline-none
          '>
                        {/*header*/}
                        <div className='
            flex
            items-center
            p-6
            justify-between
            relative
            '>
                            <div> </div>
                            <h3 className='
              text-2xl
              font-semibold
              text-center
              text-neutral-700
              '>
                                {title}
                            </h3>
                            <button
                                onClick={handleClose}
                                className='
              p-1
              border-0
              hover:opacity-70
              transition
              left-9'>
                                <IoMdClose size={24} />
                            </button>
                        </div>
                        {/*body*/}
                        <div className='
            relative
            px-2
            flex-auto
            '>

                            {body}

                        </div>
                        {/*footer*/}
                        <div className='flex flex-col gap-2 p-6'>
                            <div className='flex flex-row items-center gap-4 w-full'>
                                {secondaryAction && secondaryActionLabel && (
                                    <BtnInstagram disabled={disabled}
                                        onClick={handleSecondaryAction}
                                        label={secondaryActionLabel}
                                    ></BtnInstagram>)
                                }


                                {actionLabel && <BtnInstagram disabled={disabled}
                                    onClick={handleSubmit}
                                    label={actionLabel}
                                >{actionLabel}</BtnInstagram>}
                            </div>
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal