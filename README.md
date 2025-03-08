# svelte-render

[![NPM version](https://img.shields.io/npm/v/@humanspeak/svelte-render.svg)](https://www.npmjs.com/package/@humanspeak/svelte-render)
[![Build Status](https://github.com/humanspeak/svelte-render/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/humanspeak/svelte-render/actions/workflows/npm-publish.yml)
[![Coverage Status](https://coveralls.io/repos/github/humanspeak/svelte-render/badge.svg?branch=main)](https://coveralls.io/github/humanspeak/svelte-render?branch=main)
[![License](https://img.shields.io/npm/l/@humanspeak/svelte-render.svg)](https://github.com/humanspeak/svelte-render/blob/main/LICENSE)
[![Downloads](https://img.shields.io/npm/dm/@humanspeak/svelte-render.svg)](https://www.npmjs.com/package/@humanspeak/svelte-render)
[![CodeQL](https://github.com/humanspeak/svelte-render/actions/workflows/codeql.yml/badge.svg)](https://github.com/humanspeak/svelte-render/actions/workflows/codeql.yml)
[![Install size](https://packagephobia.com/badge?p=@humanspeak/svelte-render)](https://packagephobia.com/result?p=@humanspeak/svelte-render)
[![Code Style: Trunk](https://img.shields.io/badge/code%20style-trunk-blue.svg)](https://trunk.io)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Types](https://img.shields.io/npm/types/@humanspeak/svelte-render.svg)](https://www.npmjs.com/package/@humanspeak/svelte-render)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/humanspeak/svelte-render/graphs/commit-activity)

Manage complex Svelte behaviors outside of templates with full type safety.

```svelte
<script>
    import { Render, createRender } from '@humanspeak/svelte-subscribe'
    import Avatar from './Avatar.svelte'
    // ...
    const avatar = createRender(Avatar, { name: 'Ada Lovelace' })
        .on('click', handleClick)
        .on('launch', handleLaunch)
</script>

<Render of={avatar} />
```

## Installation

```bash

npm i -D @humanspeak/svelte-render

```

## API

Svelte Render was primarily built to support complex rendering definitions for [Svelte Headless Table](https://github.com/humanspeak/svelte-headless-table).

### `<Render />`

`<Render />` handles props and automatically registers the event handlers defined with `.on` as well as slot data defined with `.slot`.

`of` accepts:

- primitive data such as `number` and `string`
- `Writable<number>` and `Writable<string>` for dynamic primitive data
- `ComponentRenderConfig` returned by `createRender`

```svelte
<script>
    const avatar = createRender(Avatar, { name: 'Ada Lovelace' })
</script>

<Render of={avatar} />
```

becomes

```svelte
<Avatar name="Ada Lovelace" />
```

### `createRender: (component, props)`

`createRender` accepts a Svelte component and its props as arguments.

`props` can be omitted if the component does not receive props but must be included otherwise.

```ts
const icon = createRender(TickIcon) // ✅
const avatar = createRender(Avatar) // ❌ Type error.
const avatar = createRender(Avatar, { name: 'Ada Lovelace' }) // ✅
```

If you need prop reactivity, `props` must be a [Svelte store](https://svelte.dev/tutorial/writable-stores).

```ts
const avatarProps = writable({ name: 'Ada Lovelace' })
const avatar = createRender(Avatar, avatarProps)
```

### `.on(event, handler)`

**deprecated** Note: this will be removed in a future version. It still works by concating the event to an on for instance `onclick` will be passed to the renderer.

Svelte Render supports the Svelte event system by chaining `.on` calls on `createRender()`. Multiple event handlers can be registered for the same event type like the Svelte `on:` directive.

```ts
const button = createRender(Button)
    .on('click', handleClick)
    .on('click', (ev) => console.log(ev))
```

`<Render of={button} />` becomes:

```svelte
<Button onclick={handleClick} onclick={(ev) => console.log(ev)} />
```

However, note that the callback handler passed into `.on(event, handler)` is not dynamic and will only capture references to variables as they were when the render configuration is created.

If you need a handler to access dynamic data, use a dynamic system like Svelte Stores.

```ts
const counter = writable(0)
const button = createRender(Button).on('click', (ev) => counter.update((c) => c + 1))
```

### `.slot(...config)`

Svelte Render also supports Svelte's default slot system.

`.slot` receives any number of arguments with the same type as `of`, including `ComponentRenderConfig` returned by `createRender`, primitive data, and `Writable`. This makes it useful for rendering wrapper components such as `<Button />` and `<Label />`.

_Due to technical limitations with Svelte 5, it is not possible to assign render configurations to named slots._

```ts
const button = createRender(Button).slot(createRender(Icon, { name: 'user' }), 'Log in')
```

`<Render of={button} />` becomes:

```svelte
<Button>
    <Icon name="user" />
    Log in
</Button>
```
