import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';
import { TodosService } from './todos.service';
export declare class TodosController {
    private readonly todosService;
    constructor(todosService: TodosService);
    list(req: {
        user: {
            id: string;
        };
    }): Promise<any>;
    create(req: {
        user: {
            id: string;
        };
    }, dto: CreateTodoDto): Promise<any>;
    update(req: {
        user: {
            id: string;
        };
    }, id: string, dto: UpdateTodoDto): Promise<any>;
    remove(req: {
        user: {
            id: string;
        };
    }, id: string): Promise<void>;
}
