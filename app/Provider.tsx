'use client';
import React, { ReactNode } from 'react'
import { LiveblocksProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import Loader from '@/components/Loader';
import { getClerkUsers, getDocumentUsers } from '@/lib/actions/user.actions';
import { useUser } from '@clerk/nextjs';
import { getUserColor } from '@/lib/utils';

const Provider = ({children}: {children: ReactNode}) => {
  const {user: clerkUser} =  useUser()
  if (!clerkUser || !clerkUser.emailAddresses?.length) {
    return <Loader />; // or handle missing email properly
  }

  const currentUserEmail = clerkUser.emailAddresses[0].emailAddress;

  return (
    <LiveblocksProvider 
    authEndpoint="/api/liveblocks-auth"
    resolveUsers={async ({ userIds }) => {
      const users = await getClerkUsers({ userIds});
      return users.map(user => user ? {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        color: getUserColor(user.id),
      } : undefined);
    }}
    
    resolveMentionSuggestions={async ({text, roomId}) => {
      const roomUsers = await getDocumentUsers({
        roomId, 
        currentUser: currentUserEmail,
        text
      })
      return roomUsers;
    }}


    >
    
      <ClientSideSuspense fallback={<Loader />}>
        {children}
      </ClientSideSuspense>
    
  </LiveblocksProvider>
  )
}

export default Provider