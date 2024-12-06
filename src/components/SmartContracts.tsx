import React from 'react';
import type { SmartContractGuide } from '../types/blockchain';

export function SmartContracts() {
  const guides: SmartContractGuide[] = [
    {
      title: 'Simple Token Contract',
      description: 'A basic ERC-20 token implementation',
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleToken {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;

    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
        decimals = 18;
        totalSupply = 1000000 * 10**uint256(decimals);
        balanceOf[msg.sender] = totalSupply;
    }
}`,
      explanation: 'This contract creates a basic token with a name, symbol, and initial supply.',
    },
    {
      title: 'Basic NFT Contract',
      description: 'Simple NFT implementation following ERC-721 standard',
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SimpleNFT is ERC721 {
    uint256 private _tokenIds;

    constructor() ERC721("SimpleNFT", "SNFT") {}

    function mint() public returns (uint256) {
        _tokenIds++;
        _mint(msg.sender, _tokenIds);
        return _tokenIds;
    }
}`,
      explanation: 'A basic NFT contract that allows minting of unique tokens.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Smart Contract Guide</h2>
      
      <div className="space-y-8">
        {guides.map((guide, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{guide.title}</h3>
              <p className="text-gray-600 mb-4">{guide.description}</p>
              
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <pre className="text-green-400 overflow-x-auto">
                  <code>{guide.code}</code>
                </pre>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-blue-700">{guide.explanation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}