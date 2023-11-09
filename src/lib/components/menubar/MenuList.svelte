<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    import type { MenuItem } from "$lib/types";

    export let menuItems: MenuItem[] = [];
</script>

<ul class="menu-list">
    {#each menuItems as item (item.id)}
        <li class={`menu-list-item ${item.disabled ? "disabled" : ""}`}>
            <button
                disabled={item.disabled}
                class="menu-list-btn"
                on:click={item.action}
            >
                {item.label}
            </button>
        </li>
    {/each}
</ul>

<style>
    .menu-list {
        position: absolute;
        top: 100%;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        background-color: #333;
        color: white;
        padding: 0;
        margin: 0;
        list-style: none;
        z-index: 4;
        width: 200px;
        padding: 5px 0;
    }
    .menu-list-item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 0;
        margin: 0;
    }
    .menu-list-btn {
        background-color: unset;
        border: unset;
        color: white;
        font-family: Arial, Helvetica, sans-serif;
        font-size: small;
        cursor: pointer;
        width: 90%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 20px;
        border-radius: 5px;
    }
    .menu-list-btn:hover {
        background-color: #444;
    }
    .menu-list-btn:disabled {
        color: #999;
        cursor: not-allowed;
    }
</style>
