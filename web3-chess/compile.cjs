const path = require('path');
const fs = require('fs');
const solc = require('solc');

const chessPath = path.resolve(__dirname, 'contracts', 'Chess.sol');
const source = fs.readFileSync(chessPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'Chess.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

const contractFile = output.contracts['Chess.sol']['Chess'];
const abi = contractFile.abi;
const bytecode = contractFile.evm.bytecode.object;

fs.writeFileSync(path.resolve(__dirname, 'artifacts', 'Chess.json'), JSON.stringify({ abi, bytecode }));

console.log('Contract compiled successfully!');
