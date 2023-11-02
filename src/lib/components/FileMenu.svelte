<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    import type { MenuItem } from "$lib/types";
    import Menu from "./Menu.svelte";
    import { onMount } from "svelte";

    export let label: string;
    export let menuItems: Writable<MenuItem[]> = writable([]);
    export let onClick: (e: MouseEvent) => void = () => {};
    export let closeOthers: (label: string) => void = () => {};
    export let isOpen: Writable<boolean> = writable(false);

    const isButton = $menuItems.length === 0;
    let labelElement: HTMLElement;
    let menuPosition: { top: number; left: number } = { top: 0, left: 0 };

    onMount(() => {
        const rect = labelElement.getBoundingClientRect();
        menuPosition = { top: rect.top + rect.height, left: rect.left };
    });

    function handleClick(e: MouseEvent) {
        e.preventDefault();
        if (isButton) {
            closeOthers(label);
            onClick(e);
        } else {
            closeOthers(label);
            isOpen.set(!$isOpen);
        }
    }
</script>

<div bind:this={labelElement} class="menu-toggle" on:click={handleClick}>
    {label}
</div>

{#if !isButton}
    <Menu bind:isOpen bind:menuItems {menuPosition} />
{/if}

<style>
    .menu-toggle {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 0 5px;
        height: 100%;
    }
    .menu-toggle:hover {
        background-color: #444;
    }
</style>
