import { clerkClient } from '@clerk/nextjs/server';
import { db } from '../db';

export const getUserByClerkId = async (id: string) => {
    // Fetch user from your database
    const dbUser = await db.user.findFirst({ where: { clerkId: id } });

    if (dbUser) {
        return dbUser;
    }

    // If the user is found in your database, fetch additional details from Clerk
    const clerkUser = await clerkClient.users.getUser(id);

    //create user
    const result = await db.user.create({
        data: {
            name: clerkUser.fullName ?? "No Name",
            clerkId: id
        }
    })

    // Return null or handle the case where the user is not found in your database
    return result;
}
