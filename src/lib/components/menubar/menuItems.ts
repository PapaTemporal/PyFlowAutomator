// This file is licensed under the CC BY-NC-SA 4.0 license.
// See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details.

import type { MenuItem } from "$lib/types";
import { get, writable, type Writable } from "svelte/store";
import { sample_edges, sample_nodes, sample_variables } from "$lib/sample/logic_flow";
import { allNodesList } from "$lib/nodes";
import type { Node } from "@xyflow/svelte";


export let openMenu: Writable<string | null> = writable(null);

export function getFlowMenuItems(contexts: any, dispatch: any) {
    const { id, name, nodes, edges, variables, myFlowOpen } = contexts;

    let flowMenuItems: Writable<MenuItem[]> = writable([
        {
            id: 1,
            label: "New Flow",
            action: (e: MouseEvent) => {
                const randomId = Math.floor(Math.random() * 1000000).toString(); // generates a random number between 0 and 999999
                const randomName = `Flow${randomId}`; // appends the random number to 'Flow' to create a random name

                id.set(randomId);
                name.set(randomName);
                nodes.set([
                    {
                        id: "1",
                        type: "START",
                        data: { function: "__ignore__" },
                        position: { x: 0, y: 0 },
                    },
                ]);
                edges.set([]);
                variables.set({});
                openMenu.set(null);
                myFlowOpen.set(true);
            },
        },
        {
            id: 2,
            label: "New Flow from Clipboard",
            action: (e: MouseEvent) => {
                navigator.clipboard.readText().then(
                    (text) => {
                        try {
                            const randomId = Math.floor(
                                Math.random() * 1000000
                            ).toString(); // generates a random number between 0 and 999999
                            const randomName = `Flow${randomId}`; // appends the random number to 'Flow' to create a random name

                            const flow = JSON.parse(text);
                            id.set(flow.id || randomId);
                            name.set(flow.name || randomName);
                            nodes.set(flow.nodes);
                            edges.set(flow.edges);
                            variables.set(flow.variables);
                            myFlowOpen.set(true);
                        } catch (e) {
                            alert(e);
                        }
                    },
                    (e) => alert(e)
                );
                openMenu.set(null);
            },
        },
        {
            id: 3,
            label: "Open Flow from File",
            action: (e: MouseEvent) => {
                const input = document.createElement("input");
                input.type = "file";
                input.onchange = () => {
                    const file = input.files && input.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function (event) {
                            if (event.target) {
                                try {
                                    const flow = JSON.parse(
                                        event.target.result as string
                                    );
                                    id.set(flow.id);
                                    name.set(flow.name);
                                    nodes.set(flow.nodes);
                                    edges.set(flow.edges);
                                    variables.set(flow.variables);
                                    myFlowOpen.set(true);
                                } catch (e) {
                                    console.log(e);
                                } finally {
                                    input.remove();
                                }
                            }
                        };
                        reader.readAsText(file);
                    }
                };
                input.click();
                openMenu.set(null);
            },
        },
        {
            id: 4,
            label: "Open Flow from URL",
            action: async (e: MouseEvent) => {
                const url = "https://example.com/api/flow"; // replace with your API URL
                try {
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error(
                            `HTTP error! status: ${response.status}`
                        );
                    }
                    const flow = await response.json();
                    id.set(flow.id);
                    name.set(flow.name);
                    nodes.set(flow.nodes);
                    edges.set(flow.edges);
                    variables.set(flow.variables);
                    myFlowOpen.set(true);
                } catch (e) {
                    console.log(e);
                }
                openMenu.set(null);
            },
            disabled: true,
        },
        {
            id: 5,
            label: "Load Sample Flow",
            action: (e: MouseEvent) => {
                id.set("1234567890");
                name.set("SampleFlow");
                nodes.set(sample_nodes);
                edges.set(sample_edges);
                variables.set(sample_variables);
                openMenu.set(null);
                myFlowOpen.set(true);
            },
        },
        {
            id: 6,
            label: "Load All Nodes",
            action: (e: MouseEvent) => {
                const nodesPerRow = 5;
                const nodeHeight = 70;
                const nodeWidth = 200;
                let x = 0;
                let y = 0;
                let newNodes = [];
                const tmpNodesList = Object.entries(allNodesList).map(
                    ([k, node]) => node
                );
                for (let i = 0; i < tmpNodesList.length; i++) {
                    const nodeType = tmpNodesList[i].type;
                    if (
                        nodeType.includes("GET_VARIABLE") ||
                        nodeType.includes("SET_VARIABLE")
                    ) {
                        (
                            tmpNodesList[i].kwargs as {
                                variable_name: string;
                            }
                        ).variable_name = "MY_VAR";
                    }
                    newNodes.push({
                        id: Math.trunc(Math.random() * 100000).toString(),
                        type: nodeType,
                        data: tmpNodesList[i],
                        position: { x: x * nodeWidth, y: y * nodeHeight },
                    });
                    x++;
                    if (x >= nodesPerRow) {
                        x = 0;
                        y++;
                    }
                }
                id.set("12345678901");
                name.set("AllNodes");
                nodes.set(newNodes);
                edges.set([]);
                variables.set({});
                openMenu.set(null);
            },
        },
        {
            id: 7,
            label: "Save Flow",
            action: (e: MouseEvent) => {
                const fileName = `${get(id)}.json`;
                const text = JSON.stringify(
                    {
                        id: get(id),
                        name: get(name),
                        nodes: get(nodes),
                        edges: get(edges),
                        variables: get(variables),
                    },
                    null,
                    4
                );
                const blob = new Blob([text], { type: "application/json" });
                const url = window.URL || window.webkitURL;
                const link = url.createObjectURL(blob);

                let a = document.createElement("a");
                a.setAttribute("download", fileName);
                a.setAttribute("href", link);
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                openMenu.set(null);
            },
            disabled: get(id) === "",
        },
        {
            id: 8,
            label: "Save Flow As...",
            action: (e: MouseEvent) => console.log("Save Flow"),
            disabled: true,
        },
        {
            id: 9,
            label: "Save Flow to Clipboard",
            action: (e: MouseEvent) => {
                const text = JSON.stringify(
                    {
                        id: get(id),
                        name: get(name),
                        nodes: get(nodes),
                        edges: get(edges),
                        variables: get(variables),
                    },
                    null,
                    4
                );
                navigator.clipboard.writeText(text).then(
                    () => dispatch("copy", text),
                    (e) => dispatch("fail", e)
                );
                openMenu.set(null);
            },
            disabled: get(id) === "",
        },
        {
            id: 10,
            label: "Clear Flow",
            action: (e: MouseEvent) => {
                nodes.set([
                    {
                        id: "1",
                        type: "START",
                        data: { function: "__ignore__" },
                        position: { x: 0, y: 0 },
                    },
                ]);
                edges.set([]);
                variables.set({});
                openMenu.set(null);
            },
            disabled: get(id) === "",
        },
        {
            id: 11,
            label: "Close Flow",
            action: (e: MouseEvent) => {
                id.set("");
                name.set("");
                nodes.set([]);
                edges.set([]);
                variables.set({});
                openMenu.set(null);
            },
            disabled: get(id) === "",
        },
    ]);

    return flowMenuItems;
}

export function getRunMenuItems(contexts: { [key: string]: Writable<any> }) {
    const { id, name, nodes, edges, variables, liveRunOpen } = contexts;

    let runMenuItems: Writable<MenuItem[]> = writable([
        {
            id: 1,
            label: "Run Flow",
            action: async (e: MouseEvent) => {
                if (get(nodes).length === 0) {
                    alert("Flow is empty");
                    return;
                }
                if (
                    get(nodes).filter((node: Node) => node.type === "START").length === 0
                ) {
                    alert("Flow does not have a START node");
                    return;
                }
                await fetch("http://localhost:8000/api/run", {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: "follow",
                    referrerPolicy: "no-referrer",
                    body: JSON.stringify({
                        id: get(id),
                        name: get(name),
                        nodes: get(nodes),
                        edges: get(edges),
                        variables: get(variables),
                    }),
                })
                    .then((response) => response.json())
                    .catch((e) => console.log(e));
                openMenu.set(null);
            },
        },
        {
            id: 2,
            label: "Open Live",
            action: (e: MouseEvent) => {
                liveRunOpen.set(!get(liveRunOpen));
                openMenu.set(null);
            },
        },
    ]);

    return runMenuItems;

}

