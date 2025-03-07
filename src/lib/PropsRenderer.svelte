<script lang="ts">
    import type { Component, ComponentProps } from 'svelte'
    import type { ComponentRenderConfig } from './createRender.js'
    import Render from './Render.svelte'

    // trunk-ignore(eslint/@typescript-eslint/no-explicit-any)
    type TComponent = $$Generic<Component<any>>
    type Props = {
        instance: TComponent | undefined
        config: Omit<ComponentRenderConfig<TComponent>, 'props'>
        props: ComponentProps<TComponent> | undefined
    }

    // trunk-ignore(eslint/prefer-const)
    let { instance = $bindable(undefined), config, props }: Props = $props()
</script>

<config.component {...props} bind:this={instance}>
    {#each config.children as child}
        <Render of={child} />
    {/each}
</config.component>
