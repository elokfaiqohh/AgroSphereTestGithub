// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AgroTrace {
    struct Record {
        uint256 id;
        string batchCode;
        string meta;
    }

    Record[] public records;
    uint256 public nextId = 0;

    event RecordAdded(uint256 id, string batchCode, string meta);

    function addRecord(string memory batchCode, string memory meta) public {
        records.push(Record(nextId, batchCode, meta));
        emit RecordAdded(nextId, batchCode, meta);
        nextId++;
    }

    function getRecord(uint256 _id) public view returns (string memory, string memory) {
        require(_id < records.length, "Record not found");
        return (records[_id].batchCode, records[_id].meta);
    }

    function getRecords() public view returns (Record[] memory) {
        return records;
    }
}
