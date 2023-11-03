<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";

    const nodeList: Writable<string[]> = getContext("nodeList");

    function onDragStart(e: DragEvent) {
        const target = e.target as HTMLElement;
        e.dataTransfer?.setData("type", target.innerHTML);
    }
</script>

<div style={$$props.style} class="section">
    <div class="header">Nodes</div>
    <div class="body">
        {#each $nodeList as node}
            <button class="nodeItem" on:dragstart={onDragStart} draggable="true"
                >{node}</button
            >
        {/each}
    </div>
</div>

<style>
    .section {
        flex: 2;
        display: flex;
        flex-direction: column;
        background-color: rgb(82, 82, 82);
        color: white;
        overflow: hidden;
        padding: 5px;
    }
    .header {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px;
        font-size: 14px;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background-color: black;
        color: white;
    }
    .body {
        padding: 8px;
        display: flex;
        flex-direction: column;
        overflow: scroll;
        background-color: rgb(124, 124, 124);
        flex: auto;
    }
    .nodeItem {
        height: 30px;
    }
</style>
