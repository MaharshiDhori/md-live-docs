'use client';
import Header from '@/components/Header'
import { Editor } from '@/components/editor/Editor'
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react'
import React from 'react'
import Loader from './Loader';
import ActiveCollaborators from './ActiveCollaborators';

const CollaborativeRoom = ( {roomId, roomMetadata} : CollaborativeRoomProps) => {

  return (
    <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={<Loader />}>
            <div className="collaborative-room">
            <Header>
        <div className='flex w-fit items-center justify-center gap-2'>
          <p className='min-w-[78px] border-none bg-transparent px-0 text-left text-base font-semibold leading-[24px] focus-visible:ring-0 focus-visible:ring-offset-0 disabled:text-black sm:text-xl md:text-center'>
            Share
          </p>
        </div>
          <div className='flex w-full flex-1 justify-end gap-2 sm:gap-3'>
            <ActiveCollaborators />
            <SignedOut>
                <SignInButton />
                {/* <SignUpButton /> */}
              </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

      </Header>
      <Editor />
            </div>
        </ClientSideSuspense>
    </RoomProvider>
  )
}

export default CollaborativeRoom