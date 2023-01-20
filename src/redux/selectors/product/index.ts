import {createSelector} from 'reselect';
import {AppState} from '../../reducers';
import {initialState} from '../../reducers/product';

export const getCategories = (state: AppState) => state.productReducer.categories;

export const getCategoriesSelector = createSelector(getCategories, categories => categories);

export const getCategoryProducts = (state: AppState) => state.productReducer.categoryProducts;

export const getCategoryProductSelector = createSelector(getCategoryProducts, categoryProducts => categoryProducts);

