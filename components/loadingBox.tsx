import React from 'react'
import { GoPeople } from 'react-icons/go'

interface LoadingBoxProps {
  className: string
}
const LoadingBox: React.FC<LoadingBoxProps> = ({ className }) => {
  return <>
    <div className={className}>
      <div className='sm:cursor-pointer flex justify-between items-center py-3 px-2 rounded-xl hover:bg-gray-100'>
        <div className='flex justify-between items-center'>
          <div className='mx-2'>
            <div className='w-14 h-14 bg-gray-300 rounded-full'></div>
          </div>
          <div>
            <div className='flex flex-col'>
              <div className='w-52 h-4 bg-gray-300 rounded mb-1'></div>
              <div className='w-28 h-4 bg-gray-300 rounded'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>

}

const CreateGroupBox: React.FC<LoadingBoxProps> = ({ className }) => {
  return <div className={className}>
    <div className='sm:cursor-pointer flex justify-between items-center py-3 px-2 rounded-xl hover:bg-gray-100'>
      <div className='flex justify-between items-center'>
        <div className='mx-2'>
          <div>
            <GoPeople size={55}
             className='bg-gray-300 rounded-full'/>
          </div>
        </div>
        <div>
          <div className='flex flex-col'>
            <div className='text-lg font-semibold'>
              New Group
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export {
  CreateGroupBox,
  LoadingBox
}