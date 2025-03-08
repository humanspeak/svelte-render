<script lang="ts">
    type Props = {
        // trunk-ignore(eslint/no-unused-vars)
        onclick: (ev: MouseEvent) => void
        // trunk-ignore(eslint/no-unused-vars)
        onlaunch: (ev: MouseEvent) => void
    }

    const { onclick, onlaunch }: Props = $props()
</script>

<button {onclick}>👽</button>
<button onclick={onlaunch}>🚀</button>
