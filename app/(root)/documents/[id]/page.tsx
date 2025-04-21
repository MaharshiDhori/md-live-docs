import CollaborativeRoom from '@/components/CollaborativeRoom'
import Header from '@/components/Header'
import { Editor } from '@/components/editor/Editor'
import { getDocument } from '@/lib/actions/room.actions'
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

type SearchParamProp = {
  params: {
    id: string;
  };
};

const Document = async (props: SearchParamProps) => {
  // Await the params first
  const params = await props.params;
  const id = params.id;
  
  const clearkUser =  await currentUser()
  if(!clearkUser) redirect('/sign-in');

  const room = await getDocument({
    roomId: id, 
    userId: clearkUser.emailAddresses[0].emailAddress
  })

  console.log("room: ",room);
  

  if(!room) redirect('/')

  //TODO: Assess the permissions of the user to access the document

  return (
    <main className='flex w-full flex-col items-center'>
      <CollaborativeRoom 
      roomId={id}
      roomMetadata={room.metadata}
      />
    </main>


  )
}

export default Document