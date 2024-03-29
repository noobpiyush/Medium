import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user) {
        c.set("userId", user.id);
        await next();
    } else {
        c.status(403);
      return  c.json({
            msg: "you are not logged in"
        })
    }
    
   } catch (error) {
        c.status(411);
      return  c.json({
            message: "error while authenticating"
        })
   }

})

blogRouter.post('/', async (c) => {

    const body = await c.req.json();
    const authorId = c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId
        }
    })


    return c.json({
        id: post.id
    })
})

blogRouter.put('/update', async (c) => {
    const userId = c.get("userId")
    const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const post = await prisma.post.update({
        where: {
            id: body.id,
            authorId:userId
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })


    return c.text('updated posy')
});

blogRouter.get('/bulk', async (c) => {

    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,

        }).$extends(withAccelerate());

        const blogs = await prisma.post.findMany({
            select:{
                content:true,
                title:true,
                id:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        });

        return c.json({
            blogs
        })

    } catch (error) {
        console.log(error);

        return c.json({
            msg: "error"
        })
    }
})

blogRouter.get('/:id', async (c) => {
    try {
        
        const id = c.req.param("id");

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        const blog = await prisma.post.findUnique({
            where: {
                id
            }, 
            select:{
                id:true,
                title:true,
                content:true,
                author:{
                   select:{
                     name:true
                   }
                }
            }
        })


        return c.json({
            blog
        })

    } catch (error) {
        return c.json({
            msg: "erroe while fetching"
        })
    }
})




