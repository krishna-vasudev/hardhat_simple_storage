//SPDX-License-Identifier:MIT
pragma solidity 0.8.14;

contract SimpleStorage {
    uint256 public favouriteNumber;
    mapping(string => uint256) public nameToFavouriteNumber;
    struct Pepole {
        uint256 favouriteNumber;
        string name;
    }

    Pepole[] public people;

    function store(uint256 _favouriteNumber) public virtual {
        favouriteNumber = _favouriteNumber;
    }

    function add(string memory _name, uint256 _favouriteNumber) public {
        people.push(Pepole(_favouriteNumber, _name));
        nameToFavouriteNumber[_name] = _favouriteNumber;
    }
}
