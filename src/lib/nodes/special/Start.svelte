<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    import { Position } from "@xyflow/system";
    import { Handle } from "@xyflow/svelte";
    import type { NodePropsExt } from "$lib/types";

    // unused props - we need to list them here in order to prevent warnings
    export let data: NodePropsExt["data"];
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
    data;
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
</script>

<div id="node" style={`border: 1px solid ${selected ? "blue" : "black"};`}>
    <span>START</span>
    <Handle
        id="start"
        type="source"
        position={Position.Right}
        style="top: 53%; right: -3px; border: unset; border-radius: unset; border-top-right-radius: 2px; border-bottom-right-radius: 2px; height: 10px;"
    />
</div>

<style>
    #node {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 1.5rem;
        width: 5rem;
        border: 1px solid black;
        border-radius: 5px;
        background-color: white;
        font-family: sans-serif;
        font-size: 9px;
    }
</style>
