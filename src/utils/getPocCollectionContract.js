import { ethers } from 'ethers';

export const getPocCollectionContract = async provider => {
  const res = await fetch('./contracts/PocCollection.json');
  const contractData = await res.json();

  if (contractData.networks['4'].address) {
    const contract = new ethers.Contract(
      contractData.networks['4'].address,
      contractData.abi,
      provider
    );

    return contract;
  } else {
    return Promise.reject(`Contract can't be loaded`);
  }
};
