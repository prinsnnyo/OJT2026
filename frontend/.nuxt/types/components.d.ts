
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

interface _GlobalComponents {
  TodoEditDialog: typeof import("../../app/components/todos/TodoEditDialog.vue")['default']
  TodoForm: typeof import("../../app/components/todos/TodoForm.vue")['default']
  TodoList: typeof import("../../app/components/todos/TodoList.vue")['default']
  TodoTable: typeof import("../../app/components/todos/TodoTable.vue")['default']
  Badge: typeof import("../../app/components/ui/badge/Badge.vue")['default']
  Button: typeof import("../../app/components/ui/button/Button.vue")['default']
  Card: typeof import("../../app/components/ui/card/Card.vue")['default']
  CardContent: typeof import("../../app/components/ui/card/CardContent.vue")['default']
  CardDescription: typeof import("../../app/components/ui/card/CardDescription.vue")['default']
  CardHeader: typeof import("../../app/components/ui/card/CardHeader.vue")['default']
  CardTitle: typeof import("../../app/components/ui/card/CardTitle.vue")['default']
  Checkbox: typeof import("../../app/components/ui/checkbox/Checkbox.vue")['default']
  Input: typeof import("../../app/components/ui/input/Input.vue")['default']
  Label: typeof import("../../app/components/ui/label/Label.vue")['default']
  Table: typeof import("../../app/components/ui/table/Table.vue")['default']
  TableBody: typeof import("../../app/components/ui/table/TableBody.vue")['default']
  TableCell: typeof import("../../app/components/ui/table/TableCell.vue")['default']
  TableHead: typeof import("../../app/components/ui/table/TableHead.vue")['default']
  TableHeader: typeof import("../../app/components/ui/table/TableHeader.vue")['default']
  TableRow: typeof import("../../app/components/ui/table/TableRow.vue")['default']
  NuxtWelcome: typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']
  NuxtLayout: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
  NuxtErrorBoundary: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
  ClientOnly: typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']
  DevOnly: typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']
  ServerPlaceholder: typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']
  NuxtLink: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']
  NuxtLoadingIndicator: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
  NuxtTime: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
  NuxtRouteAnnouncer: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
  NuxtAnnouncer: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-announcer")['default']
  NuxtImg: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
  NuxtPicture: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
  ErrorMessage: typeof import("vee-validate")['ErrorMessage']
  Field: typeof import("vee-validate")['Field']
  FieldArray: typeof import("vee-validate")['FieldArray']
  Form: typeof import("vee-validate")['Form']
  NuxtPage: typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']
  NoScript: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']
  Link: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']
  Base: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']
  Title: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']
  Meta: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']
  Style: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']
  Head: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']
  Html: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']
  Body: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']
  NuxtIsland: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']
  LazyTodoEditDialog: LazyComponent<typeof import("../../app/components/todos/TodoEditDialog.vue")['default']>
  LazyTodoForm: LazyComponent<typeof import("../../app/components/todos/TodoForm.vue")['default']>
  LazyTodoList: LazyComponent<typeof import("../../app/components/todos/TodoList.vue")['default']>
  LazyTodoTable: LazyComponent<typeof import("../../app/components/todos/TodoTable.vue")['default']>
  LazyBadge: LazyComponent<typeof import("../../app/components/ui/badge/Badge.vue")['default']>
  LazyButton: LazyComponent<typeof import("../../app/components/ui/button/Button.vue")['default']>
  LazyCard: LazyComponent<typeof import("../../app/components/ui/card/Card.vue")['default']>
  LazyCardContent: LazyComponent<typeof import("../../app/components/ui/card/CardContent.vue")['default']>
  LazyCardDescription: LazyComponent<typeof import("../../app/components/ui/card/CardDescription.vue")['default']>
  LazyCardHeader: LazyComponent<typeof import("../../app/components/ui/card/CardHeader.vue")['default']>
  LazyCardTitle: LazyComponent<typeof import("../../app/components/ui/card/CardTitle.vue")['default']>
  LazyCheckbox: LazyComponent<typeof import("../../app/components/ui/checkbox/Checkbox.vue")['default']>
  LazyInput: LazyComponent<typeof import("../../app/components/ui/input/Input.vue")['default']>
  LazyLabel: LazyComponent<typeof import("../../app/components/ui/label/Label.vue")['default']>
  LazyTable: LazyComponent<typeof import("../../app/components/ui/table/Table.vue")['default']>
  LazyTableBody: LazyComponent<typeof import("../../app/components/ui/table/TableBody.vue")['default']>
  LazyTableCell: LazyComponent<typeof import("../../app/components/ui/table/TableCell.vue")['default']>
  LazyTableHead: LazyComponent<typeof import("../../app/components/ui/table/TableHead.vue")['default']>
  LazyTableHeader: LazyComponent<typeof import("../../app/components/ui/table/TableHeader.vue")['default']>
  LazyTableRow: LazyComponent<typeof import("../../app/components/ui/table/TableRow.vue")['default']>
  LazyNuxtWelcome: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
  LazyNuxtLayout: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
  LazyNuxtErrorBoundary: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
  LazyClientOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']>
  LazyDevOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']>
  LazyServerPlaceholder: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
  LazyNuxtLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
  LazyNuxtLoadingIndicator: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
  LazyNuxtTime: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
  LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
  LazyNuxtAnnouncer: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-announcer")['default']>
  LazyNuxtImg: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
  LazyNuxtPicture: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
  LazyErrorMessage: LazyComponent<typeof import("vee-validate")['ErrorMessage']>
  LazyField: LazyComponent<typeof import("vee-validate")['Field']>
  LazyFieldArray: LazyComponent<typeof import("vee-validate")['FieldArray']>
  LazyForm: LazyComponent<typeof import("vee-validate")['Form']>
  LazyNuxtPage: LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']>
  LazyNoScript: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
  LazyLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']>
  LazyBase: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']>
  LazyTitle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']>
  LazyMeta: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']>
  LazyStyle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']>
  LazyHead: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']>
  LazyHtml: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']>
  LazyBody: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']>
  LazyNuxtIsland: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
