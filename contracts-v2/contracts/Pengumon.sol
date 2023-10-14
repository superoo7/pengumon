// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Pengumon is ERC721Enumerable, Ownable {
  using Counters for Counters.Counter;
  using SafeMath for uint256;

  Counters.Counter private _tokenIdCounter;

  uint256 private randomCounter = 1;
  string public baseUri;
  bool public _paused = false;
  uint256 private _price = 0 ether;
  struct Stats {
    uint256 cuteness;
    uint256 intelligence;
    uint256 magic;
    uint256 strength;
    uint256 health;
    uint256 soul;
  }
    struct ChangedStats {
    int256 cuteness;
    int256 intelligence;
    int256 magic;
    int256 strength;
    int256 health;
    int256 soul;
  }
  mapping(uint256 => uint256) public tokenIdToLevels;
  mapping(uint256 => Stats) public tokenIdToStats;
  mapping(uint256 => ChangedStats) public tokenIdToLastChangeStats;

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

  function getPengumon(uint256 tokenId) public view returns (Stats memory) {
    Stats memory stat = tokenIdToStats[tokenId];
    return stat;
  }

  function createCharacter(
    string memory name,
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
    Stats memory stat = Stats(cuteness, intelligence, magic, strength, 100, 0);
    tokenIdToStats[tokenId] = stat;
  }

  function burn(uint256 tokenId) external {
    _burn(tokenId);
  }

  function random() private returns (uint256) {
    randomCounter += 1;
    return
      uint256(
        keccak256(
          abi.encodePacked(block.difficulty, block.timestamp, randomCounter)
        )
      );
  }

  function penguSleep(uint256 tokenId) public {
    require(ownerOf(tokenId) == msg.sender, "Not the owner");
    uint256 levels = tokenIdToLevels[tokenId];
    Stats memory stat = tokenIdToStats[tokenId];
    // Restore health from 0-20 in random
    uint256 rand = 20 % random();
    uint256 newHealth = Math.min(stat.health + rand, 100);
    int256 changeInHealth = int256(newHealth) - int256(stat.health);
    stat.health = newHealth;
    tokenIdToStats[tokenId] = stat;
    tokenIdToLastChangeStats[tokenId] = ChangedStats(
      0,
      0,
      0,
      0,
      changeInHealth,
      0
    );
  }

  function penguWilderness(uint256 tokenId) public {
    require(ownerOf(tokenId) == msg.sender, "Not the owner");
    uint256 levels = tokenIdToLevels[tokenId];
    Stats memory stat = tokenIdToStats[tokenId];
    uint256 rand = random() % 100;

    int256 changeInHealth = 0;
    int256 changeInStrength = 0;
    int256 changeInSoul = 0;
    if (rand < 20) {
      // 20% chance of losing health 0-20 health
      uint256 newHealth = Math.max(stat.health - (random() % 20), 0);
      changeInHealth = int256(newHealth) - int256(stat.health);
      stat.health = newHealth;
      uint256 newSoul = stat.soul + (random() % 10);
      changeInSoul = int256(newSoul) - int256(stat.soul);
      stat.soul = newSoul;
    } else {
      // 80% chance of gaining strength + coin
      uint256 newStrength = Math.max(stat.strength + ( random() % 5), 0);
      changeInStrength = int256(newStrength) - int256(stat.strength);
      stat.strength = newStrength;
      uint256 newSoul = stat.soul + (random() % 20);
      changeInSoul = int256(newSoul) - int256(stat.soul);
      stat.soul = newSoul;
    }
    tokenIdToStats[tokenId] = stat;
    tokenIdToLastChangeStats[tokenId] = ChangedStats(
      0,
      0,
      0,
      changeInStrength,
      changeInHealth,
      changeInSoul
    );
  }

  function withdraw() public onlyOwner {
    address _owner = owner();
    uint256 amount = address(this).balance;
    (bool sent, ) = _owner.call{ value: amount }("");
    require(sent, "Failed to send Ether");
  }
}
