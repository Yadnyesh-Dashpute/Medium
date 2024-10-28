import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createBlogInput, updateBlogInput } from '@yadnyesh-dashpute/common';
import { Hono } from 'hono';
import { decode, sign, verify } from 'hono/jwt';


export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	},
    Variables: {
        userId: string;
    }
}>();


blogRouter.use('/*', async (c,next) => {
  // get the header 
  // verify the header
  // if the header is correct we need to proceed
  // if not, we return 403 status code
  
  const authheader = c.req.header("authorization") || "";

  const user = await verify(authheader, c.env.JWT_SECRET)

  if(user){
    c.set("userId",user.id);
   await next();
  }else{
    c.status(403);
    return c.json({message:"Unauthorized"})
  }

})


blogRouter.post("/", async (c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);

    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
  
   const blog =  await prisma.post.create({
        data: {
            title:body.title,
            content:body.content,
            authorId: authorId
        }
    })

    return c.json({
        id: blog.id
    })
  })

  
  
  blogRouter.put("/", async (c) => {

    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.update({
        where: {
            id: body.authorId,
        },
        data: {
            title: body.title,
            content: body.content
        }
    })

    return c.json({
        id: blog.id
    })

  })

  blogRouter.get("/bulk", async (c) => {
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const blog = await prisma.post.findMany();


    return c.json({
        blog
    })

  })
  
  blogRouter.get("/:id",async (c) => {

    const id = c.req.param("id");
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try{

    const blog = await prisma.post.findFirst({
        where: {
            id: id
        },     
    })
    return c.json({
        blog
    })
}
    catch(e){
        c.status(411);
        return c.json({
            message: "Error while Fetching blog Post"
        })
    }
  
  
  })
  
 
  