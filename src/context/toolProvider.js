import { createContext, useContext, useEffect, useReducer } from 'react';
// import { toast } from 'react-toastify';
import reducer from './reducer';

import { INIT_BATCH_TOOL, GET_NFT_ARRAY, GET_QUERY_TOKENID } from './actions';

import { ethers } from 'ethers';
import { getPocCollectionContract } from '../utils';

const initialState = {
  ethereum: null,
  provider: null,
  PocCollectionContract: null,
  isMinting: false,
  ownedNFTArray: null,
  queryTokenId: null,
};

const ToolContext = createContext();

const ToolProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function initTool() {
      try {
        const provider = await ethers.getDefaultProvider('rinkeby', {
          infura: {
            projectId: process.env.INFURA_PROJECT_ID,
            projectSecret: process.env.INFURA_PROJECT_SECRET,
          },
        });

        // const web3Provider = await new ethers.providers.Web3Provider(
        //   window.ethereum
        // );

        // await web3Provider.send('eth_requestAccounts', []);

        const contract = await getPocCollectionContract(provider);

        dispatch({
          type: INIT_BATCH_TOOL,
          payload: {
            contract,
            provider,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
    initTool();
  }, []);

  useEffect(() => {
    if (state.contract === null) return;
    if (typeof state.queryTokenId !== 'number') return;

    const getAllNFTs = async () => {
      const nftArray = await state.contract?.getOwnedNfts(state.queryTokenId);
      dispatch({ type: GET_NFT_ARRAY, payload: { nftArray } });
    };

    getAllNFTs();
  }, [state.contract, state.queryTokenId]);

  useEffect(() => {
    const getQueryTokenId = async () => {
      const tokenIdQuery = new URLSearchParams(window.location.search).get(
        'tokenid'
      );

      dispatch({ type: GET_QUERY_TOKENID, payload: { tokenIdQuery } });
    };

    getQueryTokenId();
  }, [state.queryTokenId]);

  return (
    <ToolContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </ToolContext.Provider>
  );
};

function usePocCollection() {
  return useContext(ToolContext);
}

export { initialState, usePocCollection };

export default ToolProvider;
