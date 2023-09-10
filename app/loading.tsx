export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className='justify-center items-center flex min-h-screen'>
        <div className=''>
            <div>
                <img className='w-60 h-60' src='/mylogo.jpg' />
                <div className='flex my-5 justify-center items-end text-3xl font-semibold'>Sky Chat</div>
            </div>
            <div className='flex justify-center items-end font-semibold text-gray-600'>BY SKY INC</div>
            <div className='flex justify-center items-end font-semibold text-gray-600'>Akash</div>
        </div>
    </div>
}