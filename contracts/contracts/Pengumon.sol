// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Pengumon is ERC721Enumerable, Ownable, ReentrancyGuard {
  using Counters for Counters.Counter;
  using SafeMath for uint256;

  Counters.Counter private _tokenIdCounter;

  uint256 randomCounter = 1;
  string public baseUri;
  bool public _paused = true;
  uint256 private _price = 0 ether;
  struct Stats {
    uint256 cuteness;
    uint256 intelligence;
    uint256 magic;
    uint256 strength;
    uint256 health;
    uint256 soul;
  }
  mapping(uint256 => uint256) public tokenIdToLevels;
  mapping(uint256 => Stats) public tokenIdToStats;

  constructor() ERC721("Pengumon", "PMON") {}

  function _baseURI() internal view virtual override returns (string memory) {
    return baseUri;
  }

  function setBaseUri(string memory _uri) public onlyOwner {
    baseUri = _uri;
  }

  function getPrice() public view returns (uint256) {
    return _price;
  }

  function getLevels(uint256 tokenId) public view returns (uint256) {
    uint256 levels = tokenIdToLevels[tokenId];
    return levels;
  }

  function pause(bool val) public onlyOwner {
    _paused = val;
  }

  function createCharacter(
    string name,
    uint256 cuteness,
    uint256 intelligence,
    uint256 magic,
    uint256 strength
  ) public payable {
    require(!_paused, "Sale paused");
    require(cuteness + intelligence + magic + strength == 20, "Invalid stats");
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    _safeMint(msg.sender, tokenId);
    tokenIdToLevels[tokenId] = 1;
    Stats memory stat = Stat(cuteness, intelligence, magic, strength, 100, 0);
    tokenIdToStats[tokenId] = stat;
  }

  function burn(uint256 tokenId) external {
    _burn(tokenId);
  }

  function random() private view returns (uint256) {
    randomCounter++;
    return
      uint256(
        keccak256(
          abi.encodePacked(block.difficulty, block.timestamp, players, counter)
        )
      );
  }

  function penguSleep(uint256 tokenId) public {
    require(ownerOf(tokenId) == msg.sender, "Not the owner");
    uint256 levels = tokenIdToLevels[tokenId];
    Stats memory stat = tokenIdToStats[tokenId];
    // Restore health from 0-20 in random
    uint256 rand = 20 % this.random();
    uint256 newHealth = Math.min(stat.health + rand, 100);
    stat.health = newHealth;
    tokenIdToStats[tokenId] = stat;
  }

  function penguWilderness(uint256 tokenId) public {
    require(ownerOf(tokenId) == msg.sender, "Not the owner");
    uint256 levels = tokenIdToLevels[tokenId];
    Stats stat = tokenIdToStats[tokenId];
    uint256 rand = 100 % this.random();

    if (rand < 20) {
      // 20% chance of losing health
      stat.health = Math.max(stat.health - (20 % this.random()), 0);
    } else {
      // 80% chance of gaining strength + coin
      stat.strength = Math.max(stat.strength + (20 % this.random()), 0);
      stat.soul = stat.soul + (20 % this.random());
    }
    tokenIdToStats[tokenId] = stat;
  }

  function withdraw() public onlyOwner {
    address _owner = owner();
    uint256 amount = address(this).balance;
    (bool sent, ) = _owner.call{ value: amount }("");
    require(sent, "Failed to send Ether");
  }
}
