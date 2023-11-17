// This file is licensed under the CC BY-NC-SA 4.0 license.
// See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details.

// This file contains the definitions of all nodes that are available in the
// editor.
//
// The nodes are grouped into four categories: pure, cast, executable
// and special nodes. The "type" is the component that is used to render the node.
//
//   ::PureNodes (use PURE as type) are nodes that do not need to be executed as 
//   part of the execution flow, but should be evaluated if an executable node 
//   needs the result of the pure node. e.g. an "if" needs pure nodes as the condition.
//
//   ::CastNodes (use CAST as type) are special pure nodes that are used to cast between types.
//
//   ::ExecutableNodes (use EXEC or <custom> as type) are nodes that are executed as part of 
//   the flow. e.g. an "http get" node uses EXEC as type, while a "for each" node uses a custom 
//   type called "FOR".
//
//   ::SpecialNodes (use the specific type) are nodes that are not executed as part of the flow.
//   e.g. a "get variable" node is used to get the value of a variable, but is not executed as
//   part of the flow.
// 
// Most nodes are generated from the definitions in this file using a generator svelte 
// component (see $lib/nodes/Generators for examples). Others such as the special and 
// some exec nodes are defined as custom svelte components.
//
// CREATING A NODE: 
//   If you want the node to have a custom look, you can create a custom svelte 
//   component under $lib/nodes and import it here, then add it to nodeTypes and the definition 
//   to the executablefNodes with the nodeTypes key as the type.
//
//   Or you can use an existing generator as type or create a generator component under 
//   $lib/nodes/Generators and then just add the node definition below.

import type { NodeTypesExt, PureDictionary } from "../types";

// import all node svelte components, including generators and custom nodes
import PURE from './Generators/Pure.svelte';
import CAST from './Generators/Cast.svelte';
import EXEC from './Generators/Exec.svelte';
import GET_VARIABLE from './special/GetVariable.svelte';
import START from './special/Start.svelte';
import IF from './exec/Branch.svelte';
import FOR from './exec/ForEach.svelte';
import SET_VARIABLE from './exec/SetVariable.svelte';
import HTTP_REQUEST from './exec/HttpRequest.svelte';

// used to pass custom node types into svelteflow and for use in node definitions
export const nodeTypes: NodeTypesExt = {
    // pure function
    PURE,
    // cast function
    CAST,
    // executable functions
    EXEC,
    HTTP_REQUEST,
    // custom functions
    GET_VARIABLE,
    // executable functions
    IF,
    FOR,
    SET_VARIABLE,
    START,
}

// node definitions
const pureNodes: PureDictionary = {
    "==": {
        label: "==",
        category: "comparison",
        type: "PURE",
        args: [null, null],
        function: "operator.eq"
    },
    ">=": {
        label: ">=",
        category: "comparison",
        type: "PURE",
        args: [null, null],
        function: "operator.ge"
    },
    ">": {
        label: ">",
        category: "comparison",
        type: "PURE",
        args: [null, null],
        function: "operator.gt"
    },
    "<=": {
        label: "<=",
        category: "comparison",
        type: "PURE",
        args: [null, null],
        function: "operator.le"
    },
    "<": {
        label: "<",
        category: "comparison",
        type: "PURE",
        args: [null, null],
        function: "operator.lt"
    },
    "!=": {
        label: "!=",
        category: "comparison",
        type: "PURE",
        args: [null, null],
        function: "operator.ne"
    },
    "is": {
        label: "is",
        category: "logical",
        type: "PURE",
        args: [null, null],
        function: "operator.is_"
    },
    "is_not": {
        label: "is not",
        category: "logical",
        type: "PURE",
        args: [null, null],
        function: "operator.is_not"
    },
    "not": {
        label: "not",
        category: "logical",
        type: "PURE",
        args: [null],
        function: "operator.not_"
    },
    "truth": {
        label: "truth",
        category: "logical",
        type: "PURE",
        args: [null],
        function: "operator.truth"
    },
    "abs": {
        label: "abs",
        category: "math",
        type: "PURE",
        args: [null],
        function: "operator.abs"
    },
    "add": {
        label: "+",
        category: "math",
        type: "PURE",
        args: [null, null],
        function: "operator.add"
    },
    "and": {
        label: "and",
        category: "math",
        type: "PURE",
        args: [null, null],
        function: "operator.and_"
    },
    "floordiv": {
        label: "//",
        category: "math",
        type: "PURE",
        args: [null, null],
        function: "operator.floordiv"
    },
    "index": {
        label: "index",
        category: "math",
        type: "PURE",
        args: [null],
        function: "operator.index"
    },
    "inv": {
        label: "inv",
        category: "math",
        type: "PURE",
        args: [null],
        function: "operator.inv"
    },
    "lshift": {
        label: "<<",
        category: "math",
        type: "PURE",
        args: [null, null],
        function: "operator.lshift"
    },
    "matmul": {
        label: "@",
        category: "math",
        type: "PURE",
        args: [null, null],
        function: "operator.matmul"
    },
    "mod": {
        label: "%",
        category: "math",
        type: "PURE",
        args: [null, null],
        function: "operator.mod"
    },
    "mul": {
        label: "*",
        category: "math",
        type: "PURE",
        args: [null, null],
        function: "operator.mul"
    },
    "neg": {
        label: "neg",
        category: "math",
        type: "PURE",
        args: [null],
        function: "operator.neg"
    },
    "or": {
        label: "or",
        category: "math",
        type: "PURE",
        args: [null, null],
        function: "operator.or_"
    },
    "pos": {
        label: "pos",
        category: "math",
        type: "PURE",
        args: [null],
        function: "operator.pos"
    },
    "pow": {
        label: "**",
        category: "math",
        type: "PURE",
        args: [null, null],
        function: "operator.pow"
    },
    "rshift": {
        label: ">>",
        category: "math",
        type: "PURE",
        args: [null, null],
        function: "operator.rshift"
    },
    "sub": {
        label: "-",
        category: "math",
        type: "PURE",
        args: [null, null],
        function: "operator.sub"
    },
    "truediv": {
        label: "/",
        category: "math",
        type: "PURE",
        args: [null, null],
        function: "operator.truediv"
    },
    "xor": {
        label: "^",
        category: "math",
        type: "PURE",
        args: [null, null],
        function: "operator.xor"
    },
    "concat": {
        label: "concat",
        category: "sequence",
        type: "PURE",
        args: [null, null],
        function: "operator.concat"
    },
    "contains": {
        label: "contains",
        category: "sequence",
        type: "PURE",
        args: [null, null],
        function: "operator.contains"
    },
    "countOf": {
        label: "countOf",
        category: "sequence",
        type: "PURE",
        args: [null, null],
        function: "operator.countOf"
    },
    "delitem": {
        label: "del a[b]",
        category: "sequence",
        type: "PURE",
        args: [null, null],
        function: "operator.delitem"
    },
    "getitem": {
        label: "a[b]",
        category: "sequence",
        type: "PURE",
        args: [null, null],
        function: "operator.getitem"
    },
    "indexOf": {
        label: "indexOf",
        category: "sequence",
        type: "PURE",
        args: [null, null],
        function: "operator.indexOf"
    },
    "setitem": {
        label: "a[b]=c",
        category: "sequence",
        type: "PURE",
        args: [null, null, null],
        function: "operator.setitem"
    },
    "iadd": {
        label: "+=",
        category: "in-place",
        type: "PURE",
        args: [null, null],
        function: "operator.iadd"
    },
    "iand": {
        label: "&=",
        category: "in-place",
        type: "PURE",
        args: [null, null],
        function: "operator.iand"
    },
    "iconcat": {
        label: "+=(seq)",
        category: "in-place",
        type: "PURE",
        args: [null, null],
        function: "operator.iconcat"
    },
    "ifloordiv": {
        label: "//=",
        category: "in-place",
        type: "PURE",
        args: [null, null],
        function: "operator.ifloordiv"
    },
    "ilshift": {
        label: "<<=",
        category: "in-place",
        type: "PURE",
        args: [null, null],
        function: "operator.ilshift"
    },
    "imatmul": {
        label: "@=",
        category: "in-place",
        type: "PURE",
        args: [null, null],
        function: "operator.imatmul"
    },
    "imod": {
        label: "%=",
        category: "in-place",
        type: "PURE",
        args: [null, null],
        function: "operator.imod"
    },
    "imul": {
        label: "*=",
        category: "in-place",
        type: "PURE",
        args: [null, null],
        function: "operator.imul"
    },
    "ior": {
        label: "|=",
        category: "in-place",
        type: "PURE",
        args: [null, null],
        function: "operator.ior"
    },
    "ipow": {
        label: "**=",
        category: "in-place",
        type: "PURE",
        args: [null, null],
        function: "operator.ipow"
    },
    "irshift": {
        label: ">>=",
        category: "in-place",
        type: "PURE",
        args: [null, null],
        function: "operator.irshift"
    },
    "isub": {
        label: "-=",
        category: "in-place",
        type: "PURE",
        args: [null, null],
        function: "operator.isub"
    },
    "itruediv": {
        label: "/=",
        category: "in-place",
        type: "PURE",
        args: [null, null],
        function: "operator.itruediv"
    },
    "ixor": {
        label: "^=",
        category: "in-place",
        type: "PURE",
        args: [null, null],
        function: "operator.ixor"
    },
};

const castNodes: PureDictionary = {
    "toBool": {
        label: "bool",
        category: "cast",
        type: "CAST",
        args: [null],
        function: "builtins.bool"
    },
    "toByteArray": {
        label: "byte[]",
        category: "cast",
        type: "CAST",
        args: [null],
        function: "builtins.bytearray"
    },
    "toBytes": {
        label: "bytes",
        category: "cast",
        type: "CAST",
        args: [null],
        function: "builtins.bytes"
    },
    "toDict": {
        label: "dict",
        category: "cast",
        type: "CAST",
        args: [null],
        function: "builtins.dict"
    },
    "toFloat": {
        label: "float",
        category: "cast",
        type: "CAST",
        args: [null],
        function: "operator.float"
    },
    "toInt": {
        label: "int",
        category: "cast",
        type: "CAST",
        args: [null],
        function: "builtins.int"
    },
    "toList": {
        label: "list",
        category: "cast",
        type: "CAST",
        args: [null],
        function: "builtins.list"
    },
    "toStr": {
        label: "str",
        category: "cast",
        type: "CAST",
        args: [null],
        function: "builtins.str"
    },
    "toTuple": {
        label: "tuple",
        category: "cast",
        type: "CAST",
        args: [null],
        function: "builtins.tuple"
    },
    "toSet": {
        label: "set",
        category: "cast",
        type: "CAST",
        args: [null],
        function: "builtins.set"
    },
    "toFrozenSet": {
        label: "frozen set",
        category: "cast",
        type: "CAST",
        args: [null],
        function: "builtins.frozenset"
    },
    "enumerate": {
        label: "enumerate",
        category: "cast",
        type: "CAST",
        args: [null],
        function: "builtins.enumerate"
    },
    "reversed": {
        label: "reversed",
        category: "cast",
        type: "CAST",
        args: [null],
        function: "builtins.reversed"
    },
    "sorted": {
        label: "sorted",
        category: "cast",
        type: "CAST",
        args: [null],
        function: "builtins.sorted"
    },
};

const executableNodes: PureDictionary = {
    "if": {
        label: "if",
        category: "logic",
        type: "IF",
        kwargs: { "true": null, "false": null },
        function: "branch"
    },
    "for": {
        label: "for each",
        category: "logic",
        type: "FOR",
        kwargs: { next_function: null },
        function: "for_each"
    },
    "http_get": {
        label: "http request",
        category: "http",
        type: "HTTP_REQUEST",
        kwargs: [
            { method: "GET" }, { url: null },
            { params: null, advanced: true },
            { headers: null, advanced: true },
            { data: null, advanced: true },
            { json: null, advanced: true },
            { cookies: null, advanced: true },
            { files: null, advanced: true },
            { auth: null, advanced: true },
            { timeout: null, advanced: true },
            { allow_redirects: null, advanced: true },
            { proxies: null, advanced: true },
            { verify: null, advanced: true },
            { stream: null, advanced: true },
            { cert: null, advanced: true }
        ],
        function: "requests.request"
    },
    "json_path": {
        label: "json path",
        category: "data",
        type: "EXEC",
        args: [{ json: null }],
        kwargs: [{ expression: null }],
        function: "extract_json"
    },
}

const specialNodes: PureDictionary = {
    "get_variable": {
        label: "get variable",
        category: "variables",
        type: "GET_VARIABLE",
        kwargs: { variable_name: "" },
        function: "__ignore__"
    },
    "set_variable": {
        label: "set variable",
        category: "variables",
        type: "SET_VARIABLE",
        kwargs: { variable_name: null, value: null },
        function: "set_variable"
    },
    "start": {
        label: "start",
        category: "flow",
        type: "START",
        function: "__ignore__"
    },
}
// end of node definitions

const rootNodesList = Object.fromEntries(
    Object.entries({ ...pureNodes, ...executableNodes, ...castNodes })
);

// used by +page.svelte to get node definitions for nodeTypes
export const nodeTypeDefs = {
    specialNodes,
    rootNodesList,
}

// used in menuItems.ts to create a helper flow with all nodes
// will be removed when version 1.0 is released
export const allNodesList = Object.fromEntries(
    Object.entries({ ...pureNodes, ...executableNodes, ...castNodes, ...specialNodes })
);

// used by NodesSection.svelte to show the list of nodes grouped by category
// Nodes (by key) that should not be listed in the nodes section.
const unlistedNodes = ["get_variable", "set_variable", "start", "print"];
const filteredNodesList = Object.fromEntries(
    Object.entries({ ...pureNodes, ...executableNodes, ...castNodes, ...specialNodes }).filter(
        ([key]) => !unlistedNodes.includes(key)
    )
);
export const groupedNodesList = getGroupedNodes();
function getGroupedNodes() {
    const groupedNodes: { [category: string]: string[] } = {};
    for (const key of Object.keys(filteredNodesList)) {
        const category = filteredNodesList[key].category;
        if (!groupedNodes[category]) {
            groupedNodes[category] = [];
        }
        groupedNodes[category].push(key);
    }
    return groupedNodes;
}