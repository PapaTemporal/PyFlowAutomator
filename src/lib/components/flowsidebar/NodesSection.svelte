<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    import { nodesList, categories } from "$lib/constants";

    function onDragStart(e: DragEvent): void {
        const target = e.target as HTMLElement;
        e.dataTransfer?.setData("type", target.innerHTML);
    }

    const groupedNodes: { [category: string]: string[] } = {};
    for (const key of Object.keys(nodesList)) {
        const category = nodesList[key].category;
        if (!groupedNodes[category]) {
            groupedNodes[category] = [];
        }
        groupedNodes[category].push(key);
    }

    let openCategory: string | null = null;
    const toggleCategory = (category: string, event: MouseEvent): void => {
        event.preventDefault();
        openCategory = openCategory === category ? null : category;
    };

    let searchTerm: string = "";
</script>

<div style={$$props.style} class="section">
    <div class="header">Nodes</div>
    <input bind:value={searchTerm} placeholder="Search..." />
    <div class="body">
        {#each Object.entries(groupedNodes).filter(([category, nodes]) => category.includes(searchTerm) || nodes.some( (node) => node.includes(searchTerm) )) as [category, nodes]}
            <details open={openCategory === category}>
                <summary
                    class="summary"
                    on:click={(event) => toggleCategory(category, event)}
                >
                    {category}
                </summary>
                <div class="nodes">
                    {#each nodes.filter( (node) => node.includes(searchTerm) ) as nodeKey}
                        <button
                            class="nodeItem"
                            on:dragstart={onDragStart}
                            draggable="true">{nodeKey}</button
                        >
                    {/each}
                </div>
            </details>
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
        display: flex;
        flex-direction: column;
        overflow: scroll;
        background-color: rgb(124, 124, 124);
        flex: auto;
    }
    .nodeItem {
        height: 25px;
    }
    .summary {
        font-size: 14px;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background-color: rgb(82, 82, 82);
        padding: 6px;
        cursor: pointer;
        border-bottom: 1px solid rgb(161, 161, 161);
    }
    .nodes {
        display: flex;
        flex-direction: column;
    }
</style>
