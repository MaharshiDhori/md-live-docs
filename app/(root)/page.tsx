import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { SignedIn, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import AddDocumentBtn from '@/components/AddDocumentBtn'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const Home = async () => {
  const clearkUser = await currentUser()
  if(!clearkUser) redirect('sign-in');

  const documents= [];
  return (
    <main className='relative flex min-h-screen w-full flex-col items-center gap-5 sm:gap-10'>
      <Header className="sticky left-0 top-0">
      <div className="flex item-centet gap-2 lg:gap-4">
        Notification
        <SignedIn>
          <UserButton />
        </SignedIn>

      </div>
      </Header>

      {documents.length > 0 ? (
        <div>
          
        </div>
      ): (
        <div className='flex w-full max-w-[730px] flex-col items-center justify-center gap-5 rxounded-lg bg-[#0B1527] bg-dark-200 px-10 py-8'>
          <Image
            src='/assets/icons/doc.svg'
            alt='Docunent'
            width={40}
            height={40}
            className='mx-auto'
          />
          
          <AddDocumentBtn 
          userId={clearkUser.id}
          email={clearkUser.emailAddresses[0].emailAddress}

          />
        </div>

        
      )} 

    </main>
  )
}

export default Home