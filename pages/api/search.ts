import type { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/libs/prismadb';  // Import Prisma Client

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { genre, title, duration } = req.query;

  try {
    // Kiểm tra và xử lý các tham số đầu vào để đảm bảo là kiểu string
    const genreStr = Array.isArray(genre) ? genre[0] : genre || '';
    const titleStr = Array.isArray(title) ? title[0] : title || '';
    const durationStr = Array.isArray(duration) ? duration[0] : duration || '';

    // Tìm kiếm các bộ phim từ cơ sở dữ liệu sử dụng Prisma
    const movies = await prismadb.movie.findMany({
      where: {
        genre: {
          contains: genreStr,  // Sử dụng giá trị genre đã xử lý
          mode: 'insensitive',  // Tìm kiếm không phân biệt chữ hoa chữ thường
        },
        title: {
          contains: titleStr,  // Sử dụng giá trị title đã xử lý
          mode: 'insensitive',
        },
        duration: {
          contains: durationStr,  // Sử dụng giá trị duration đã xử lý
          mode: 'insensitive',
        },
      },
    });

    res.status(200).json(movies);  // Trả về kết quả tìm kiếm
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}