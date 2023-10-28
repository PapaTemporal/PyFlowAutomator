<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    export let nodeList: string[] = [];

    function onDragStart(e: DragEvent) {
        const target = e.target as HTMLElement;
        e.dataTransfer?.setData("type", target.innerHTML);
    }
</script>

<div class="header">Nodes</div>
<div class="body">
    {#each nodeList as node}
        <button class="nodeItem" on:dragstart={onDragStart} draggable="true"
            >{node}</button
        >
    {/each}
</div>

<style>
    .header {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px;
        font-size: 14px;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background-color: black;
    }
    .body {
        min-height: 100px;
        max-height: 300px;
        padding: 8px;
        display: flex;
        flex-direction: column;
        overflow: scroll;
    }
    .nodeItem {
        height: 30px;
    }
</style>
