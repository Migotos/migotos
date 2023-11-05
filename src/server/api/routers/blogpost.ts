import { Role } from "@prisma/client";
import { addHours } from "date-fns";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const blogpostRouter = createTRPCRouter({
  createBlogPost: protectedProcedure
    .input(
      z.object({
        title: z
          .string()
          .min(5, { message: "Title must be atleast 5 characters long." })
          .max(255, {
            message: "Title must be less than 255 characters long.",
          }),
        body: z
          .string()
          .min(5, { message: "Body must be atleast 5 characters long." })
          .max(2000, {
            message: "Body must be less than 2000 characters long.",
          }),
        post_date: z
          .date()
          .max(addHours(new Date(), 4), {
            message: "Date cannot be in the future.",
          }),
        image_url: z
          .string()
          .url({ message: "Image URL must be a valid URL." })
          .nullable(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.role !== Role.ADMIN) {
        return { success: false, msg: "You are not an admin" };
      }

      const blogpost = await db.blogPost.create({
        data: {
          title: input.title,
          body: input.body,
          post_date: input.post_date,
          image_url: input.image_url,
        },
      });
      return blogpost;
    }),
  deleteBlogPost: protectedProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.role !== Role.ADMIN) {
        return { success: false, msg: "You are not an admin" };
      }

      const blogpost = await db.blogPost.findUnique({
        where: {
          id: input,
        },
      });
      if (!blogpost) {
        return { success: false, msg: "Blogpost not found" };
      }
      const deletedBlogPost = await db.blogPost.delete({
        where: {
          id: input,
        },
      });
      return { success: true, deletedBlogPost };
    }),
  updateBlogPost: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z
          .string()
          .min(5, { message: "Title must be atleast 5 characters long." })
          .max(255, {
            message: "Title must be less than 255 characters long.",
          }),
        body: z
          .string()
          .min(5, { message: "Body must be atleast 5 characters long." })
          .max(2000, {
            message: "Body must be less than 2000 characters long.",
          }),
        post_date: z
          .date()
          .max(addHours(new Date(), 4), {
            message: "Date cannot be in the future.",
          }),
        image_url: z
          .string()
          .url({ message: "Image URL must be a valid URL." })
          .nullable(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.role !== Role.ADMIN) {
        return { success: false, msg: "You are not an admin" };
      }

      const blogpost = await db.blogPost.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!blogpost) {
        return { success: false, msg: "Blogpost not found" };
      }
      const updatedBlogPost = await db.blogPost.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          body: input.body,
          post_date: input.post_date,
          image_url: input.image_url,
        },
      });
      return updatedBlogPost;
    }),
});
