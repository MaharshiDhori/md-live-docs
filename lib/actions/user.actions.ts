'use server';

import { clerkClient } from "@clerk/nextjs/server";
import { parseStringify } from "../utils";

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
  
  
  