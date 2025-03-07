import type { Component, ComponentProps } from 'svelte'
import type { Readable } from 'svelte/store'

/* trunk-ignore(eslint/@typescript-eslint/no-explicit-any) */
export type RenderConfig<TComponent extends Component = Component<any>> =
    | ComponentRenderConfig<TComponent>
    | string
    | number
    | Readable<string | number>

/* trunk-ignore(eslint/@typescript-eslint/no-explicit-any) */
export class ComponentRenderConfig<TComponent extends Component = Component<any>> {
    constructor(
        public component: TComponent,
        public props?: Record<string, unknown>
    ) {}

    /**
     * @deprecated This method will be removed in the next major release. Please use svelte5 event syntax instead.
     */
    /* trunk-ignore(eslint/@typescript-eslint/no-explicit-any) */
    eventHandlers: [string, (ev: any) => void][] = []

    /**
     * @deprecated This method will be removed in the next major release. Please use svelte5 event syntax instead.
     */
    /* trunk-ignore(eslint/@typescript-eslint/no-explicit-any) */
    on<TEventType extends string, TEvent = any>(
        type: TEventType,
        handler: (ev: TEvent) => void
    ): this {
        this.eventHandlers.push([type, handler])
        this.props ??= {} as ComponentProps<TComponent>
        ;(this.props as Record<string, unknown>)[`on${String(type)}`] = handler
        return this
    }

    children: RenderConfig[] = []
    slot(...children: RenderConfig[]) {
        this.children = children
        return this
    }
}

// Allow omission of the `props` argument if the component accepts no props.
/* trunk-ignore(eslint/@typescript-eslint/no-explicit-any) */
export function createRender<TComponent extends Component<any>>(
    component: TComponent
): ComponentRenderConfig<TComponent>

/* trunk-ignore(eslint/@typescript-eslint/no-explicit-any) */
export function createRender<TComponent extends Component<any>>(
    component: TComponent,
    props: Partial<ComponentProps<TComponent>> | Readable<ComponentProps<TComponent>>
): ComponentRenderConfig<TComponent>

/* trunk-ignore(eslint/@typescript-eslint/no-explicit-any) */
export function createRender<TComponent extends Component<any>>(
    component: TComponent,
    props?: Partial<ComponentProps<TComponent>> | Readable<ComponentProps<TComponent>>
): ComponentRenderConfig<TComponent> {
    return new ComponentRenderConfig(component, props as Record<string, unknown>)
}
