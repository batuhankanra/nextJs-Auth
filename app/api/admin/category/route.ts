"use server"

import { getUserCurrent } from '@/lib/action'
import {prisma} from '@/lib/prisma'
import { NextResponse } from 'next/server'





export async function POST(req:Request) {
    try{
        const session=await getUserCurrent()
        if(session?.role != "ADMIN"){
            return NextResponse.json({msg:'unauthorized access',user:session},{status:401})
        }
        const body=await req.json()
        if(!body.name){
            return NextResponse.json({msg:'invalid'})
        }
        const categories=await prisma.category.findMany()
        
        if(!body.parentId){
            let newParentInt=(categories.filter(cat=>!cat.parentId?.includes('-')).length+1).toString()
            
            await prisma.category.create({
                data:{
                    name:body.name,
                    parentId:newParentInt,
                    userId:session.id
                }
            })
            return NextResponse.json({msg:'Category created'},{status:200})

        }else{
            const categoriesT=categories.map(m=>m.parentId?.split('-')[0]).filter((m)=>m==body.parentId).length
            const newCatParent=`${body.parentId}-${categoriesT}`
            await prisma.category.create({
                data:{
                    name:body.name,
                    parentId:newCatParent,
                    userId:session.id
                }
    
            })
            return NextResponse.json({msg:'Category created'},{status:200})
        }

        


        
    }catch (err){
        return NextResponse.json({msg:'server is broken'},{status:500})
    }
}

