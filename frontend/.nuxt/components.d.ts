
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T


export const TodoEditDialog: typeof import("../app/components/todos/TodoEditDialog.vue")['default']
export const TodoForm: typeof import("../app/components/todos/TodoForm.vue")['default']
export const TodoList: typeof import("../app/components/todos/TodoList.vue")['default']
export const TodoTable: typeof import("../app/components/todos/TodoTable.vue")['default']
export const Badge: typeof import("../app/components/ui/badge/Badge.vue")['default']
export const Button: typeof import("../app/components/ui/button/Button.vue")['default']
export const Card: typeof import("../app/components/ui/card/Card.vue")['default']
export const CardContent: typeof import("../app/components/ui/card/CardContent.vue")['default']
export const CardDescription: typeof import("../app/components/ui/card/CardDescription.vue")['default']
export const CardHeader: typeof import("../app/components/ui/card/CardHeader.vue")['default']
export const CardTitle: typeof import("../app/components/ui/card/CardTitle.vue")['default']
export const Checkbox: typeof import("../app/components/ui/checkbox/Checkbox.vue")['default']
export const Input: typeof import("../app/components/ui/input/Input.vue")['default']
export const Label: typeof import("../app/components/ui/label/Label.vue")['default']
export const Table: typeof import("../app/components/ui/table/Table.vue")['default']
export const TableBody: typeof import("../app/components/ui/table/TableBody.vue")['default']
export const TableCell: typeof import("../app/components/ui/table/TableCell.vue")['default']
export const TableHead: typeof import("../app/components/ui/table/TableHead.vue")['default']
export const TableHeader: typeof import("../app/components/ui/table/TableHeader.vue")['default']
export const TableRow: typeof import("../app/components/ui/table/TableRow.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const ErrorMessage: typeof import("vee-validate")['ErrorMessage']
export const Field: typeof import("vee-validate")['Field']
export const FieldArray: typeof import("vee-validate")['FieldArray']
export const Form: typeof import("vee-validate")['Form']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const LazyTodoEditDialog: LazyComponent<typeof import("../app/components/todos/TodoEditDialog.vue")['default']>
export const LazyTodoForm: LazyComponent<typeof import("../app/components/todos/TodoForm.vue")['default']>
export const LazyTodoList: LazyComponent<typeof import("../app/components/todos/TodoList.vue")['default']>
export const LazyTodoTable: LazyComponent<typeof import("../app/components/todos/TodoTable.vue")['default']>
export const LazyBadge: LazyComponent<typeof import("../app/components/ui/badge/Badge.vue")['default']>
export const LazyButton: LazyComponent<typeof import("../app/components/ui/button/Button.vue")['default']>
export const LazyCard: LazyComponent<typeof import("../app/components/ui/card/Card.vue")['default']>
export const LazyCardContent: LazyComponent<typeof import("../app/components/ui/card/CardContent.vue")['default']>
export const LazyCardDescription: LazyComponent<typeof import("../app/components/ui/card/CardDescription.vue")['default']>
export const LazyCardHeader: LazyComponent<typeof import("../app/components/ui/card/CardHeader.vue")['default']>
export const LazyCardTitle: LazyComponent<typeof import("../app/components/ui/card/CardTitle.vue")['default']>
export const LazyCheckbox: LazyComponent<typeof import("../app/components/ui/checkbox/Checkbox.vue")['default']>
export const LazyInput: LazyComponent<typeof import("../app/components/ui/input/Input.vue")['default']>
export const LazyLabel: LazyComponent<typeof import("../app/components/ui/label/Label.vue")['default']>
export const LazyTable: LazyComponent<typeof import("../app/components/ui/table/Table.vue")['default']>
export const LazyTableBody: LazyComponent<typeof import("../app/components/ui/table/TableBody.vue")['default']>
export const LazyTableCell: LazyComponent<typeof import("../app/components/ui/table/TableCell.vue")['default']>
export const LazyTableHead: LazyComponent<typeof import("../app/components/ui/table/TableHead.vue")['default']>
export const LazyTableHeader: LazyComponent<typeof import("../app/components/ui/table/TableHeader.vue")['default']>
export const LazyTableRow: LazyComponent<typeof import("../app/components/ui/table/TableRow.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyErrorMessage: LazyComponent<typeof import("vee-validate")['ErrorMessage']>
export const LazyField: LazyComponent<typeof import("vee-validate")['Field']>
export const LazyFieldArray: LazyComponent<typeof import("vee-validate")['FieldArray']>
export const LazyForm: LazyComponent<typeof import("vee-validate")['Form']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>

export const componentNames: string[]
