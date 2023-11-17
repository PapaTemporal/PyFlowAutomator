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

    if (data.args) {
        const argsWithTypes = data.args.map((arg: any) => {
            if (typeof arg === "string" || arg === undefined || arg === null)
                return { value: arg, type: "arg" };
            if (typeof arg === "number")
                return { value: arg.toString(), type: "arg" };
            const [key, value] = Object.entries(arg)[0];
            return { key, value, type: "arg" };
        });
        tmpLabels.push(...argsWithTypes);
    }

    if (data.kwargs) {
        const kwargsWithTypes = data.kwargs.map((kwarg: any) => {
            const [key, value] = Object.entries(kwarg)[0];
            return { key, value, type: "kwarg" };
        });
        tmpLabels.push(...kwargsWithTypes);
    }
</script>

<div class="node">
    <Handle
        id="e-in"
        type="target"
        position={Position.Left}
        style="top: 10px; left: -3px; border: unset; border-radius: unset; border-top-left-radius: 2px; border-bottom-left-radius: 2px; height: 10px;"
    />
    <div class="header">
        <span>{data.label}</span>
    </div>
    <div class="body" style="height: {20 * tmpLabels.length + 10}px;">
        <div class="inputs">
            {#each tmpLabels as lab, i}
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
    <Handle
        id="e-out"
        type="source"
        position={Position.Right}
        style="top: 10px; right: -3px; border: unset; border-radius: unset; border-top-right-radius: 2px; border-bottom-right-radius: 2px; height: 10px;"
    />
</div>

<style>
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
        min-width: 100px;
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
