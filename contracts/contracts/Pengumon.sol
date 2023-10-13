// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract TestNFT is ERC721Enumerable, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    using SafeMath for uint256;

    Counters.Counter private _tokenIdCounter;

    string public baseUri;
    bool public _paused = true;
    uint256 private _price = 0 ether;
    mapping(uint256 => uint256) public tokenIdToLevels; //onchain levels 
    mapping(uint256 => uint256) public tokenIdToPower; 
    mapping(uint256 => uint256) public tokenIdToCuteness;  

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

        function createCharacter() public payable {

        require(!_paused, "Sale paused");
        // require(
        //     msg.value == _price,
        //     "Not enough ETH sent: check price."
        // );
            uint256 tokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();
            _safeMint(msg.sender, tokenId);
            tokenIdToLevels[tokenId] = 1;
            //set tokenURI here
    }

    function burn(uint256 tokenId) external {

        _burn(tokenId);
    }

    //levelup function
    function changeLevel(bool up, uint256 tokenId) public {
        uint256 currTokenLevel = tokenIdToLevels[tokenId];
        if (up) {
            currTokenLevel++;
        } else {
            require(currTokenLevel > 1, "Minimum level is lvl1.");
            currTokenLevel--;
        }
    }


    function withdraw() public onlyOwner {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent, ) = _owner.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
}
