import type { Component, ComponentEvents, ComponentProps } from 'svelte'
import type { Readable } from 'svelte/store'

export type RenderConfig<TComponent extends Component = Component> =
    | ComponentRenderConfig<TComponent>
    | string
    | number
    | Readable<string | number>

export class ComponentRenderConfig<TComponent extends Component = Component> {
    constructor(
        public component: Component,
        public props?: Record<string, unknown>
    ) {}

    /**
     * @deprecated This method will be removed in the next major release. Please use svelte5 event syntax instead.
     */
    eventHandlers: [keyof ComponentEvents<TComponent>, (ev: Event) => void][] = []

    /**
     * @deprecated This method will be removed in the next major release. Please use svelte5 event syntax instead.
     */
    on<TEventType extends keyof ComponentEvents<TComponent>>(
        type: TEventType,
        handler: (ev: ComponentEvents<TComponent>[TEventType]) => void
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
export function createRender<TComponent extends Component<any>>(
    component: TComponent
): ComponentRenderConfig<TComponent>

export function createRender<TComponent extends Component<any>>(
    component: TComponent,
    props: ComponentProps<TComponent> | Readable<ComponentProps<TComponent>>
): ComponentRenderConfig<TComponent>

export function createRender<TComponent extends Component<any>>(
    component: TComponent,
    props?: ComponentProps<TComponent> | Readable<ComponentProps<TComponent>>
): ComponentRenderConfig<TComponent> {
    return new ComponentRenderConfig(component, props as Record<string, unknown>)
}
