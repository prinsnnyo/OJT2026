import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';
import { TodosService } from './todos.service';
export declare class TodosController {
    private readonly todosService;
    constructor(todosService: TodosService);
    list(req: {
        user: {
            id: string;
        };
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        completed: boolean;
        userId: string;
    }[]>;
    create(req: {
        user: {
            id: string;
        };
    }, dto: CreateTodoDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        completed: boolean;
        userId: string;
    }>;
    update(req: {
        user: {
            id: string;
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
            id: string;
        };
    }, id: string): Promise<void>;
}
