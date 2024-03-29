import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
// import {signupInput} from "@piyushnoob/medium-common"

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

userRouter.post('/signup', async (c) => {

    try {

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        const body = await c.req.json();




        const user = await prisma.user.create({
            data: {
                username: body.username,
                password: body.password,
                name: body.name
            }
        })
        const token = await sign({ id: user.id }, c.env.JWT_SECRET);

        return c.json({
            token: token
        })

    } catch (error) {
        return c.json({
            error
        })
    }
})

userRouter.post('/signin', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();

    try {

        const user = await prisma.user.findUnique({
            where: {
                username: body.username,
                password: body.password,
            }
        })

        if (!user) {
            c.status(411)
            return c.json({
                msg: "the user does not exists"
            })
        }
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({
            jwt
        })


    } catch (error) {
        c.status(411);

        return c.json({
            error: "Internal server error"
        })
    }
})