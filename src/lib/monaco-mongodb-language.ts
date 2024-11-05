import * as monaco from 'monaco-editor';

export const setupMongoDBLanguage = () => {
  // 1. Register the MongoDB language
  monaco.languages.register({ id: 'mongodb' });

  // Extract all MongoDB operators from the grammar
  const mongoOperators = [
    'accumulator', 'addToSet', 'avg', 'bottom', 'bottomN', 'covariancePop', 
    'covarianceSamp', 'count', 'derivative', 'denseRank', 'documentNumber', 
    'expMovingAvg', 'first', 'firstN', 'integral', 'last', 'lastN', 'max', 
    'maxN', 'median', 'min', 'minN', 'percentile', 'push', 'rank', 'stdDevPop',
    'stdDevSamp', 'shift', 'sum', 'top', 'topN', 'locf', 'linearFill',
    'convert', 'ltrim', 'rtrim', 'toBool', 'toDate', 'toDecimal', 'toDouble',
    'toInt', 'toLong', 'toObjectId', 'toString', 'trim', 'abs', 'add',
    'allElementsTrue', 'and', 'anyElementTrue', 'arrayElemAt', 'arrayToObject',
    'binarySize', 'bsonSize', 'ceil', 'cmp', 'concat', 'concatArrays', 'cond',
    'dateAdd', 'dateDiff', 'dateFromParts', 'dateFromString', 'dateSubtract',
    'dateToParts', 'dateToString', 'dateTrunc', 'dayOfMonth', 'dayOfWeek',
    'dayOfYear', 'divide', 'eq', 'exp', 'filter', 'floor', 'function',
    'getField', 'gt', 'gte', 'hour', 'ifNull', 'in', 'indexOfArray',
    'indexOfBytes', 'indexOfCP', 'isArray', 'isNumber', 'isoDayOfWeek',
    'isoWeek', 'isoWeekYear', 'let', 'literal', 'ln', 'log', 'log10', 'map',
    'mergeObjects', 'meta', 'millisecond', 'minute', 'mod', 'month', 'multiply',
    'not', 'objectToArray', 'or', 'pow', 'range', 'reduce', 'regexFind',
    'regexFindAll', 'regexMatch', 'replaceAll', 'replaceOne', 'reverseArray',
    'second', 'setDifference', 'setEquals', 'setIntersection', 'setIsSubset',
    'setUnion', 'size', 'slice', 'sortArray', 'split', 'sqrt', 'strcasecmp',
    'strLenBytes', 'strLenCP', 'substr', 'substrBytes', 'substrCP', 'subtract',
    'switch', 'toHashedIndexKey', 'toLower', 'toUpper', 'tsSecond', 'tsIncrement',
    'trunc', 'type', 'week', 'year', 'zip', 'bitAnd', 'bitOr', 'bitXor',
    'bitNot', 'all', 'bitsAllClear', 'bitsAllSet', 'bitsAnyClear', 'bitsAnySet',
    'comment', 'elemMatch', 'exists', 'expr', 'geoIntersects', 'geoWithin',
    'jsonSchema', 'lt', 'lte', 'ne', 'near', 'nearSphere', 'nin', 'nor',
    'regex', 'text', 'where', 'addFields', 'bucket', 'bucketAuto',
    'changeStream', 'collStats', 'currentOp', 'densify', 'documents', 'facet',
    'fill', 'geoNear', 'graphLookup', 'group', 'indexStats', 'limit',
    'listLocalSessions', 'lookup', 'match', 'merge', 'out', 'project',
    'redact', 'replaceRoot', 'replaceWith', 'sample', 'search', 'searchMeta',
    'set', 'setWindowFields', 'skip', 'sort', 'sortByCount', 'unionWith',
    'unset', 'unwind', 'vectorSearch'
  ];

  // 2. Set up monarch syntax highlighting rules
  monaco.languages.setMonarchTokensProvider('mongodb', {
    defaultToken: '',
    tokenizer: {
      root: [
        // MongoDB operators
        [new RegExp('\\$(' + mongoOperators.join('|') + ')\\b'), 'keyword.mongodb'],

        // Comments
        [/\/\/.*$/, 'comment'],
        [/\/\*/, 'comment', '@comment'],

        // Strings
        [/"([^"\\]|\\.)*$/, 'string.invalid'],
        [/'([^'\\]|\\.)*$/, 'string.invalid'],
        [/"/, 'string', '@string_double'],
        [/'/, 'string', '@string_single'],

        // Numbers
        [/-?\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
        [/0[xX][0-9a-fA-F]+/, 'number.hex'],
        [/-?\d+/, 'number'],

        // Brackets and delimiters
        [/[{}()\[\]]/, '@brackets'],
        [/[;,.]/, 'delimiter'],

        // Identifiers
        [/[a-zA-Z_]\w*/, 'identifier']
      ],

      comment: [
        [/[^/*]+/, 'comment'],
        [/\*\//, 'comment', '@pop'],
        [/[/*]/, 'comment']
      ],

      string_double: [
        [/[^\\"]+/, 'string'],
        [/\\./, 'string.escape'],
        [/"/, 'string', '@pop']
      ],

      string_single: [
        [/[^\\']+/, 'string'],
        [/\\./, 'string.escape'],
        [/'/, 'string', '@pop']
      ]
    },
    includeLF: false
  });

  // 3. Register language configuration (from mongodb-language-configuration.json)
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

  // 4. Register completions provider
  monaco.languages.registerCompletionItemProvider('mongodb', {
    provideCompletionItems: (model, position) => {
      const suggestions = mongoOperators.map(operator => ({
        label: `$${operator}`,
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: `$${operator}`,
        detail: 'MongoDB operator',
        documentation: {
          value: `MongoDB \`$${operator}\` operator`
        }
      }));

      return {
        suggestions: suggestions
      };
    }
  });
};

// Example usage with Grafana's CodeEditor:
/*
import { CodeEditor } from '@grafana/ui';

const MongoEditor: React.FC = () => {
  useEffect(() => {
    setupMongoDBLanguage();
  }, []);

  return (
    <CodeEditor
      language="mongodb"
      value={initialValue}
      onBlur={(value) => {
        // Handle value changes
      }}
    />
  );
};
*/
