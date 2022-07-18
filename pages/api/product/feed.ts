import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default async function feed (req, res) {
  if (req.method === 'GET') {
    const limit = 8
    const cursor = req.query.cursor ?? ''
    const cursorObj = cursor === '' ? undefined : { id: cursor as string }

    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: { name: true, email: true }
        }
      },
      skip: cursor !== '' ? 1 : 0,
      cursor: cursorObj,
      take: limit,
    })
    return res.json({ posts, nextId: posts.length === limit ? posts[limit - 1].id : undefined })
  }
}