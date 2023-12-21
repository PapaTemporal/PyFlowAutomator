<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    import { Handle, Position } from "@xyflow/svelte";
    import type { NodePropsExt, TemplateArgKwarg } from "$lib/types";

    export let data: NodePropsExt["data"];

    // unused props - we need to list them here in order to prevent warnings
    export let targetPosition: NodePropsExt["targetPosition"] = Position.Top;
    export let sourcePosition: NodePropsExt["sourcePosition"] = Position.Bottom;
    export let id: NodePropsExt["id"] = "";
    export let selected: NodePropsExt["selected"] = undefined;
    export let type: NodePropsExt["type"] = undefined;
    export let zIndex: NodePropsExt["zIndex"] = undefined;
    export let dragging: NodePropsExt["dragging"] = false;
    export let dragHandle: NodePropsExt["dragHandle"] = undefined;
    export let xPos: NodePropsExt["xPos"] = 0;
    export let yPos: NodePropsExt["yPos"] = 0;
    export let isConnectable: NodePropsExt["isConnectable"] = undefined;
    // just use to prevent warnings
    targetPosition;
    sourcePosition;
    id;
    selected;
    type;
    zIndex;
    dragging;
    dragHandle;
    xPos;
    yPos;
    isConnectable;

    let tmpLabels: TemplateArgKwarg[] = [];
    let tmpLabelsAdvanced: TemplateArgKwarg[] = [];

    if (data.kwargs) {
        data.kwargs.map((kwarg: any) => {
            const { advanced, ...rest } = kwarg;
            const [key, value] = Object.entries(rest)[0];
            const item = { key, value, type: "kwarg" };

            if (advanced === true) {
                tmpLabelsAdvanced.push(item);
            } else {
                tmpLabels.push(item);
            }
        });
    }

    let isAdvancedOpen: boolean = false;
    let isMethodConnected: boolean = false;
    let isUrlConnected: boolean = false;
</script>

<div
    class="node"
    style={`width: ${
        !data.connected?.url ? "150" : "100"
    }px; border: 1px solid ${selected ? "blue" : "black"};`}
>
    <Handle
        id="e-in"
        type="target"
        position={Position.Left}
        style="top: 10px; left: -3px; border: unset; border-radius: unset; border-top-left-radius: 2px; border-bottom-left-radius: 2px; height: 10px;"
    />
    <div class="header">
        <span>HTTP REQUEST</span>
    </div>
    <div class="body" style="height: {20 * tmpLabels.length + 10}px;">
        <div class="inputs">
            {#each tmpLabels as lab, i}
                {#if lab.key === "method"}
                    <div class="input-item" style={`top: 5px;`}>
                        <Handle
                            id="method"
                            type="target"
                            position={Position.Left}
                            onconnect={() => {
                                isMethodConnected = true;
                            }}
                            ondisconnect={() => {
                                isMethodConnected = false;
                            }}
                        />
                        <span class="in-label">
                            {#if isMethodConnected}
                                method
                            {:else}
                                <select
                                    bind:value={data.kwargs[i].method}
                                    style="font-size: smaller;"
                                >
                                    <option value="GET">GET</option>
                                    <option value="POST">POST</option>
                                    <option value="PUT">PUT</option>
                                    <option value="DELETE">DELETE</option>
                                </select>
                            {/if}
                        </span>
                    </div>
                {:else if lab.key === "url"}
                    <div class="input-item" style={`top: calc(50% + 5px);`}>
                        <Handle
                            id="url"
                            type="target"
                            position={Position.Left}
                            onconnect={() => {
                                isUrlConnected = true;
                            }}
                            ondisconnect={() => {
                                isUrlConnected = false;
                            }}
                        />
                        <span class="in-label">
                            {#if isUrlConnected}
                                url
                            {:else}
                                <input
                                    style="font-size: smaller;"
                                    type="text"
                                    bind:value={data.kwargs[i].url}
                                    placeholder="url"
                                />
                            {/if}
                        </span>
                    </div>
                {:else}
                    <div
                        class="input-item"
                        style={`top: calc(${i} * (100% / ${tmpLabels.length}) + 5px);`}
                    >
                        <Handle
                            id={`${lab.type === "kwarg" ? lab.key : i}`}
                            type="target"
                            position={Position.Left}
                        />
                        <span class="in-label">
                            {lab?.key}
                        </span>
                    </div>
                {/if}
            {/each}
        </div>
        <div class="outputs">
            <div class="output-item" style={`bottom: 5px;`}>
                <Handle
                    id="__ignore__"
                    type="source"
                    position={Position.Right}
                />
                <span class="out-label">output</span>
            </div>
        </div>
    </div>
    <details class="advanced" open={isAdvancedOpen}>
        <summary
            class="summary"
            on:click|preventDefault|stopPropagation={(event) =>
                (isAdvancedOpen = !isAdvancedOpen)}
        >
            Advanced
        </summary>
        <div
            class="advanced-labs"
            style={`height: calc(${tmpLabelsAdvanced.length} * 20px)`}
        >
            {#each tmpLabelsAdvanced as lab, i}
                <div class="advanced-item">
                    <Handle
                        id={`${lab.type === "kwarg" ? lab.key : i}`}
                        type="target"
                        position={Position.Left}
                        style={`top: ${
                            isAdvancedOpen
                                ? `calc(${i} * (100% / ${
                                      tmpLabelsAdvanced.length + 1
                                  }) + 25px)`
                                : "-10px"
                        };`}
                    />
                    <span
                        class="advanced-in-label"
                        style={`top: calc(${i} * (100% / ${
                            tmpLabelsAdvanced.length + 1
                        }) + 19px)`}
                    >
                        {lab?.key}
                    </span>
                </div>
            {/each}
        </div>
    </details>
    <Handle
        id="e-out"
        type="source"
        position={Position.Right}
        style="top: 10px; right: -3px; border: unset; border-radius: unset; border-top-right-radius: 2px; border-bottom-right-radius: 2px; height: 10px;"
    />
</div>

<style>
    .advanced-in-label {
        position: absolute;
        padding-left: 5px;
    }
    .advanced-labs {
        display: flex;
        flex-direction: column;
    }
    .advanced {
        position: relative;
        width: 100%;
    }
    .summary {
        padding: 6px;
        cursor: pointer;
    }
    .input-item {
        position: absolute;
        left: 0;
        display: flex;
        align-items: center;
    }
    .output-item {
        position: absolute;
        right: 0;
        display: flex;
        align-items: center;
    }
    .out-label {
        padding-right: 5px;
    }
    .in-label {
        padding-left: 5px;
    }
    .body {
        flex: 1 1 auto;
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    .inputs,
    .outputs {
        position: relative;
        flex-grow: 1;
    }
    .node {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
        border-radius: 5px;
        background-color: white;
        font-family: sans-serif;
        font-size: 9px;
    }
    .header {
        flex: 0 0 auto;
        height: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        border-bottom: 1px solid black;
        background-color: #f0f0f0;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
    }
</style>
