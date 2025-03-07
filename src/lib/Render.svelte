<script lang="ts">
    import type { Component } from 'svelte'
    import ComponentRenderer from './ComponentRenderer.svelte'
    import type { RenderConfig } from './createRender.js'
    import { isReadable, Undefined } from './store.js'

    // trunk-ignore(eslint/@typescript-eslint/no-explicit-any)
    type TComponent = $$Generic<Component<any>>

    let config: RenderConfig<TComponent>
    export { config as of }
    const readableConfig = isReadable(config) ? config : Undefined
</script>

{#if isReadable(config)}
    <!-- Auto-subscription must be on a non-nullable `Readable`. -->
    {$readableConfig}
{:else if typeof config !== 'object'}
    {config}
{:else}
    <ComponentRenderer {config} />
{/if}
