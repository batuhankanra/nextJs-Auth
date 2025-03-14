import { getUserCurrent } from '@/lib/action'
import {prisma} from '@/lib/prisma'
import { NextResponse } from 'next/server'



export async function GET(){
    try{
        const category =await prisma.category.findMany()
        return NextResponse.json(category,{status:200})
    }catch (err){
        return NextResponse.json({msg:err},{status:500})
    }
}

export async function POST(req:Request) {
    try{
        const session=await getUserCurrent()
        if(session?.role != "ADMIN"){
            return NextResponse.json({msg:'unauthorized access',user:session},{status:401})
        }
        const body=await req.json()
        if(!body.name&& !body.parentId ){
            return NextResponse.json({msg:'invalid'})
        }
        await prisma.category.create({
            data:{
                name:body.name,
                parentId:body.parentId,
                userId:session.id
            }

        })
        return NextResponse.json({msg:'Category created'},{status:200})


        
    }catch (err){
        return NextResponse.json({msg:err},{status:500})
    }
}

