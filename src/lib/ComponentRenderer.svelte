<script lang="ts">
    import { Subscribe } from '@humanspeak/svelte-subscribe'
    import { type Component, type ComponentProps } from 'svelte'
    import type { ComponentRenderConfig } from './createRender.js'
    import PropsRenderer from './PropsRenderer.svelte'
    import { isReadable } from './store.js'

    // trunk-ignore(eslint/@typescript-eslint/no-explicit-any)
    type TComponent = $$Generic<Component<any>>
    type Props = {
        config: ComponentRenderConfig<TComponent>
    }

    const { config }: Props = $props()

    let instance: TComponent | undefined = $state(undefined)
</script>

{#if isReadable(config.props)}
    <Subscribe props={config.props} let:props>
        <!-- @ts-expect-error - Subscribe returns unknown -->
        <PropsRenderer bind:instance {config} {props} />
    </Subscribe>
{:else}
    <!-- @ts-expect-error - Subscribe returns unknown -->
    <PropsRenderer bind:instance {config} props={config.props} />
{/if}
