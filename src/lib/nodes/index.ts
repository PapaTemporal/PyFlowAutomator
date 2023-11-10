// This file is licensed under the CC BY-NC-SA 4.0 license.
// See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details.

// import pure function
import PURE from './Generators/Pure.svelte';
// import cast function
import CAST from './Generators/Cast.svelte';
// import executable functions
import EXEC from './Generators/Exec.svelte';
// import custom functions
import GET_VARIABLE from './special/GetVariable.svelte';
import SET_VARIABLE from './special/SetVariable.svelte';
import START from './special/Start.svelte';
// import executable functions
import IF from './exec/Branch.svelte';
import FOR from './exec/ForEach.svelte';

export {
    // pure function
    PURE,
    // cast function
    CAST,
    // executable functions
    EXEC,
    // custom functions
    GET_VARIABLE,
    // executable functions
    IF,
    FOR,
    SET_VARIABLE,
    START,
}


