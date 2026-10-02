<script lang="ts">
    import { Subscribe } from '@humanspeak/svelte-subscribe'
    import { type Component } from 'svelte'
    import type { ComponentRenderConfig } from './createRender.js'
    import PropsRenderer from './PropsRenderer.svelte'
    import { isReadable } from './store.js'

    // trunk-ignore(eslint/@typescript-eslint/no-explicit-any)
    // trunk-ignore(eslint/no-undef)
    type TComponent = $$Generic<Component<any>>
    type Props = {
        config: ComponentRenderConfig<TComponent>
    }

    const { config }: Props = $props()

    let instance: ReturnType<Component> | undefined = $state(undefined)
</script>

{#if isReadable<Record<string, unknown>>(config.props)}
    <Subscribe props={config.props} let:props>
        <PropsRenderer bind:instance {config} {props} />
    </Subscribe>
{:else}
    <PropsRenderer bind:instance {config} props={config.props} />
{/if}
