// This script checks a table of binary relationships between game entities
// and creates a file with all possible pairs (as two variables in a JSON object),
// but only if the two entities do not have a value of 1 in the table.
// Usage: node check_relationships.js

const fs = require('fs');

// Example data (replace with your actual data)
const entities = ['A', 'B', 'C', 'D'];
// Relationship table: 1 means forbidden, 0 means allowed
//    A  B  C  D
// A [0, 1, 0, 0]
// B [1, 0, 1, 0]
// C [0, 1, 0, 1]
// D [0, 0, 1, 0]
const relationshipTable = [
  [0, 1, 0, 0],
  [1, 0, 1, 0],
  [0, 1, 0, 1],
  [0, 0, 1, 0]
];

const validPairs = [];

for (let i = 0; i < entities.length; i++) {
  for (let j = 0; j < entities.length; j++) {
    if (i !== j && relationshipTable[i][j] !== 1) {
      validPairs.push({ entity1: entities[i], entity2: entities[j] });
    }
  }
}

fs.writeFileSync('valid_entity_pairs.json', JSON.stringify(validPairs, null, 2));
console.log('Valid pairs written to valid_entity_pairs.json'); 