import { AppState } from './state';

const initialState: AppState = {
    isModalOpen: null,
    isSidebarOpen:null,
    isAllowMove:true,
    loginToken:'',
    SelectMap:'A',
};

const reducer = (state: AppState = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case 'SET_MODAL':
      if (state.isModalOpen===action.payload){return {...state, isModalOpen: null,};}
      else {return {...state, isModalOpen: action.payload,}}
    case 'SET_SIDEBAR':
      if (state.isSidebarOpen===action.payload){return {...state, isSidebarOpen: null,};}
      else {return {...state, isSidebarOpen: action.payload,}}
    case 'SET_ALLOWMOVE':
        return {...state, isAllowMove: action.payload}
    case 'SET_LOGINTOKEN':
        return {...state, loginToken: action.payload}
    case 'SET_SELECTMAP':
      return {...state, SelectMap: action.payload}
    default:
      return state;
  }
};

export default reducer;