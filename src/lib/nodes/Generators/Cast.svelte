<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    import { Handle, Position, type NodeProps } from "@xyflow/svelte";
    import type { NodePropsExt } from "$lib/types";

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
</script>

<div id={data.name} class="pure-node">
    <Handle id={"0"} type="target" position={Position.Left} />
    <span>{data.label}</span>
    <Handle id="__ignore__" type="source" position={Position.Right} />
</div>

<style>
    .pure-node {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 1rem;
        border: 1px solid black;
        border-radius: 5px;
        background-color: white;
        font-family: sans-serif;
        font-size: 9px;
        padding: 0 10px;
    }
    .pure-node span {
        flex: 0 1 auto;
    }
</style>
