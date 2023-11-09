// This file is licensed under the CC BY-NC-SA 4.0 license.
// See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details.

import type { NodeExt, Variable } from "$lib/types";
import type { Edge } from "@xyflow/svelte";
import { getContext } from "svelte";
import type { Writable } from "svelte/store";

export function getContexts() {
    const id: Writable<string> = getContext("id");
    const name: Writable<string> = getContext("name");
    const nodes: Writable<NodeExt[]> = getContext("nodes");
    const edges: Writable<Edge[]> = getContext("edges");
    const variables: Writable<Variable> = getContext("variables");
    const configOpen: Writable<boolean> = getContext("configOpen");
    const myFlowOpen: Writable<boolean> = getContext("myFlowOpen");
    const liveRunOpen: Writable<boolean> = getContext("liveRunOpen");

    return { id, name, nodes, edges, variables, configOpen, myFlowOpen, liveRunOpen };
}