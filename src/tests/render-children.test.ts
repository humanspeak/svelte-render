import { createRender } from '$lib/index.js'
import { render, screen } from '@testing-library/svelte/svelte5'
import Button from './button.svelte'
import Rocket from './rocket.svelte'
import Template from './template.svelte'
import '@testing-library/jest-dom'

it('renders a component with children', () => {
    const config = createRender(Button).slot(createRender(Rocket), 'Fire!')
    render(Template, { props: { config } })
    expect(screen.getByTestId('button')).toHaveTextContent('🚀Fire!')
})
