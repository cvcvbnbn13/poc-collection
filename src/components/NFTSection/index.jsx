import React from 'react';
import { create } from 'ipfs-http-client';
import { usePocCollection } from '../../context/toolProvider';
import './index.css';

// const projectID = '2CnuVkcKg2pkEe1G4x42hcov8Nh';
// const projectSecret = 'ea2b2eb0e0028c65e1d1527db44defa8';
// const authorization = 'Basic ' + btoa(projectID + ':' + projectSecret);
// const client = create({
//   url: 'https://ipfs.infura.io:5001/api/v0',
//   headers: {
//     authorization,
//   },
// });

const NFTSection = () => {
  const { ownedNFTArray } = usePocCollection();

  let nftsArray = [];

  ownedNFTArray?.forEach(async item => {
    let regStr = new RegExp('^http', 'g');
    if (regStr.test(item)) {
      const res = await fetch(item);

      const { image, name } = await res.json();

      const imageFormat = image.replace('ipfs://', 'ipfs/');

      nftsArray.push({
        name,
        image: `${imageFormat}`,
      });
    } else {
      const tokenURIFormat = item.replace('ipfs://', 'ipfs/');

      const res = await fetch(`https://cf-ipfs.com/${tokenURIFormat}`);

      const { image, name } = await res.json();
      const imageFormat = image.replace('ipfs://', 'ipfs/');

      nftsArray.push({
        name,
        image: `https://cf-ipfs.com/${imageFormat}`,
      });
    }
  });

  return (
    <div className="NFTcontainer">
      {nftsArray?.map(item => {
        return (
          <div key={item} className="NFTitem">
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default NFTSection;
