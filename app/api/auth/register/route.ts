import { NextResponse } from "next/server";
import {prisma} from '@/lib/prisma'
import bcrypt from 'bcrypt'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export async function POST(request:Request) {
    try{
        const body=await request.json()
        const {name,email,password}=body
        if(!email || !password){
            return NextResponse.json({msg:'email password bos olamaz'},{status:400})
        }
       
        if(!emailRegex.test(email)){
            return NextResponse.json({msg:'email hatali',},{status:400})
        }
        if(!passwordRegex.test(password)){
            return NextResponse.json({msg:'parola hatali'},{status:400})
        }
        const exists=await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(exists){
            return NextResponse.json({msg:'boyle bir email var'},{status:400})
        }
        
        const hashedPassword= bcrypt.hashSync(password,10)

        const user =await prisma.user.create({
            data:{
                name,
                email,
                hashedPassword,
            }
        })
        
       return NextResponse.json({msg:'kayit basarili',user })

    }catch (err){
        
    }
}