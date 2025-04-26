import CollaborativeRoom from '@/components/CollaborativeRoom'
import { getDocument } from '@/lib/actions/room.actions'
import { getClerkUsers } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const Document = async (props: SearchParamProps) => {
  // Await the params first
  const params = await props.params;
  const id = params.id;
  
  const clerkUser =  await currentUser()
  if(!clerkUser) redirect('/sign-in');

  const room = await getDocument({
    roomId: id, 
    userId: clerkUser.emailAddresses[0].emailAddress
  })
  

  if(!room) redirect('/')

  const userIds = Object.keys(room.usersAccesses)

  
  const users = await getClerkUsers({ userIds });

  let usersData: { userType: string; id: string; name: string; email: string; avatar: string; color: string }[] | User[] | undefined = [];
  if (Array.isArray(users)) {
    usersData = users.map((user: User) => ({
      ...user,
      userType: room.usersAccesses[user.email]?.includes('room:write')
        ? 'editor'
        : 'viewer'
    }));
  } else {
    console.warn('No users found or invalid users data.');
  }


  const currentUserType = room.usersAccesses[clerkUser.emailAddresses[0].emailAddress]?.includes('room:write') 
  ? 'editor' : 'viewer';

  return (
    <main className='flex w-full flex-col items-center'>
      <CollaborativeRoom 
      roomId={id}
      roomMetadata={room.metadata}
      users={usersData}
      currentUserType={currentUserType}
      />
    </main>


  )
}

export default Document