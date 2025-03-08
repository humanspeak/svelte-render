<script lang="ts">
    import { createRender, Render } from '$lib/index.js'
    import InteractiveRocket from '../tests/interactive-rocket.svelte'
    import MultipleRockets from '../tests/multiple-rockets.svelte'
    import Rocket from '../tests/rocket.svelte'
    import Button from '../tests/button.svelte'

    const button = createRender(Button)
        .on('click', (ev: MouseEvent) => console.log('button', ev))
        .slot(createRender(Rocket))
    const rocket = createRender(Rocket)
    const multipleRockets = createRender(MultipleRockets, { times: 3 })
    const interactiveRocket = createRender(InteractiveRocket, {
        onclick: (ev: MouseEvent) => console.log('alien', ev)
    }).on('launch', (ev: MouseEvent) => console.log('rocket', ev))
</script>

<div>
    <Render of={rocket} />
</div>

<div>
    <Render of={multipleRockets} />
</div>

<div>
    <Render of={interactiveRocket} />
</div>

<div>
    <Render of={button} />
</div>
