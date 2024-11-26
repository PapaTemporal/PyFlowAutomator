import { useState } from 'react';
import './App.css';
import { CodeEditor } from '@grafana/ui';
import * as monaco from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';

const comparisonOperators = [
  'eq', 'gt', 'gte', 'lt', 'lte', 'ne', 'in', 'nin', 'exists'
];

const logicalOperators = [
  'and', 'not', 'nor', 'or'
];

const mongoOperators = [
  'accumulator', 'addToSet', 'avg', 'bottom', 'bottomN', 'covariancePop',
  'covarianceSamp', 'count', 'derivative', 'denseRank', 'documentNumber',
  'expMovingAvg', 'first', 'firstN', 'integral', 'last', 'lastN', 'max',
  'maxN', 'median', 'min', 'minN', 'percentile', 'push', 'rank', 'stdDevPop',
  'stdDevSamp', 'shift', 'sum', 'top', 'topN', 'locf', 'linearFill',
  'convert', 'ltrim', 'rtrim', 'toBool', 'toDate', 'toDecimal', 'toDouble',
  'toInt', 'toLong', 'toObjectId', 'toString', 'trim', 'abs', 'add',
  'allElementsTrue', 'anyElementTrue', 'arrayElemAt', 'arrayToObject',
  'binarySize', 'bsonSize', 'ceil', 'cmp', 'concat', 'concatArrays', 'cond',
  'dateAdd', 'dateDiff', 'dateFromParts', 'dateFromString', 'dateSubtract',
  'dateToParts', 'dateToString', 'dateTrunc', 'dayOfMonth', 'dayOfWeek',
  'dayOfYear', 'divide', 'exp', 'filter', 'floor', 'function',
  'getField', 'hour', 'ifNull', 'indexOfArray',
  'indexOfBytes', 'indexOfCP', 'isArray', 'isNumber', 'isoDayOfWeek',
  'isoWeek', 'isoWeekYear', 'let', 'literal', 'ln', 'log', 'log10', 'map',
  'mergeObjects', 'meta', 'millisecond', 'minute', 'mod', 'month', 'multiply',
  'objectToArray', 'pow', 'range', 'reduce', 'regexFind',
  'regexFindAll', 'regexMatch', 'replaceAll', 'replaceOne', 'reverseArray',
  'second', 'setDifference', 'setEquals', 'setIntersection', 'setIsSubset',
  'setUnion', 'size', 'slice', 'sortArray', 'split', 'sqrt', 'strcasecmp',
  'strLenBytes', 'strLenCP', 'substr', 'substrBytes', 'substrCP', 'subtract',
  'switch', 'toHashedIndexKey', 'toLower', 'toUpper', 'tsSecond', 'tsIncrement',
  'trunc', 'type', 'week', 'year', 'zip', 'bitAnd', 'bitOr', 'bitXor',
  'bitNot', 'all', 'bitsAllClear', 'bitsAllSet', 'bitsAnyClear', 'bitsAnySet',
  'comment', 'elemMatch', 'expr', 'geoIntersects', 'geoWithin',
  'jsonSchema', 'near', 'nearSphere',
  'regex', 'text', 'where', 'addFields', 'bucket', 'bucketAuto',
  'changeStream', 'collStats', 'currentOp', 'densify', 'documents', 'facet',
  'fill', 'geoNear', 'graphLookup', 'group', 'indexStats', 'limit',
  'listLocalSessions', 'lookup', 'match', 'merge', 'out', 'project',
  'redact', 'replaceRoot', 'replaceWith', 'sample', 'search', 'searchMeta',
  'set', 'setWindowFields', 'skip', 'sort', 'sortByCount', 'unionWith',
  'unset', 'unwind', 'vectorSearch'
];

// Define MonacoEnvironment.getWorker
self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new JsonWorker();
    }
    return new EditorWorker();
  },
};

monaco.languages.register({ id: 'mongodb' });

monaco.languages.setMonarchTokensProvider('mongodb', {
  tokenizer: {
    root: [
      [/^[a-zA-Z_$][\w$]*(?=\.)/, 'dbName'],
      [/[a-zA-Z_$][\w$]*(?=\.)/, 'collectionName'],
      [/(find|aggregate)(?=\()/, { token: 'function', next: '@mongoQuery' }],
      [/\s+/, 'white'],
    ],

    mongoQuery: [
      // Enter query state
      [/\(/, { token: 'keyword' }],
      // Exit query state
      [/\)/, { token: 'keyword', next: '@pop' }],

      // MongoDB operators
      [new RegExp('\\$(' + mongoOperators.join('|') + ')\\b'), 'mongoOperator'],

      // Field names in quotes
      [/"([^"]*)"(?=\s*:)/, 'mongoField'],

      // MongoDB comparison operators
      [new RegExp('\\$(' + comparisonOperators.join('|') + ')\\b'), 'mongoComparison'],

      // MongoDB logical operators
      [new RegExp('\\$(' + logicalOperators.join('|') + ')\\b'), 'mongoLogical'],

      // Delimiters and syntax
      [/{/, 'delimiter.curly'],
      [/}/, 'delimiter.curly'],
      [/\[/, 'delimiter.square'],
      [/\]/, 'delimiter.square'],
      [/,/, 'delimiter'],
      [/:/, 'delimiter'],

      // Values
      [/"[^"]*"/, 'string'],
      [/\d+/, 'number'],
      [/true|false/, 'boolean'],
      [/null/, 'null'],

      // Whitespace
      [/\s+/, 'white'],
    ],
  },
});

monaco.languages.setLanguageConfiguration('mongodb', {
  comments: {
    lineComment: '//',
    blockComment: ['/*', '*/']
  },
  brackets: [
    ['{', '}'],
    ['[', ']'],
    ['(', ')']
  ],
  autoClosingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: "'", close: "'", notIn: ['string', 'comment'] },
    { open: '"', close: '"', notIn: ['string'] },
    { open: '`', close: '`', notIn: ['string', 'comment'] },
    { open: '/**', close: ' */', notIn: ['string'] }
  ],
  surroundingPairs: [
    ['{', '}'],
    ['[', ']'],
    ['(', ')'],
    ["'", "'"],
    ['"', '"'],
    ['`', '`']
  ],
  folding: {
    markers: {
      start: /^\s*\/\/\s*#?region\b/,
      end: /^\s*\/\/\s*#?endregion\b/
    }
  }
});

monaco.languages.registerCompletionItemProvider('mongodb', {
  provideCompletionItems: () => {
    const funcSuggestions = [
      {
        label: 'find',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'find({})',
      },
      {
        label: 'aggregate',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'aggregate([])',
      },
    ];

    const operSuggestions = mongoOperators.map(operator => ({
      label: `$${operator}`,
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `${operator}`,
      detail: 'MongoDB operator',
      documentation: {
        value: `MongoDB \`$${operator}\` operator`
      }
    }));

    const compSuggestions = comparisonOperators.map(operator => ({
      label: `$${operator}`,
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `${operator}`,
      detail: 'MongoDB comparison operator',
      documentation: {
        value: `MongoDB \`$${operator}\` comparison operator`
      }
    }));

    const logSuggestions = logicalOperators.map(operator => ({
      label: `$${operator}`,
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `${operator}`,
      detail: 'MongoDB logical operator',
      documentation: {
        value: `MongoDB \`$${operator}\` logical operator`
      }
    }));

    return { suggestions: [...funcSuggestions, ...operSuggestions, ...compSuggestions, ...logSuggestions] };
  },
});

function App() {
  const [codeData, setCodeData] = useState('dbName.collectionName.find({})');

  const handleEditorDidMount = (e, m) => {
    // Update theme with new token colors
    m.editor.defineTheme('mongodbTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        // Existing rules
        { token: 'dbName', foreground: '569cd6', fontStyle: 'bold' },
        { token: 'collectionName', foreground: 'dcdcaa', fontStyle: 'bold' },
        { token: 'function', foreground: 'c586c0', fontStyle: 'bold' },

        // New MongoDB specific rules
        { token: 'mongoOperator', foreground: 'c586c0' },
        { token: 'mongoField', foreground: '9cdcfe' },
        { token: 'mongoComparison', foreground: 'ce9178' },
        { token: 'mongoLogical', foreground: 'dcdcaa' },
        { token: 'boolean', foreground: '569cd6' },
        { token: 'null', foreground: '569cd6' },

        // Common rules
        { token: 'delimiter.curly', foreground: 'd4d4d4' },
        { token: 'delimiter.square', foreground: 'd4d4d4' },
        { token: 'string', foreground: 'ce9178' },
        { token: 'number', foreground: 'b5cea8' },
        { token: 'delimiter', foreground: 'd4d4d4' },
        { token: 'white', foreground: 'd4d4d4' },
      ],
      colors: {
        'editor.foreground': '#d4d4d4',
        'editor.background': '#1e1e1e',
      },
    });
    m.editor.setTheme('mongodbTheme');
  };

  const handleEditorChange = (value) => {
    setCodeData(value);
    monaco.editor.setModelMarkers(monaco.editor.getModels()[0], 'mongodb', []);
    const splitCodeData = value.match(
      /^([a-zA-Z_$][\w$]*)\.([a-zA-Z_$][\w$]*)\.(find|aggregate)\(([\s\S]*)\)$/m
    );

    if (splitCodeData) {
      const [_, dbName, collection, funcType, queryStr] = splitCodeData;

      try {
        const processedQueryStr = queryStr.replace(
          /(\{|\,)\s*(\$[a-zA-Z]+)\s*:/g,
          '$1"$2":'
        );
        const queryObj = JSON.parse(processedQueryStr);

        // Validate query structure based on function type
        if (funcType === 'find' && !Array.isArray(queryObj)) {
          // Valid find query
          console.log({
            dbName,
            collection,
            function: funcType,
            query: queryObj
          });
        } else if (funcType === 'aggregate' && Array.isArray(queryObj)) {
          // Valid aggregate pipeline
          console.log({
            dbName,
            collection,
            function: funcType,
            pipeline: queryObj
          });
        } else {
          monaco.editor.setModelMarkers(monaco.editor.getModels()[0], 'mongodb', [{
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: 1,
            endColumn: value.length + 1,
            message: `Invalid ${funcType} query structure`,
            severity: monaco.MarkerSeverity.Error
          }]);
        }
      } catch (e) {
        // JSON parse error
        monaco.editor.setModelMarkers(monaco.editor.getModels()[0], 'mongodb', [{
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: 1,
          endColumn: value.length + 1,
          message: 'Invalid JSON in query/pipeline, make sure there are no trailing commas',
          severity: monaco.MarkerSeverity.Error
        }]);
      }
    } else {
      // Invalid format
      monaco.editor.setModelMarkers(monaco.editor.getModels()[0], 'mongodb', [{
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 1,
        endColumn: value.length + 1,
        message: 'Invalid format. Expected: <dbName>.<collectionName>.<find|aggregate>(<query|stages>)',
        severity: monaco.MarkerSeverity.Error
      }]);
    }
  };

  return (
    <CodeEditor
      language="mongodb"
      value={codeData}
      width={600}
      height={400}
      onChange={handleEditorChange}
      onEditorDidMount={handleEditorDidMount}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        formatOnPaste: true,
        formatOnType: true,
      }}
    />
  );
}

export default App;