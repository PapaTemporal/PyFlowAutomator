<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    import type { Node, Edge } from "@xyflow/svelte";
    import type { Variable } from "$lib/types";
    import type { ChangeEventHandler } from "svelte/elements";

    export let nodes: Writable<Node[]> = writable([]);
    export let edges: Writable<Edge[]> = writable([]);
    export let variables: Writable<Variable> = writable({});

    let varName: string = "";

    function addVariable() {
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

    function onDragStart(
        e: DragEvent,
        name: string,
        value: string,
        type: string
    ) {
        e.dataTransfer?.setData("type", type);
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
</script>

<div class="header">Variables</div>
<div class="body" style="max-height: 200px;">
    <div class="var-form">
        <input
            class="var-input"
            type="text"
            placeholder="variable name"
            bind:value={varName}
        />
        <button class="var-save" on:click={addVariable}>save</button>
    </div>
    {#each Object.entries($variables) as [name, value]}
        <div class="var-section">
            <div class="var">
                <span>{name}</span>
                <button
                    {name}
                    draggable="true"
                    on:dragstart={(e) =>
                        onDragStart(e, name, value, "GetVariable")}
                >
                    get
                </button>
                <button
                    {name}
                    draggable="true"
                    on:dragstart={(e) =>
                        onDragStart(e, name, value, "SetVariable")}
                >
                    set
                </button>
                <button on:click={() => onDeleteVariable(name)}> del </button>
            </div>
            <div class="var-default-input">
                <input
                    class="var-input"
                    type="text"
                    placeholder="default value"
                    {value}
                    on:change={(e) => onUpdateVariable(e, name)}
                />
            </div>
        </div>
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
        border-radius: 5px;
        margin-top: 5px;
        padding: 5px;
        gap: 5px;
    }
    .var {
        display: flex;
        gap: 5px;
    }
    .var span {
        flex: 1 1 auto;
    }
    .var button {
        flex: 0 1 auto;
    }
    .var-default-input {
        display: flex;
    }
</style>
