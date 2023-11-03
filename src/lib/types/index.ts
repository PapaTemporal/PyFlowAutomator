// This file is licensed under the CC BY-NC-SA 4.0 license.
// See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details.

import type { Node, NodeTypes, Edge } from "@xyflow/svelte";
import type { NodeProps } from "@xyflow/system";
import type { Writable } from "svelte/store";

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

export interface MenuItem {
    id: number;
    label: string;
    icon?: string;
    action: (e: MouseEvent) => void;
    shortcut?: string;
    disabled?: boolean;
    visible?: boolean;
    showSubmenu?: boolean;
    submenu?: MenuItem[];
}

export interface CurrentFlow {
    id: Writable<string>;
    name: Writable<string>;
    nodes: Writable<NodeExt[]>;
    edges: Writable<Edge[]>;
    variables: Writable<Variable>;
}

export interface PureConfig {
    name: string;
    label: string;
    args: (null | number | string)[];
    function: string;
}

export interface PureDictionary {
    [key: string]: Omit<PureConfig, 'name'>;
}