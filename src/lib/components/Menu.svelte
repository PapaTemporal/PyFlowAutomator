<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    import type { MenuItem } from "$lib/types";
    import MenuItemComponent from "./MenuItem.svelte";

    export let isOpen: Writable<boolean> = writable(false);
    export let menuItems: Writable<MenuItem[]>;
    export let menuPosition: { top: number; left: number } = {
        top: 0,
        left: 0,
    };

    function toggleMenu(e: MouseEvent, action: (e: MouseEvent) => void) {
        isOpen.set(false);
        action(e as MouseEvent);
    }
    $: {
        console.log($isOpen);
    }
</script>

<ul
    class="menu {$isOpen ? 'open' : ''}"
    style="top: {menuPosition.top}px; left: {menuPosition.left}px;"
>
    {#each $menuItems as item (item.id)}
        <MenuItemComponent
            label={item.label}
            disabled={item.disabled}
            on:click={(e) => {
                e.preventDefault();
                toggleMenu(e, item.action);
            }}
        />
    {/each}
</ul>

<style>
    .menu {
        position: absolute;
        top: 17px;
        list-style-type: none;
        display: none;
        flex-direction: column;
        z-index: 1;
        background-color: #333;
        padding: 0;
        margin: 0;
    }
    .menu.open {
        display: flex;
    }
</style>
