<script lang="ts">
    import { Render, type RenderConfig } from '$lib/index.js'
    import type { Component } from 'svelte'

    // trunk-ignore(eslint/@typescript-eslint/no-explicit-any)
    type TComponent = $$Generic<Component<any>>

    export let config: RenderConfig<TComponent>
</script>

<div data-testid="template">
    <Render of={config} />
</div>
