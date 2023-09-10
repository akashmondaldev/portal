/* eslint-disable @next/next/no-img-element */
import { Typography } from '@/app/Material';
import useConversation from '@/hooks/states/useConversation';
import { Conversation } from '@/interfaces/Conversation';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface GroupCardProps {
    conversation: Conversation
    right?: React.ReactNode
}
const GroupCard: FC<GroupCardProps> = ({
    conversation, right
}) => {
    const router = useRouter()
    const currentConversation = useConversation()
    // if (currentConversation.conversationData.isGroup) {
    const {
        group
    } = conversation

    const conversationHandle = () => {
        currentConversation.setConversationData(conversation)
        router.push(`/${conversation.id}`)
    }
    return (
        <>
            <div onClick={conversationHandle} className='sm:cursor-pointer
             flex justify-between items-center py-3 px-2 rounded-xl hover:bg-gray-100'>
                <div className='flex justify-between items-center'>
                    <div className='mx-2'>
                        <img className='w-14 h-14 rounded-full object-cover border-[1px]'
                            alt="not found"
                            src={group?.groupImage || "/noGroup.png"} />
                    </div>
                    <div>
                        <Typography variant="h6" color="blue-gray">
                            {group?.groupName}
                        </Typography>
                        {/* <Typography variant="small" color="gray" className="font-normal">
                            {}
                        </Typography> */}
                    </div>
                </div>
                <div className='flex gap-1'>
                    {right}
                </div>
            </div>
        </>
    );
};

export default GroupCard;