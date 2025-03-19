import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function DELETE(req:Request) {
    try{
        const body=await req.json()
        if(!body.id){
            return NextResponse.json({msg:'Bad request'},{status:400})
        }
        
        await prisma.category.delete({
            where:{id:body.id}
        })

        return NextResponse.json({msg:'Deleted Category'})
    }catch (err){
        return NextResponse.json({msg:err},{status:500})
    }
}