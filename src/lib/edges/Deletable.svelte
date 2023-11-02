<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    import {
        BaseEdge,
        EdgeLabelRenderer,
        type EdgeProps,
    } from "@xyflow/svelte";
    import { getBezierPath } from "@xyflow/system";

    type $$Props = EdgeProps;

    const markerEnd = $$props.markerEnd;
    const style = $$props.style;

    $: [edgePath, labelX, labelY] = getBezierPath({
        sourceX: $$props.sourceX,
        sourceY: $$props.sourceY,
        targetX: $$props.targetX,
        targetY: $$props.targetY,
        sourcePosition: $$props.sourcePosition,
        targetPosition: $$props.targetPosition,
    });

    const onEdgeClick = (e: MouseEvent, id: any) => {
        e.stopPropagation();
        e.preventDefault();
    };
</script>

<BaseEdge path={edgePath} {markerEnd} {style} />
<EdgeLabelRenderer>
    <div
        style="position: absolute; transform: translate(-50%, -50%) translate({labelX}px,{labelY}px); fontSize: 12; pointerEvents: all;"
        class="nodrag nopan"
    >
        <button
            class="edgebutton"
            on:click={(event) => onEdgeClick(event, $$props.id)}
        >
            ×
        </button>
    </div>
</EdgeLabelRenderer>

<style>
    .edgebutton {
        width: 20px;
        height: 20px;
        background: #eee;
        border: 1px solid #fff;
        cursor: pointer;
        border-radius: 50%;
        font-size: 12px;
        line-height: 1;
    }
    .edgebutton:hover {
        box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.08);
    }
</style>
