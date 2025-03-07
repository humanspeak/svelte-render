import type { Component, ComponentEvents, ComponentProps } from 'svelte'
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
    eventHandlers: [
        keyof ComponentEvents<TComponent>,
        (ev: ComponentEvents<TComponent>[keyof ComponentEvents<TComponent>]) => void
    ][] = []

    /**
     * @deprecated This method will be removed in the next major release. Please use svelte5 event syntax instead.
     */
    on<TEventType extends keyof ComponentEvents<TComponent>>(
        type: TEventType,
        handler: (ev: ComponentEvents<TComponent>[TEventType]) => void
    ): this {
        this.eventHandlers.push([
            type,
            /* trunk-ignore(eslint/no-unused-vars) */
            handler as (ev: ComponentEvents<TComponent>[keyof ComponentEvents<TComponent>]) => void
        ])
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
