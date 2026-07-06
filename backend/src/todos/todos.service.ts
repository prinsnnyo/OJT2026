import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto, QueryTodoDto, UpdateTodoDto } from './dto/todo.dto';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string, query: QueryTodoDto) {
    const { page = 1, limit = 10, search, completed } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.TodoWhereInput = { userId };

    if (completed !== undefined) {
      where.completed = completed;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.todo.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.todo.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(userId: string, id: string) {
    const todo = await this.prisma.todo.findFirst({
      where: { id, userId },
    });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }

  create(userId: string, dto: CreateTodoDto) {
    return this.prisma.todo.create({
      data: {
        title: dto.title,
        description: dto.description,
        userId,
      },
    });
  }

  async update(userId: string, id: string, dto: UpdateTodoDto) {
    await this.findOne(userId, id);

    return this.prisma.todo.update({
      where: { id },
      data: dto,
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);

    await this.prisma.todo.delete({ where: { id } });
  }

  async getStats(userId: string) {
    const [total, completed] = await Promise.all([
      this.prisma.todo.count({ where: { userId } }),
      this.prisma.todo.count({ where: { userId, completed: true } }),
    ]);

    return {
      total,
      completed,
      pending: total - completed,
    };
  }
}

