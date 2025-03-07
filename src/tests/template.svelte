<script lang="ts">
    import { Render, type RenderConfig } from '$lib/index.js'
    import type { Component } from 'svelte'
    type TComponent = $$Generic<Component>

    export let config: RenderConfig<TComponent>
</script>

<div data-testid="template">
    <Render of={config} />
</div>
