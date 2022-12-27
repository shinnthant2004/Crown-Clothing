import { getCollectionAndDocuments } from '../../utils/firebase/firebase.utils';
import {createAction} from '../../utils/firebase/reducer/reducer.utils';
import { CATEGORIES_ACTION_TYPES } from './categories.types';


export const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categories) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,categories);

export const fetchCategoriesFailed = (error) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,error);

export const fetchCategoriesAsync = async (dispatch) => {
  dispatch(fetchCategoriesStart());
  try{
    const categories= await getCollectionAndDocuments();
    dispatch(fetchCategoriesSuccess(categories));
  }catch(err){
   dispatch(fetchCategoriesFailed(err));
  }
} 
