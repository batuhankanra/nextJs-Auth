


import { getUserCurrent } from '@/lib/action'
import {prisma} from '@/lib/prisma'
import { NextResponse } from 'next/server'


export async function GET(){
    try{
        
        
        const category =await prisma.category.findMany({
            include:{
                user:{
                    select:{
                        name:true
                    }
                }
            }
        })
        
        return NextResponse.json(category,{status:200})
    }catch (err){
        return NextResponse.json({msg:err},{status:500})
    }
}