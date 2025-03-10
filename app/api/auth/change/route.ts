import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import {prisma} from '@/lib/prisma'


export  async  function POST(request:Request){
    try{
        const session=await getServerSession(authOptions)
        if(!session || !session.user?.email){
            return NextResponse.json({msg:'yetkisiz islem'},{status:401})
        }
        const {oldPassword,newPassword}=await request.json()
        if(!oldPassword || !newPassword){
            return NextResponse.json({msg:'Parola bos gelemez'},{status:400})
        }

        const user =await prisma.user.findUnique({
            where:{
                email:session.user.email
            }
        })
        if(!user){
            return NextResponse.json({msg:'giris bilgiler hatali'},{status:400})
        }
        
        const comparePassword= bcrypt.compareSync(oldPassword,user.hashedPassword)
        if(!comparePassword){
            return NextResponse.json({msg:'Parola hatali'},{status:400})
        }
        const hashedPassword= bcrypt.hashSync(newPassword,10)

        await prisma.user.update({
            where:{
                email:user.email
            },
            data:{
                hashedPassword:hashedPassword
            }
        })
        return NextResponse.json({msg:'sifreniz guncellendi'},{status:200})





    }catch (err){
        return NextResponse.json({msg:'server not reached'})
    }
}
