import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
@UseGuards(AuthGuard('jwt'))
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll(@Request() req: { user: { userId: string } }) {
    return this.todosService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(
    @Request() req: { user: { userId: string } },
    @Param('id') id: string,
  ) {
    return this.todosService.findOne(req.user.userId, id);
  }

  @Post()
  create(
    @Request() req: { user: { userId: string } },
    @Body() dto: CreateTodoDto,
  ) {
    return this.todosService.create(req.user.userId, dto);
  }

  @Put(':id')
  update(
    @Request() req: { user: { userId: string } },
    @Param('id') id: string,
    @Body() dto: UpdateTodoDto,
  ) {
    return this.todosService.update(req.user.userId, id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(
    @Request() req: { user: { userId: string } },
    @Param('id') id: string,
  ) {
    return this.todosService.remove(req.user.userId, id);
  }
}
