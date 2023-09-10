'use client'
import LeftSideBar from '@/app/(home)/components/Tabs';
import { FC } from 'react';

interface HomeProps { }
const Home: FC<HomeProps> = () => {
    return (
        <>
            <div className='md:flex w-full justify-center items-center min-h-screen hidden'>
            <div className=''>
            <div>
                <img className='w-60 h-60' src='/mylogo.jpg' />
                <div className='flex my-5 justify-center items-end text-3xl font-semibold'>Sky Chat</div>
            </div>
            <div className='flex justify-center items-end font-semibold text-gray-600'>BY SKY INC</div>
            <div className='flex justify-center items-end font-semibold text-gray-600'>Akash</div>
        </div>
            </div>
            <div className='md:hidden flex w-full justify-between'>
                <LeftSideBar />
            </div>
        </>
    );
};

export default Home;