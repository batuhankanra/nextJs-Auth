import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { prisma } from "./prisma";


export default async  function getSession() {
    return await getServerSession(authOptions)
}


export async function getUserCurrent() {
    try{
        const session=await getSession()


        if(!session?.user?.email){
            return null
        }
        const currentUser=await prisma.user.findUnique({
            where:{
                email:session?.user.email
            },
            select:{
                id:true,
                name:true,
                email:true,
                createdAt:true,
                updatedAt:true,
                emailVerified:true,
                role:true
            }
        })
        if(!currentUser) return null

        return {
            id:currentUser.id,
            name:currentUser.name,
            email:currentUser.email,
            role:currentUser.role,
            createdAt:currentUser.createdAt.toISOString(),
            updatedAt:currentUser.updatedAt.toISOString(),
            emeilVerified:currentUser.emailVerified?.toISOString() || null
        }
    }catch (err :any){
        return null
    }
}