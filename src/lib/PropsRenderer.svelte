<script lang="ts">
    import type { ComponentProps, Component } from 'svelte'
    import type { ComponentRenderConfig } from './createRender.js'
    import Render from './Render.svelte'

    type TComponent = $$Generic<Component>

    export let instance: TComponent | undefined = undefined
    export let config: Omit<ComponentRenderConfig<TComponent>, 'props'>
    export let props: ComponentProps<TComponent> | undefined = undefined
</script>

{#if config.children.length === 0}
    <svelte:component this={config.component} bind:this={instance} {...props ?? {}} />
{:else}
    <svelte:component this={config.component} bind:this={instance} {...props ?? {}}>
        {#each config.children as child}
            <Render of={child} />
        {/each}
    </svelte:component>
{/if}
