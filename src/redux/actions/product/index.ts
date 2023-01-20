import {
    AddCategoryItem,
    AddCategoryItemPayload,
    AddNewCategory,
    AddNewCategoryField,
    CategoryFieldPayload,
    FieldInputPayload,
    ProductInputPayload,
    RemoveCategory,
    RemoveCategoryField,
    RemoveCategoryFieldPayload,
    RemoveCategoryPayload, RemoveCategoryProduct, RemoveCategoryProductPayload,
    SetFieldInput, SetProductInput,
    SetTitleField,
    TitlePayload
} from "../../types/product";
import {PRODUCT} from "../../constants/product";

export const pressAddNewCategory =
    (): AddNewCategory => ({
        type: PRODUCT.PRESS_ADD_NEW_CATEGORY,
    });

export const setFieldInput = (
    payload: FieldInputPayload,
): SetFieldInput => ({
    type: PRODUCT.SET_FIELD_INPUT,
    payload: payload,
});

export const pressAddNewCategoryField = (
    payload: CategoryFieldPayload,
): AddNewCategoryField => ({
    type: PRODUCT.PRESS_ADD_NEW_FIELD,
    payload: payload,
});

export const setTitleField = (
    payload: TitlePayload,
): SetTitleField => ({
    type: PRODUCT.SET_TITLE,
    payload: payload,
});


export const removeCategoryItem = (
    payload: RemoveCategoryPayload,
): RemoveCategory => ({
    type: PRODUCT.REMOVE_CATEGORY,
    payload: payload,
});


export const removeCategoryField = (
    payload: RemoveCategoryFieldPayload,
): RemoveCategoryField => ({
    type: PRODUCT.REMOVE_CATEGORY_FIELD,
    payload: payload,
});

export const addCategoryItem = (
    payload: AddCategoryItemPayload,
): AddCategoryItem => ({
    type: PRODUCT.ADD_CATEGORY_ITEM,
    payload: payload,
});


export const setProductInput = (
    payload: ProductInputPayload,
): SetProductInput => ({
    type: PRODUCT.SET_PRODUCT_VALUE_INPUT,
    payload: payload,
});


export const removeCategoryProduct = (
    payload: RemoveCategoryProductPayload,
): RemoveCategoryProduct => ({
    type: PRODUCT.REMOVE_CATEGORY_PRODUCT,
    payload: payload,
});
