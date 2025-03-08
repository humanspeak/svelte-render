import type { Component, ComponentProps } from 'svelte'
import type { Readable } from 'svelte/store'

/**
 * Configuration type for rendering Svelte components or primitive values
 * @template TComponent - The Svelte component type
 */
/* trunk-ignore(eslint/@typescript-eslint/no-explicit-any) */
export type RenderConfig<TComponent extends Component = Component<any>> =
    | ComponentRenderConfig<TComponent>
    | string
    | number
    | Readable<string | number>

/**
 * Configuration class for rendering Svelte components with props and slots
 * @template TComponent - The Svelte component type
 */
/* trunk-ignore(eslint/@typescript-eslint/no-explicit-any) */
export class ComponentRenderConfig<TComponent extends Component = Component<any>> {
    /**
     * Creates a new component render configuration
     * @param component - The Svelte component to render
     * @param props - Optional props to pass to the component
     */
    constructor(
        public component: TComponent,
        public props?: Record<string, unknown>
    ) {}

    /**
     * @deprecated This method will be removed in the next major release. Please use svelte-5 event syntax instead.
     * List of event handlers to attach to the component
     */
    /* trunk-ignore(eslint/@typescript-eslint/no-explicit-any) */
    eventHandlers: [string, (ev: any) => void][] = []

    /**
     * @deprecated This method will be removed in the next major release. Please use svelte-5 event syntax instead.
     *
     * Attaches an event handler to the component
     * @param type - The event type to listen for
     * @param handler - The event handler function
     * @returns this - For method chaining
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

    /**
     * List of child components to render in the default slot
     */
    children: RenderConfig[] = []

    /**
     * Sets the children to render in the default slot
     * @param children - The child components to render
     * @returns this - For method chaining
     */
    slot(...children: RenderConfig[]) {
        this.children = children
        return this
    }
}

/**
 * Creates a render configuration for a Svelte component without props
 * @template TComponent - The Svelte component type
 * @param component - The component to render
 * @returns A new ComponentRenderConfig instance
 * @example
 * ```svelte
 * <script>
 *   import { createRender } from 'svelte-render'
 *   import MyComponent from './MyComponent.svelte'
 *
 *   const config = createRender(MyComponent)
 * </script>
 * ```
 */
/* trunk-ignore(eslint/@typescript-eslint/no-explicit-any) */
export function createRender<TComponent extends Component<any>>(
    component: TComponent
): ComponentRenderConfig<TComponent>

/**
 * Creates a render configuration for a Svelte component with props
 * @template TComponent - The Svelte component type
 * @param component - The component to render
 * @param props - The props to pass to the component, can be static or reactive
 * @returns A new ComponentRenderConfig instance
 * @example
 * ```svelte
 * <script>
 *   import { createRender } from 'svelte-render'
 *   import MyComponent from './MyComponent.svelte'
 *
 *   const config = createRender(MyComponent, { name: 'World' })
 * </script>
 * ```
 */
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
