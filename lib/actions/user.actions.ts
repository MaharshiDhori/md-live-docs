'use server';

import { clerkClient } from "@clerk/nextjs/server";
import { parseStringify } from "../utils";

export const getClerkUsers = async ({ userIds } : {userIds: string[]}) => {
    try {
        const { data } = await clerkClient.users.getUserList({
            emailAddress: userIds,
        })

        const users = data.map((user: { id: any; firstName: any; lastName: any; imageUrl: any; })=>({
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: users.emailAddresses[0].emailAddress,
            avatar: user.imageUrl,
        }))

        const sortedUser = userIds.map((email) => users.find((user: { email: string; })=>{
            return user.email === email
        }))

        return parseStringify(sortedUser);
    } catch (error) {
        console.log(error)
    }
}