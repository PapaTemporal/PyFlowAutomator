// This file is licensed under the CC BY-NC-SA 4.0 license.
// See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details.

import type { Edge } from "@xyflow/svelte";
import type { NodeExt, Variable } from "$lib/types";

const sample_flow = {
    "id": "1234567890",
    "name": "SampleFlow",
    "nodes": [
        {
            "id": "94969",
            "type": "START",
            "data": {
                "function": "__ignore__"
            },
            "position": {
                "x": 478,
                "y": 257
            },
            "positionAbsolute": {
                "x": 478,
                "y": 257
            },
            "width": 82,
            "height": 26,
            "selected": false
        },
        {
            "id": "95082",
            "type": "GET_VARIABLE",
            "data": {
                "kwargs": {
                    "variable_name": "swapi_url"
                },
                "function": "__ignore__"
            },
            "position": {
                "x": 475.5,
                "y": 301.25
            },
            "positionAbsolute": {
                "x": 475.5,
                "y": 301.25
            },
            "width": 82,
            "height": 26,
            "dragging": false,
            "selected": false
        },
        {
            "id": "93043",
            "type": "EXEC",
            "data": {
                "label": "HTTP GET",
                "args": [
                    {
                        "url": null
                    }
                ],
                "function": "requests.get"
            },
            "position": {
                "x": 612,
                "y": 259.75
            },
            "positionAbsolute": {
                "x": 612,
                "y": 259.75
            },
            "width": 102,
            "height": 49,
            "dragging": false,
            "selected": false
        },
        {
            "id": "6367",
            "type": "EXEC",
            "data": {
                "label": "JSON PATH",
                "args": [
                    {
                        "json": null
                    }
                ],
                "kwargs": [
                    {
                        "expression": "$.results"
                    }
                ],
                "function": "custom.extract_json"
            },
            "position": {
                "x": 770.1285742187499,
                "y": 260.12494140625
            },
            "positionAbsolute": {
                "x": 770.1285742187499,
                "y": 260.12494140625
            },
            "width": 102,
            "height": 69,
            "dragging": false,
            "selected": false
        },
        {
            "id": "77775",
            "type": "FOR",
            "data": {
                "kwargs": {
                    "next_function": "72374"
                },
                "function": "for_each"
            },
            "position": {
                "x": 907.63091796875,
                "y": 259.62494140625
            },
            "positionAbsolute": {
                "x": 907.63091796875,
                "y": 259.62494140625
            },
            "width": 98,
            "height": 58,
            "dragging": false,
            "selected": false
        },
        {
            "id": "72374",
            "type": "EXEC",
            "data": {
                "label": "JSON PATH",
                "args": [
                    {
                        "json": null
                    }
                ],
                "kwargs": [
                    {
                        "expression": "$.name"
                    }
                ],
                "function": "custom.extract_json"
            },
            "position": {
                "x": 1050.38134765625,
                "y": 260.87490234374997
            },
            "positionAbsolute": {
                "x": 1050.38134765625,
                "y": 260.87490234374997
            },
            "width": 102,
            "height": 69,
            "dragging": false,
            "selected": false
        },
        {
            "id": "59697",
            "type": "IF",
            "data": {
                "kwargs": {
                    "true": null,
                    "false": null
                },
                "function": "branch"
            },
            "position": {
                "x": 1352.0813952278136,
                "y": 264.51805218658444
            },
            "positionAbsolute": {
                "x": 1352.0813952278136,
                "y": 264.51805218658444
            },
            "width": 98,
            "height": 58,
            "selected": false,
            "dragging": false
        },
        {
            "id": "51034",
            "type": "SET_VARIABLE",
            "data": {
                "kwargs": {
                    "variable_name": "name",
                    "value": null
                },
                "function": "set_variable"
            },
            "position": {
                "x": 1197.63310546875,
                "y": 260.749921875
            },
            "positionAbsolute": {
                "x": 1197.63310546875,
                "y": 260.749921875
            },
            "width": 102,
            "height": 49,
            "dragging": false,
            "selected": false
        },
        {
            "id": "88179",
            "type": "PURE",
            "data": {
                "label": "or",
                "category": "math",
                "args": [
                    false,
                    false
                ],
                "function": "operator.or_"
            },
            "position": {
                "x": 1231.670069216919,
                "y": 335.8632689338685
            },
            "positionAbsolute": {
                "x": 1231.670069216919,
                "y": 335.8632689338685
            },
            "width": 66,
            "height": 34,
            "dragging": false,
            "selected": false
        },
        {
            "id": "92109",
            "type": "PURE",
            "data": {
                "label": "contains",
                "category": "sequence",
                "args": [
                    "C",
                    null
                ],
                "function": "operator.contains"
            },
            "position": {
                "x": 1086.058282596588,
                "y": 372.2318082130432
            },
            "positionAbsolute": {
                "x": 1086.058282596588,
                "y": 372.2318082130432
            },
            "width": 66,
            "height": 34,
            "dragging": false,
            "selected": false
        },
        {
            "id": "85893",
            "type": "GET_VARIABLE",
            "data": {
                "kwargs": {
                    "variable_name": "name"
                },
                "function": "__ignore__"
            },
            "position": {
                "x": 923.2336003555299,
                "y": 370.750390625
            },
            "positionAbsolute": {
                "x": 923.2336003555299,
                "y": 370.750390625
            },
            "width": 82,
            "height": 26,
            "dragging": false,
            "selected": false
        },
        {
            "id": "77638",
            "type": "PURE",
            "data": {
                "label": "contains",
                "category": "sequence",
                "args": [
                    "Luke",
                    null
                ],
                "function": "operator.contains"
            },
            "position": {
                "x": 1087.5582044715882,
                "y": 333.7363363708497
            },
            "positionAbsolute": {
                "x": 1087.5582044715882,
                "y": 333.7363363708497
            },
            "width": 66,
            "height": 34,
            "dragging": false,
            "selected": false
        },
        {
            "id": "25228",
            "type": "EXEC",
            "data": {
                "label": "PRINT",
                "args": [
                    {
                        "text": null
                    }
                ],
                "function": "builtins.print"
            },
            "position": {
                "x": 1484.9415802856447,
                "y": 287.89994259490965
            },
            "positionAbsolute": {
                "x": 1484.9415802856447,
                "y": 287.89994259490965
            },
            "width": 102,
            "height": 49,
            "dragging": false,
            "selected": false
        },
        {
            "id": "50314",
            "type": "GET_VARIABLE",
            "data": {
                "label": "get variable",
                "category": "variables",
                "type": "GET_VARIABLE",
                "kwargs": {
                    "variable_name": "getResults"
                },
                "function": "__ignore__"
            },
            "position": {
                "x": 627.1429961368968,
                "y": 324.0631804170068
            },
            "positionAbsolute": {
                "x": 627.1429961368968,
                "y": 324.0631804170068
            },
            "width": 82,
            "height": 26,
            "selected": false,
            "dragging": false
        },
        {
            "id": "5271",
            "type": "GET_VARIABLE",
            "data": {
                "label": "get variable",
                "category": "variables",
                "type": "GET_VARIABLE",
                "kwargs": {
                    "variable_name": "getName"
                },
                "function": "__ignore__"
            },
            "position": {
                "x": 922.7587595104756,
                "y": 338.437731571654
            },
            "positionAbsolute": {
                "x": 922.7587595104756,
                "y": 338.437731571654
            },
            "width": 82,
            "height": 26,
            "selected": false,
            "dragging": false
        },
        {
            "id": "69325",
            "type": "GET_VARIABLE",
            "data": {
                "label": "get variable",
                "category": "variables",
                "type": "GET_VARIABLE",
                "kwargs": {
                    "variable_name": "luke"
                },
                "function": "__ignore__"
            },
            "position": {
                "x": 922.8497545055981,
                "y": 402.35810402519445
            },
            "positionAbsolute": {
                "x": 922.8497545055981,
                "y": 402.35810402519445
            },
            "width": 82,
            "height": 26,
            "selected": false,
            "dragging": false
        },
        {
            "id": "53059",
            "type": "GET_VARIABLE",
            "data": {
                "label": "get variable",
                "category": "variables",
                "type": "GET_VARIABLE",
                "kwargs": {
                    "variable_name": "3po"
                },
                "function": "__ignore__"
            },
            "position": {
                "x": 923.351472290657,
                "y": 432.9628848881339
            },
            "positionAbsolute": {
                "x": 923.351472290657,
                "y": 432.9628848881339
            },
            "width": 82,
            "height": 26,
            "selected": false,
            "dragging": false
        },
        {
            "id": "50535",
            "type": "GET_VARIABLE",
            "data": {
                "label": "get variable",
                "category": "variables",
                "type": "GET_VARIABLE",
                "kwargs": {
                    "variable_name": "name"
                },
                "function": "__ignore__"
            },
            "position": {
                "x": 1365.8665006717235,
                "y": 332.6193412282405
            },
            "positionAbsolute": {
                "x": 1365.8665006717235,
                "y": 332.6193412282405
            },
            "width": 82,
            "height": 26,
            "selected": true,
            "dragging": false
        }
    ],
    "edges": [
        {
            "source": "94969",
            "sourceHandle": "start",
            "target": "93043",
            "targetHandle": "e-in",
            "id": "xyflow__edge-94969start-93043e-in",
            "selected": false
        },
        {
            "source": "95082",
            "sourceHandle": "swapi_url",
            "target": "93043",
            "targetHandle": "0",
            "id": "xyflow__edge-95082swapi_url-930430",
            "selected": false
        },
        {
            "source": "93043",
            "sourceHandle": "e-out",
            "target": "6367",
            "targetHandle": "e-in",
            "id": "xyflow__edge-93043e-out-6367e-in",
            "selected": false
        },
        {
            "source": "93043",
            "sourceHandle": "__ignore__",
            "target": "6367",
            "targetHandle": "0",
            "id": "xyflow__edge-93043__ignore__-6367json_obj",
            "selected": false
        },
        {
            "source": "6367",
            "sourceHandle": "e-out",
            "target": "77775",
            "targetHandle": "e-in",
            "id": "xyflow__edge-6367e-out-77775e-in",
            "selected": false
        },
        {
            "source": "6367",
            "sourceHandle": "__ignore__",
            "target": "77775",
            "targetHandle": "array",
            "id": "xyflow__edge-6367__ignore__-77775array",
            "selected": false
        },
        {
            "source": "77775",
            "sourceHandle": "next_function",
            "target": "72374",
            "targetHandle": "e-in",
            "id": "xyflow__edge-77775next_function-72374e-in",
            "selected": false
        },
        {
            "source": "77775",
            "sourceHandle": "__ignore__",
            "target": "72374",
            "targetHandle": "0",
            "id": "xyflow__edge-77775__ignore__-72374json_obj",
            "selected": false
        },
        {
            "source": "72374",
            "sourceHandle": "e-out",
            "target": "51034",
            "targetHandle": "e-in",
            "id": "xyflow__edge-72374e-out-51034e-in",
            "selected": false
        },
        {
            "source": "72374",
            "sourceHandle": "__ignore__",
            "target": "51034",
            "targetHandle": "value",
            "id": "xyflow__edge-72374__ignore__-51034value",
            "selected": false
        },
        {
            "source": "51034",
            "sourceHandle": "e-out",
            "target": "59697",
            "targetHandle": "e-in",
            "id": "xyflow__edge-51034e-out-59697e-in",
            "selected": false
        },
        {
            "source": "88179",
            "sourceHandle": "__ignore__",
            "target": "59697",
            "targetHandle": "condition",
            "id": "xyflow__edge-88179__ignore__-59697condition",
            "selected": false
        },
        {
            "source": "92109",
            "sourceHandle": "__ignore__",
            "target": "88179",
            "targetHandle": "1",
            "id": "xyflow__edge-92109__ignore__-881791",
            "selected": false
        },
        {
            "source": "77638",
            "sourceHandle": "__ignore__",
            "target": "88179",
            "targetHandle": "0",
            "id": "xyflow__edge-77638__ignore__-881790",
            "selected": false
        },
        {
            "source": "59697",
            "sourceHandle": "true",
            "target": "25228",
            "targetHandle": "e-in",
            "id": "xyflow__edge-59697true-25228e-in",
            "selected": false
        },
        {
            "source": "93043",
            "sourceHandle": "__ignore__",
            "target": "6367",
            "targetHandle": "0",
            "id": "xyflow__edge-93043__ignore__-63670",
            "selected": false
        },
        {
            "source": "77775",
            "sourceHandle": "__ignore__",
            "target": "72374",
            "targetHandle": "0",
            "id": "xyflow__edge-77775__ignore__-723740",
            "selected": false
        },
        {
            "source": "50314",
            "sourceHandle": "getResults",
            "target": "6367",
            "targetHandle": "expression",
            "id": "xyflow__edge-50314getResults-6367expression",
            "selected": false
        },
        {
            "source": "5271",
            "sourceHandle": "getName",
            "target": "72374",
            "targetHandle": "expression",
            "id": "xyflow__edge-5271getName-72374expression",
            "selected": false
        },
        {
            "source": "85893",
            "sourceHandle": "name",
            "target": "77638",
            "targetHandle": "0",
            "id": "xyflow__edge-85893name-776380",
            "selected": false
        },
        {
            "source": "85893",
            "sourceHandle": "name",
            "target": "92109",
            "targetHandle": "0",
            "id": "xyflow__edge-85893name-921090",
            "selected": false
        },
        {
            "source": "69325",
            "sourceHandle": "luke",
            "target": "77638",
            "targetHandle": "1",
            "id": "xyflow__edge-69325luke-776381",
            "selected": false
        },
        {
            "source": "53059",
            "sourceHandle": "3po",
            "target": "92109",
            "targetHandle": "1",
            "id": "xyflow__edge-530593po-921091",
            "selected": false
        },
        {
            "source": "50535",
            "sourceHandle": "name",
            "target": "25228",
            "targetHandle": "0",
            "id": "xyflow__edge-50535name-252280"
        }
    ],
    "variables": {
        "name": "",
        "swapi_url": "https://swapi.dev/api/people/",
        "getResults": "$.results",
        "getName": "$.name",
        "luke": "Luke",
        "3po": "C-3PO"
    }
};

export const sample_variables: Variable = sample_flow.variables;

export const sample_nodes: NodeExt[] = sample_flow.nodes;

export const sample_edges: Edge[] = sample_flow.edges;

