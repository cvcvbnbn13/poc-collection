// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

interface INFT {
  function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256 tokenId);
  function balanceOf(address owner) external view returns (uint256 balance);
  function tokenURI(uint256 tokenId) external view returns(string memory);
}

contract PocCollection is ERC721URIStorage,ERC721Enumerable, Ownable {
  using Counters for Counters.Counter;

  Counters.Counter private _listedItems;
  Counters.Counter private _tokenIds;

  struct NFTItem {
    uint256 tokenId;
  }

  address[] private _listenAddress = [0x24a16bB4BAb401bb462a809E98012A73782dFDfD];

  string[] public ownedNFTURIs;

  uint256[] private _allNFTs;

  mapping(uint256 => address[]) private _ownerListenAddress;

  mapping(address => bool) private _existsOwner;

  mapping(uint256 => address) private _owners;

  mapping(uint256 => NFTItem) private _idToNFTItem;

  mapping(address => uint256) private _tokenIdByOwner;

  event NFTItemCreated(
    uint256 tokenId,
    address creator
  );

  constructor() ERC721('FattyCreaturesNFT', 'FCNFT') {}

  // functions

  function ownerExists(address owner) public view returns (bool) {
    return _existsOwner[owner] == true;
  }


  function mintToken(string memory pocTokenuri)
    public
    payable
    returns (uint256)
  {
    require(!ownerExists(msg.sender), 'You had already mint this NFT');
    require(pocTotalSupply() <= 199, 'Sorry, amounts of this NFT have reached the limit');

    _tokenIds.increment();
    _listedItems.increment();


    uint256 newTokenId = _tokenIds.current();

    _beforeTokenTransfer(address(0), msg.sender, newTokenId);
    _safeMint(msg.sender, newTokenId);

    _setTokenURI(newTokenId, pocTokenuri);
    _owners[newTokenId] == msg.sender;
    _ownerListenAddress[newTokenId] = _listenAddress;
    _existsOwner[msg.sender] == true;
    _idToNFTItem[newTokenId] = NFTItem(newTokenId);

    emit NFTItemCreated(newTokenId, msg.sender);
    return newTokenId;
  }

  function pocTotalSupply() public view returns (uint256) {
    return _allNFTs.length;
  }

  function poctokenByIndex(uint256 index) public view returns (uint256) {
    require(index < pocTotalSupply(), 'Index out of bounds');
    return _allNFTs[index];
  }

  function getNFTItem(uint256 tokenId) public view returns (NFTItem memory) {
    return _idToNFTItem[tokenId];
  }

  function getTokenID(address owner) public view returns (uint256) {
    return _tokenIdByOwner[owner];
  }

  function ownerOf(uint256 tokenId)public view virtual override(ERC721, IERC721) returns(address) {
    return super.ownerOf(tokenId);
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal virtual override(ERC721, ERC721Enumerable) {
    require(to == address(0) || from == address(0) , "You can't transfer this NFT");
    super._beforeTokenTransfer(from, to, tokenId);

    if (from == address(0)) {
      _tokenToAllTokenEnumeration(tokenId);
    }
  }

  function _tokenToAllTokenEnumeration(uint256 tokenId) private {
    _allNFTs.push(tokenId);
  }

  function tokenURI(uint256 tokenId) public view virtual override(ERC721, ERC721URIStorage) returns(string memory) {
    return super.tokenURI(tokenId);
  }

  function getOwnedNfts(uint256 tokenId) public returns (string[] memory) {
    address[] memory items = _ownerListenAddress[tokenId];
    address owner = ownerOf(tokenId);
    for(uint256 i = 0; i < items.length; i++) {
      INFT item = INFT(items[i]);
      uint256 ownedItemsCount = item.balanceOf(owner);
      for (uint256 j = 0; j < ownedItemsCount; j++) {
        uint256 nftTokenid = item.tokenOfOwnerByIndex(owner, j);
        string memory nfturi = item.tokenURI(nftTokenid);
        ownedNFTURIs.push(nfturi);
      }
    }

    return ownedNFTURIs;
  }

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    super._burn(tokenId);
  }

  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721Enumerable) returns (bool) {
      return
          interfaceId == type(IERC721).interfaceId ||
          interfaceId == type(IERC721Metadata).interfaceId ||
          super.supportsInterface(interfaceId);
  }

  function setListenContracts(address[] memory listenAddress)public {
    _listenAddress = listenAddress;
  }
}
