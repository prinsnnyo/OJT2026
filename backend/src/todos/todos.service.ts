import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  async list(userId: string) {
    return this.prisma.todo.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(userId: string, dto: CreateTodoDto) {
    return this.prisma.todo.create({
      data: {
        title: dto.title ?? '',
        description: dto.description ?? null,
        userId,
      },
    });
  }

  async update(userId: string, id: string, dto: UpdateTodoDto) {
    const existing = await this.prisma.todo.findFirst({ where: { id, userId } });

    if (!existing) {
      throw new NotFoundException('Todo not found');
    }

    return this.prisma.todo.update({
      where: { id },
      data: dto,
    });
  }

  async remove(userId: string, id: string) {
    const existing = await this.prisma.todo.findFirst({ where: { id, userId } });

    if (!existing) {
      throw new NotFoundException('Todo not found');
    }

    await this.prisma.todo.delete({ where: { id } });
  }
}
