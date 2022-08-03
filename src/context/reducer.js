// import { initialState } from './toolProvider';

import { INIT_BATCH_TOOL, GET_NFT_ARRAY, GET_QUERY_TOKENID } from './actions';

const reducer = (state, action) => {
  if (action.type === INIT_BATCH_TOOL) {
    return {
      ...state,
      ethereum: window.ethereum,
      provider: action.payload.provider,
      PocCollectionContract: action.payload.contract,
    };
  }

  if (action.type === GET_NFT_ARRAY) {
    return {
      ...state,
      ownedNFTArray: action.payload.nftArray,
    };
  }

  if (action.type === GET_QUERY_TOKENID) {
    return {
      ...state,
      queryTokenId: parseInt(action.payload.tokenIdQuery),
    };
  }
};

export default reducer;
