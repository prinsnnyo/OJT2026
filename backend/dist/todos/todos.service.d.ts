import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';
export declare class TodosService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(userId: string): Promise<any>;
    create(userId: string, dto: CreateTodoDto): Promise<any>;
    update(userId: string, id: string, dto: UpdateTodoDto): Promise<any>;
    remove(userId: string, id: string): Promise<void>;
}
