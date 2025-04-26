import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { SignedIn, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import AddDocumentBtn from '@/components/AddDocumentBtn'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getDocuments } from '@/lib/actions/room.actions'
import Link from 'next/link'
import { dateConverter } from '@/lib/utils'
import { DeleteModal } from '@/components/DeleteModal'
import Notification from '@/components/Notification'

const Home = async () => {
  const clearkUser = await currentUser()
  if(!clearkUser) redirect('sign-in');

  const roomDocuments = await getDocuments(clearkUser.emailAddresses[0].emailAddress)

  return (
    <main className='relative flex min-h-screen w-full flex-col items-center gap-5 sm:gap-10'>
      <Header className="sticky left-0 top-0">
      <div className="flex item-centet gap-2 lg:gap-4">
        <Notification />
        <SignedIn>
          <UserButton />
        </SignedIn>

      </div>
      </Header>

      {roomDocuments.data.length > 0 ? (
        <div className='document-list-container'>
          <div className='document-list-title'>
            <h3 className='text-28-semibold'>All Documents</h3>
          <AddDocumentBtn 
            userId={clearkUser.id}
            email={clearkUser.emailAddresses[0].emailAddress}
            />
            </div>

          <ul className="document-ul">
            {roomDocuments.data.map(({id, metadata, createdAt}: any) => (
              <li key={id} className='document-list-item'>
                <Link href={`/documents/${id}`} className='flex flex-1 item-center gsp-4'>
                  <div className='hidden rounded-md bg-dark-500 p-2 sm:block'>
                    <Image 
                    src="/assets/icons/doc.svg" 
                    alt='File'
                    width={40}
                    height={40}
                     />
                     <div className='space-y-1'>
                        <p className="line-clamp-1 text-lg">{metadata.title}</p>
                        <p className="text-sm font-light text-blue-100">Created about {dateConverter(createdAt)}</p>
                     </div>
                  </div>
                </Link>
                <DeleteModal
                  roomId={id}
                />
              </li>
            ))}
          </ul>
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