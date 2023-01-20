import {PRODUCT} from "../../constants/product";
import {AttributeTypes} from "../../../constants/AppConstant";

export interface CategoryField {
    id: string | number[];
    placeholder: string;
    value: string;
    isTitle: boolean
    type: string
}

export interface Category {
    id: string | number[];
    label: string;
    value: string
    fields: CategoryField[]
}

export interface ProductState {
    categories: Category[];
    categoryProducts: CategoryProduct[]
}

export interface FieldInputPayload {
    key: string;
    value: string;
    categoryId: string;
    fieldId: string
}

export interface CategoryFieldPayload {
    type: AttributeTypes
    categoryId: any
}


export type AddNewCategory = {
    type: typeof PRODUCT.PRESS_ADD_NEW_CATEGORY;
};

export type SetFieldInput = {
    type: typeof PRODUCT.SET_FIELD_INPUT;
    payload: FieldInputPayload;
};

export type AddNewCategoryField = {
    type: typeof PRODUCT.PRESS_ADD_NEW_FIELD;
    payload: CategoryFieldPayload;
};

export interface TitlePayload {
    categoryId: any
    fieldId: any
}

export interface RemoveCategoryPayload {
    categoryId: any
}

export interface RemoveCategoryFieldPayload {
    categoryId: any
    fieldId: any
}

export type SetTitleField = {
    type: typeof PRODUCT.SET_TITLE;
    payload: TitlePayload;
};

export type RemoveCategory = {
    type: typeof PRODUCT.REMOVE_CATEGORY;
    payload: RemoveCategoryPayload;
};

export type RemoveCategoryField = {
    type: typeof PRODUCT.REMOVE_CATEGORY_FIELD;
    payload: RemoveCategoryFieldPayload;
};


export interface CategoryProductItemValues {
    field: CategoryField
    value: any
}

export interface CategoryProductItem {
    id: any
    item: CategoryProductItemValues[]
}

export interface CategoryProduct {
    category: Category
    data: CategoryProductItem[]
}

export interface AddCategoryItemPayload {
    categoryId: any
}

export type AddCategoryItem = {
    type: typeof PRODUCT.SET_FIELD_INPUT;
    payload: AddCategoryItemPayload;
};

export interface RemoveCategoryProductPayload {
    categoryId: any
    itemId: any
}

export type RemoveCategoryProduct = {
    type: typeof PRODUCT.REMOVE_CATEGORY_PRODUCT;
    payload: RemoveCategoryProductPayload;
};

export interface ProductInputPayload {
    key: string
    value: any
    itemId: any
    fieldId: any
    categoryId: any
}

export type SetProductInput = {
    type: typeof PRODUCT.SET_PRODUCT_VALUE_INPUT;
    payload: ProductInputPayload;
};


export type ProductActions =
    AddNewCategory
    | SetFieldInput
    | AddNewCategoryField
    | SetTitleField
    | RemoveCategory
    | RemoveCategoryField
    | AddCategoryItem
    | RemoveCategoryProduct
    | undefined;
