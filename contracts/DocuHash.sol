// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


contract Documents {

    // a single record of a submitted document hash
    struct Document {
        address owner;
        bytes32 hash;
        uint blockNumber;
        bool exists;
    }

    // hash table used to lookup and store all submitted document hashes
    mapping(bytes32 => Document) public documents;

    function addDocument(bytes32 hash) external {
        // do not allow overwriting of existing entries
        require(!documents[hash].exists);
        // add new entry
        documents[hash] = Document(msg.sender, hash, block.number, true);
    }
}
