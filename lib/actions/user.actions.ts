'use server';

import { clerkClient } from "@clerk/nextjs/server";
import { parseStringify } from "../utils";
import { liveblocks } from "../liveblocks";

export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
    try {
      const clerk = await clerkClient();
  
      const { data } = await clerk.users.getUserList({
        emailAddress: userIds, 
      });
  
      const users = data.map((user: any) => ({
        id: user.id,
        name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
        email: user.emailAddresses?.[0]?.emailAddress ?? "",
        avatar: user.imageUrl,
      }));
  
      // Match by email, not ID now
      const sortedUsers = userIds.map((email) => {
        const user = users.find((user: { email: string }) => user.email === email);
        if (!user) {
          console.warn(`User with email ${email} not found`);
          return null;
        }
        return user;
      }).filter(Boolean); // remove nulls
  
      return sortedUsers;
    } catch (error) {
      console.error("Error fetching Clerk users:", error);
      return [];
    }
};

export const getDocumentUsers = async ({roomId, currentUser, text}: {roomId: string, currentUser: string, 
    text: string}) => {
    try {
        const room = await liveblocks.getRoom(roomId);
        const users = Object.keys(room.usersAccesses).filter((email) => email !== currentUser)  

        if (text.length) {
            const lowerCaseText = text.toLowerCase()

            const filteredUsers = users.filter((email) => email.toLowerCase().includes(lowerCaseText))

            return parseStringify(filteredUsers)
        }
        parseStringify(users)

        } catch (error) {
            console.log(`Error while fetching document Users: ${error}`);
        }
}

  
  
  