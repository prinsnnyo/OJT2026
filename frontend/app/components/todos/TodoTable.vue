<script setup lang="ts">
import {
  FlexRender,
  getCoreRowModel,
  getSortedRowModel,
  useVueTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/vue-table'
import { Pencil, Trash2 } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import type { Todo } from '~/types'

const props = defineProps<{
  todos: Todo[]
  loading?: boolean
}>()

const emit = defineEmits<{
  edit: [todo: Todo]
  delete: [todo: Todo]
  toggleComplete: [todo: Todo]
}>()

const sorting = ref<SortingState>([])

const columns: ColumnDef<Todo>[] = [
  {
    id: 'completed',
    header: 'Done',
    cell: ({ row }) => h(Checkbox, {
      'checked': row.original.completed,
      'onUpdate:checked': () => emit('toggleComplete', row.original),
    }),
    enableSorting: false,
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => h('span', {
      class: row.original.completed ? 'line-through text-muted-foreground' : '',
    }, row.original.title),
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => row.original.description ?? '—',
  },
  {
    accessorKey: 'completed',
    header: 'Status',
    cell: ({ row }) => h(Badge, {
      variant: row.original.completed ? 'success' : 'secondary',
    }, () => row.original.completed ? 'Completed' : 'Pending'),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => h('div', { class: 'flex gap-2' }, [
      h(Button, {
        variant: 'outline',
        size: 'sm',
        onClick: () => emit('edit', row.original),
      }, () => [h(Pencil, { class: 'h-4 w-4' }), ' Edit']),
      h(Button, {
        variant: 'destructive',
        size: 'sm',
        onClick: () => emit('delete', row.original),
      }, () => [h(Trash2, { class: 'h-4 w-4' }), ' Delete']),
    ]),
    enableSorting: false,
  },
]

const table = useVueTable({
  get data() {
    return props.todos
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  state: {
    get sorting() {
      return sorting.value
    },
  },
  onSortingChange: (updater) => {
    sorting.value = typeof updater === 'function' ? updater(sorting.value) : updater
  },
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Your todos</CardTitle>
      <CardDescription>TanStack Vue Table — sort columns by clicking headers</CardDescription>
    </CardHeader>
    <CardContent>
      <div v-if="loading" class="py-8 text-center text-muted-foreground">
        Loading todos...
      </div>

      <div v-else-if="todos.length === 0" class="py-8 text-center text-muted-foreground">
        No todos yet. Add one above!
      </div>

      <Table v-else>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
              :class="header.column.getCanSort() ? 'cursor-pointer select-none' : ''"
              @click="header.column.getCanSort() && header.column.toggleSorting()"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
              <span v-if="header.column.getIsSorted() === 'asc'"> ↑</span>
              <span v-if="header.column.getIsSorted() === 'desc'"> ↓</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>
