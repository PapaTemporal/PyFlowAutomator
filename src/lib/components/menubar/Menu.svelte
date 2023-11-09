<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    import { openMenu } from "./menuItems";
    import MenuList from "./MenuList.svelte";
    import type { MenuItem } from "$lib/types";
    import { writable, type Writable } from "svelte/store";

    export let handleMenuClick: (menu: string | null) => void;
    export let menuItems: Writable<MenuItem[]> = writable([]);
    export let menuLabel: string;
</script>

<div class="menu">
    <button
        class="menu-btn"
        on:click|stopPropagation={() => handleMenuClick(menuLabel)}
    >
        {menuLabel}
    </button>
    {#if $openMenu === menuLabel}
        <MenuList menuItems={$menuItems} />
    {/if}
</div>

<style>
    .menu {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
    .menu-btn {
        background-color: unset;
        border: unset;
        color: white;
        font-family: Arial, Helvetica, sans-serif;
        font-size: small;
        cursor: pointer;
        padding: 0 10px;
        height: 100%;
    }
    .menu-btn:hover {
        background-color: #7b7b7b;
    }
</style>
