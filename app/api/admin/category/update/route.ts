import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function PUT(req:Request) {
    try{
        const body=await req.json()
        if(!body.id && !body.name){
            return NextResponse.json({msg:'bad request'},{status:400})
        }
        await prisma.category.update({
            where:{
                id:body.id
            },
            data:{
                name:body.name
            }
        })
        return NextResponse.json({msg:'update Successful '})
    }catch(err){
        return NextResponse.json(err)
    }
}