# Awesome Logic Parser
The *Awesome Logic Parser* is a JavaScript library for evaluating logic rules based on a set of rules and a data context. This library provides the ability to define complex rules and evaluate them against data.

## Installation
You can install the Logic Parser library using npm:
```bash
npm install awesome-logic-parser
```

## Usage

```js
// Import the LogicParser library
const { LogicParser } = require('logic-parser');

// Sample data
const data = {
  age: 25,
  name: 'John',
  hobbies: ['reading', 'swimming'],
  city: 'New York',
  text: 'Hello, World'
};

// Define variables for testing
const minAge = 18;
const maxAge = 30;
const targetCity = 'New York';
const startsWith = 'Jo';
const hobby = 'swimming';
const endsWith = 'World';

// Sample rules
const logicGroup = {
  type: 'group',
  rules: [
    // Relational operators
    {
      type: 'expr',
      left: 'age',
      operator: 'GTE',
      right: minAge
    },
    {
      type: 'logic',
      operator: 'AND'
    },
    {
      type: 'expr',
      left: 'city',
      operator: 'EQ',
      right: targetCity
    },
    {
      type: 'logic',
      operator: 'AND'
    },
    {
      type: 'expr',
      left: 'name',
      operator: 'STARTSWITH',
      right: startsWith
    },
    {
      type: 'logic',
      operator: 'AND'
    },
    {
      type: 'expr',
      left: 'hobbies',
      operator: 'INCLUDES',
      right: hobby
    },
    {
      type: 'logic',
      operator: 'AND'
    },
    {
      type: 'expr',
      left: 'text',
      operator: 'ENDSWITH',
      right: endsWith
    },
    {
      type: 'logic',
      operator: 'AND'
    },
    {
      type: 'expr',
      left: 'age',
      operator: 'BETWEEN',
      right: {
        start: minAge,
        end: maxAge
      }
    }
  ]
};

// Set up the LogicParser
const logicParser = new LogicParser({
  resultWhenEmpty: false,
  returnFalseWhenError: true
});

// Evaluate the rules
const result = logicParser.evaluate(logicGroup, data);
```

## License
This library is released under the MIT License.