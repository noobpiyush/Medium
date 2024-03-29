import z from "zod";

export const signupInput = z.object({
    username:z.string().email(),
    password:z.string().min(6),
    name:z.string().optional()
})

export const signinInput = z.object({
    username:z.string().email(),
    password:z.string().min(6),
})

export const createPostInput = z.object({
    title:z.string(),
    content:z.string()
})

export const updatePostInput = z.object({
    title:z.string(),
    content:z.string()
})



export  type signupInput = z.infer<typeof signupInput>
export  type signinInput = z.infer<typeof signinInput>
export type CreatePostType = z.infer<typeof createPostInput>;
export type UpdatePostType = z.infer<typeof updatePostInput>;