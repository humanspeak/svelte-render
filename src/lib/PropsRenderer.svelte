<script lang="ts">
    import type { Component } from 'svelte'
    import type { ComponentRenderConfig } from './createRender.js'
    import Render from './Render.svelte'

    // trunk-ignore(eslint/@typescript-eslint/no-explicit-any)
    // trunk-ignore(eslint/no-undef)
    type TComponent = $$Generic<Component<any>>
    type Props = {
        instance: ReturnType<Component> | undefined
        config: Omit<ComponentRenderConfig<TComponent>, 'props'>
        props: Record<string, unknown> | undefined
    }

    // trunk-ignore(eslint/prefer-const)
    let { instance = $bindable(undefined), config, props }: Props = $props()
</script>

<config.component {...props} bind:this={instance}>
    {#each config.children as child, i (i)}
        <Render of={child} />
    {/each}
</config.component>
