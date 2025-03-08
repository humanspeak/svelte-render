<script lang="ts">
    import type { Snippet } from 'svelte'

    type Props = {
        children: Snippet
    }

    const { children, ...rest }: Props = $props()
</script>

<button data-testid="button" {...rest}>
    {@render children?.()}
</button>
