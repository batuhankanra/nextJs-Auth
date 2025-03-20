import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function DELETE(req:Request) {
    try{
        const body=await req.json()
        if(!body.id || !body.parentId ){
            return NextResponse.json({msg:'Bad request'},{status:400})
        }
        const res=await prisma.category.findMany()
        
        const findCategory=res.map(x=>({parentId:x.parentId?.split('-'),id:x.id}))
        findCategory.map(async (x)=>{
            if(x.parentId[0]===body.parentId){
                await prisma.category.delete({
                    where:{
                        id:x.id
                    }
                })
            }
        })

        return NextResponse.json({msg:'Deleted Category'})
    }catch (err){
        return NextResponse.json({msg:err},{status:500})
    }
}