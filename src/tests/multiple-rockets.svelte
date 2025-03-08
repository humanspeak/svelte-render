<script lang="ts">
    export let times: number
</script>

{#each { length: times } as _, i (i)}
    🚀
{/each}
