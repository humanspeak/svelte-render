<script lang="ts">
    import { Subscribe } from '@humanspeak/svelte-subscribe'
    import { type Component } from 'svelte'
    import type { ComponentRenderConfig } from './createRender.js'
    import PropsRenderer from './PropsRenderer.svelte'
    import { isReadable } from './store.js'

    type TComponent = $$Generic<Component>

    type Props = {
        config: ComponentRenderConfig<TComponent>
    }

    const { config }: Props = $props()

    let instance: TComponent | undefined = $state(undefined)
</script>

{#if isReadable(config.props)}
    <Subscribe props={config.props} let:props>
        <PropsRenderer bind:instance {config} {props} />
    </Subscribe>
{:else}
    <PropsRenderer bind:instance {config} props={config.props} />
{/if}
