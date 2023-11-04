<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    import type { NodeExt, Variable } from "$lib/types";
    import type { Edge } from "@xyflow/svelte";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";
    import { slide } from "svelte/transition";

    const nodes: Writable<NodeExt[]> = getContext("nodes");
    const edges: Writable<Edge[]> = getContext("edges");
    const variables: Writable<Variable> = getContext("variables");

    let varName: string = "";

    function addVariable() {
        console.log(varName);
        if (!(varName in $variables) && varName !== "") {
            $variables = { ...$variables, [varName]: "" };
        }
        varName = "";
    }

    function onDeleteVariable(variable: string) {
        let IDsDeleted: string[] = [];
        $nodes = $nodes.filter((node) => {
            if (node?.data?.kwargs?.variable_name === variable) {
                IDsDeleted.push(node.id);
                return false;
            }
            return true;
        });
        $edges = $edges.filter(
            (edge) =>
                !IDsDeleted.includes(edge.source) &&
                !IDsDeleted.includes(edge.target)
        );
        if (variable in $variables) {
            variables.update((v) => {
                delete v[variable];
                return v;
            });
        }
    }

    function onDragStart(e: DragEvent, name: string, value: string) {
        e.dataTransfer?.setData("varName", name);
        e.dataTransfer?.setData("varValue", value);
    }

    function onUpdateVariable(
        e: InputEvent & { target: HTMLInputElement },
        name: string
    ) {
        const value = e.target.value;
        variables.update((v) => {
            v[name] = value;
            return v;
        });
    }

    let showInput: { [key: string]: boolean } = {};
</script>

<div class="section">
    <div class="header">Variables</div>
    <div class="body">
        <div class="var-form">
            <input
                class="var-input"
                type="text"
                placeholder="variable name"
                bind:value={varName}
            />
            <button class="var-save" on:click={addVariable}>save</button>
        </div>
        {#each Object.entries($variables) as [name, value] (name)}
            <div class="var-section">
                <div class="var">
                    <button
                        class="var-toggle"
                        on:click={() => onDeleteVariable(name)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                        >
                            <circle cx="12" cy="12" r="10" fill="black" />
                            <path
                                d="M15 9l-6 6M9 9l6 6"
                                stroke="#FFFFFF"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>
                    <span
                        class="var-name"
                        on:dragstart={(e) => onDragStart(e, name, value)}
                        draggable="true"
                    >
                        {name}
                    </span>
                    <button
                        on:click={() => (showInput[name] = !showInput[name])}
                        class="var-toggle"
                    >
                        <svg
                            class="chevron"
                            style="transform: {showInput[name]
                                ? 'rotate(180deg)'
                                : 'rotate(0)'}"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                            />
                        </svg>
                    </button>
                </div>
                {#if showInput[name]}
                    <div class="var-default-input" transition:slide>
                        <input
                            class="var-input"
                            type="text"
                            placeholder="default value"
                            {value}
                            on:change={(e) => onUpdateVariable(e, name)}
                        />
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</div>

<style>
    .section {
        flex: 1;
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
    .var-form {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        gap: 8px;
    }
    .var-input {
        flex: 0 1 auto;
        border: unset;
        border-radius: 3px;
        height: 20px;
        width: 100%;
    }
    .var-save {
        flex: 0 1 auto;
    }
    .var-section {
        display: flex;
        flex-direction: column;
        background-color: #555;
        margin-top: 5px;
        padding: 5px;
        gap: 5px;
    }
    .var {
        display: flex;
        gap: 5px;
        font-family: Arial, Helvetica, sans-serif;
    }
    .var span {
        flex: 1 1 auto;
        cursor: grab;
    }
    .var button {
        flex: 0 1 auto;
    }
    .var-default-input {
        display: flex;
    }
    .var-toggle {
        background-color: unset;
        border: unset;
        cursor: pointer;
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px;
    }
    .chevron {
        color: white;
        transition: transform 0.3s ease;
    }
</style>
