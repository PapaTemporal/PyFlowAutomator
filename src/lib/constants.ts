import type { PureConfig, PureDictionary } from "./types";

function arrayToDictionary(array: PureConfig[]): PureDictionary {
    const dictionary: PureDictionary = {};
    for (const item of array) {
        const { name, ...rest } = item;
        dictionary[name] = rest;
    }
    return dictionary;
}

export const comparisonNodes: PureDictionary = arrayToDictionary([
    {
        name: "==",
        label: "==",
        args: [null, null],
        function: "operator.eq"
    },
    {
        name: ">=",
        label: ">=",
        args: [null, null],
        function: "operator.ge"
    },
    {
        name: ">",
        label: ">",
        args: [null, null],
        function: "operator.gt"
    },
    {
        name: "<=",
        label: "<=",
        args: [null, null],
        function: "operator.le"
    },
    {
        name: "<",
        label: "<",
        args: [null, null],
        function: "operator.lt"
    },
    {
        name: "!=",
        label: "!=",
        args: [null, null],
        function: "operator.ne"
    },
]);
export const logicalNodes: PureDictionary = arrayToDictionary([
    {
        name: "is",
        label: "is",
        args: [null, null],
        function: "operator.is_"
    },
    {
        name: "is_not",
        label: "is not",
        args: [null, null],
        function: "operator.is_not"
    },
    {
        name: "not",
        label: "not",
        args: [null],
        function: "operator.not_"
    },
    {
        name: "truth",
        label: "truth",
        args: [null],
        function: "operator.truth"
    },
]);
export const mathNodes: PureDictionary = arrayToDictionary([
    {
        name: "abs",
        label: "abs",
        args: [null],
        function: "operator.abs"
    },
    {
        name: "add",
        label: "+",
        args: [null, null],
        function: "operator.add"
    },
    {
        name: "and",
        label: "and",
        args: [null, null],
        function: "operator.and_"
    },
    {
        name: "floordiv",
        label: "//",
        args: [null, null],
        function: "operator.floordiv"
    },
    {
        name: "index",
        label: "index",
        args: [null],
        function: "operator.index"
    },
    {
        name: "inv",
        label: "inv",
        args: [null],
        function: "operator.inv"
    },
    {
        name: "lshift",
        label: "<<",
        args: [null, null],
        function: "operator.lshift"
    },
    {
        name: "matmul",
        label: "@",
        args: [null, null],
        function: "operator.matmul"
    },
    {
        name: "mod",
        label: "%",
        args: [null, null],
        function: "operator.mod"
    },
    {
        name: "mul",
        label: "*",
        args: [null, null],
        function: "operator.mul"
    },
    {
        name: "neg",
        label: "neg",
        args: [null],
        function: "operator.neg"
    },
    {
        name: "or",
        label: "or",
        args: [null, null],
        function: "operator.or_"
    },
    {
        name: "pos",
        label: "pos",
        args: [null],
        function: "operator.pos"
    },
    {
        name: "pow",
        label: "**",
        args: [null, null],
        function: "operator.pow"
    },
    {
        name: "rshift",
        label: ">>",
        args: [null, null],
        function: "operator.rshift"
    },
    {
        name: "sub",
        label: "-",
        args: [null, null],
        function: "operator.sub"
    },
    {
        name: "truediv",
        label: "/",
        args: [null, null],
        function: "operator.truediv"
    },
    {
        name: "xor",
        label: "^",
        args: [null, null],
        function: "operator.xor"
    },
]);
export const sequenceNodes: PureDictionary = arrayToDictionary([
    {
        name: "concat",
        label: "concat",
        args: [null, null],
        function: "operator.concat"
    },
    {
        name: "contains",
        label: "contains",
        args: [null, null],
        function: "operator.contains"
    },
    {
        name: "countOf",
        label: "countOf",
        args: [null, null],
        function: "operator.countOf"
    },
    {
        name: "delitem",
        label: "del a[b]",
        args: [null, null],
        function: "operator.delitem"
    },
    {
        name: "getitem",
        label: "a[b]",
        args: [null, null],
        function: "operator.getitem"
    },
    {
        name: "indexOf",
        label: "indexOf",
        args: [null, null],
        function: "operator.indexOf"
    },
    {
        name: "setitem",
        label: "a[b]=c",
        args: [null, null, null],
        function: "operator.setitem"
    },
]);
export const inPlaceNodes: PureDictionary = arrayToDictionary([
    {
        name: "iadd",
        label: "+=",
        args: [null, null],
        function: "operator.iadd"
    },
    {
        name: "iand",
        label: "&=",
        args: [null, null],
        function: "operator.iand"
    },
    {
        name: "iconcat",
        label: "+=(seq)",
        args: [null, null],
        function: "operator.iconcat"
    },
    {
        name: "ifloordiv",
        label: "//=",
        args: [null, null],
        function: "operator.ifloordiv"
    },
    {
        name: "ilshift",
        label: "<<=",
        args: [null, null],
        function: "operator.ilshift"
    },
    {
        name: "imatmul",
        label: "@=",
        args: [null, null],
        function: "operator.imatmul"
    },
    {
        name: "imod",
        label: "%=",
        args: [null, null],
        function: "operator.imod"
    },
    {
        name: "imul",
        label: "*=",
        args: [null, null],
        function: "operator.imul"
    },
    {
        name: "ior",
        label: "|=",
        args: [null, null],
        function: "operator.ior"
    },
    {
        name: "ipow",
        label: "**=",
        args: [null, null],
        function: "operator.ipow"
    },
    {
        name: "irshift",
        label: ">>=",
        args: [null, null],
        function: "operator.irshift"
    },
    {
        name: "isub",
        label: "-=",
        args: [null, null],
        function: "operator.isub"
    },
    {
        name: "itruediv",
        label: "/=",
        args: [null, null],
        function: "operator.itruediv"
    },
    {
        name: "ixor",
        label: "^=",
        args: [null, null],
        function: "operator.ixor"
    },
]);
export const castingNodes: PureDictionary = arrayToDictionary([]);

export const pureNodes: PureDictionary = {
    ...comparisonNodes,
    ...logicalNodes,
    ...mathNodes,
    ...sequenceNodes,
    ...inPlaceNodes,
    ...castingNodes,
};