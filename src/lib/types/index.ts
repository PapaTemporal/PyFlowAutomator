import type { Node, NodeTypes } from "@xyflow/svelte";
import type { NodeProps } from "@xyflow/system";

export interface NodeExt extends Node {
    data: { [key: string]: any };
}

export interface NodeTypesExt extends NodeTypes {
    [key: string]: any;
}

export interface Variable {
    [key: string]: string;
}

export interface NodePropsExt extends NodeProps {
    function: string | null;
    args: any[];
    kwargs: { [key: string]: any };
}