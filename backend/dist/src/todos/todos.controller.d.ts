import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';
import { TodosService } from './todos.service';
export declare class TodosController {
    private readonly todosService;
    constructor(todosService: TodosService);
    findAll(req: {
        user: {
            userId: string;
        };
    }): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        completed: boolean;
        userId: string;
    }[]>;
    findOne(req: {
        user: {
            userId: string;
        };
    }, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        completed: boolean;
        userId: string;
    }>;
    create(req: {
        user: {
            userId: string;
        };
    }, dto: CreateTodoDto): import("@prisma/client").Prisma.Prisma__TodoClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        completed: boolean;
        userId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(req: {
        user: {
            userId: string;
        };
    }, id: string, dto: UpdateTodoDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        completed: boolean;
        userId: string;
    }>;
    remove(req: {
        user: {
            userId: string;
        };
    }, id: string): Promise<void>;
}
