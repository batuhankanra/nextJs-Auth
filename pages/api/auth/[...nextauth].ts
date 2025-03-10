import NextAuth, { AuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import {prisma} from '@/lib/prisma'
import bcrypt from 'bcrypt'


export const authOptions:AuthOptions ={
    adapter:PrismaAdapter(prisma),
    providers:[
        CredentialsProvider({
            credentials:{
                email:{},
                password:{}
            },
            authorize:async (credential)=>{
                let user =null
                if(!credential?.email || !credential?.password ) throw new Error('email yada parola hatali')
                user=await prisma.user.findUnique({
                    where:{
                        email:credential.email
                    }
                })
                if(!user){
                    throw new Error('email hatali')
                }
                const passwordExist= await bcrypt.compareSync(credential.password,user.hashedPassword)
                if(!passwordExist){
                    throw new Error('Parola hatali')
                }
                return user
            }
        })
    ],
    session:{
        strategy:'jwt'
    },
    callbacks:{
        async jwt({token,user}){
            if(user){
                token.id=user.id
            }
            return token
        }
    },
    pages:{
        signIn:'/login'
    },
    debug:process.env.NODE_ENV==='development',
    secret:'sakldjasldjkl'
}

export default NextAuth(authOptions) 