import produce from 'immer';
import {
    AddCategoryItemPayload,
    Category,
    CategoryField,
    CategoryFieldPayload, CategoryProduct, CategoryProductItem, CategoryProductItemValues,
    FieldInputPayload, ProductInputPayload,
    ProductState, RemoveCategoryFieldPayload, RemoveCategoryPayload, RemoveCategoryProductPayload,
    TitlePayload
} from "../../types/product";
import {PRODUCT} from "../../constants/product";
import uuid from 'react-native-uuid';
import {AttributeTypes} from "../../../constants/AppConstant";


export const initialState: ProductState = {
    categories: [],
    categoryProducts: []
};

const productReducer = (
    state = initialState,
    action: { payload: any; type: string },
) =>
    produce(state, draft => {
        switch (action.type) {
            case PRODUCT.PRESS_ADD_NEW_CATEGORY:
                let field: CategoryField = {
                    id: uuid.v4(),
                    placeholder: 'Field',
                    type: AttributeTypes[AttributeTypes.TEXT],
                    isTitle: true,
                    value: ''
                }

                let fields: CategoryField[] = []
                fields.push(field)

                let category: Category = {
                    id: uuid.v4(),
                    label: 'Category Name',
                    value: 'New Category',
                    fields: fields
                }
                draft.categories.push(category)

                let categoryProduct: CategoryProduct = {
                    category: category,
                    data: []
                }
                draft.categoryProducts.push(categoryProduct)
                break;
            case PRODUCT.SET_FIELD_INPUT:
                let payload: FieldInputPayload = action.payload
                draft.categories = draft.categories.map((category, index) => {
                    if (payload.fieldId == null) {
                        if (category.id == payload.categoryId) {
                            return {
                                ...category,
                                value: payload.value
                            }
                        }
                    } else {
                        if (category.id == payload.categoryId) {
                            return {
                                ...category,
                                fields: category.fields.map((field, index) => {
                                    if (field.id == payload.fieldId) {
                                        return {
                                            ...field,
                                            value: payload.value
                                        }
                                    }
                                    return field
                                })
                            }
                        }
                    }
                    return category
                })

                draft.categoryProducts = draft.categoryProducts.map((categoryProduct, index) => {
                    if (payload.fieldId === null) {
                        if (categoryProduct.category.id === payload.categoryId) {
                            return {
                                ...categoryProduct,
                                category: {...categoryProduct.category, value: payload.value}
                            }
                        }
                    } else {
                        if (categoryProduct.category.id === payload.categoryId) {
                            return {
                                ...categoryProduct,
                                data: categoryProduct.data.map((categoryProductItem, index) => {
                                    return {
                                        ...categoryProductItem,
                                        item: categoryProductItem.item.map((tField, index) => {
                                            if (tField.field.id === payload.fieldId) {
                                                return {
                                                    ...tField,
                                                    field: {...tField.field, value: payload.value}
                                                }
                                            }
                                            return tField
                                        })
                                    }
                                })
                            }
                        }
                    }
                    return categoryProduct
                })
                break
            case PRODUCT.PRESS_ADD_NEW_FIELD:
                let categoryFieldPayload: CategoryFieldPayload = action.payload
                let newField: CategoryField = {
                    id: uuid.v4(),
                    placeholder: 'Field',
                    type: AttributeTypes[categoryFieldPayload.type],
                    isTitle: false,
                    value: ''
                }
                draft.categories = draft.categories.map((category, index) => {
                    if (category.id == categoryFieldPayload.categoryId) {
                        let fields: CategoryField[] = category.fields
                        fields.push(newField)
                        category.fields = fields
                        return category
                    }
                    return category
                })

                draft.categoryProducts = draft.categoryProducts.map((categoryProduct, index) => {
                    if (categoryProduct.category.id == categoryFieldPayload.categoryId) {
                        return {
                            ...categoryProduct,
                            data: categoryProduct.data.map((categoryProductItem, index) => {
                                return {
                                    ...categoryProductItem,
                                    item: categoryProductItem.item.concat({
                                        value: '',
                                        field: newField
                                    })
                                }
                            })
                        }
                    }
                    return categoryProduct
                })

                break;
            case PRODUCT.SET_TITLE:
                let titlePayload: TitlePayload = action.payload
                draft.categories = draft.categories.map((category, index) => {
                    if (category.id == titlePayload.categoryId) {
                        return {
                            ...category,
                            fields: category.fields.map((field, index) => {
                                if (field.id == titlePayload.fieldId) {
                                    return {
                                        ...field,
                                        isTitle: true
                                    }
                                } else {
                                    return {
                                        ...field,
                                        isTitle: false
                                    }
                                }
                            })
                        }
                    }
                    return category
                })

                draft.categoryProducts = draft.categoryProducts.map((categoryProduct, index) => {
                    if (categoryProduct.category.id == titlePayload.categoryId) {
                        return {
                            ...categoryProduct,
                            data: categoryProduct.data.map((categoryProductItem, index) => {
                                return {
                                    ...categoryProductItem,
                                    item: categoryProductItem.item.map((tField, index) => {
                                        if (tField.field.id == titlePayload.fieldId) {
                                            return {
                                                ...tField,
                                                field: {...tField.field, isTitle: true}
                                            }
                                        } else {
                                            return {
                                                ...tField,
                                                field: {...tField.field, isTitle: false}
                                            }
                                        }
                                    })
                                }
                            })
                        }
                    }
                    return categoryProduct
                })
                break;
            case PRODUCT.REMOVE_CATEGORY:
                let removeCategoryPayload: RemoveCategoryPayload = action.payload
                draft.categories = draft.categories.filter((category) => category.id !== removeCategoryPayload.categoryId)
                draft.categoryProducts = draft.categoryProducts.filter((categoryProduct) => categoryProduct.category.id !== removeCategoryPayload.categoryId)
                break;
            case PRODUCT.REMOVE_CATEGORY_FIELD:
                let removeCategoryFieldPayload: RemoveCategoryFieldPayload = action.payload
                draft.categories = draft.categories.map((category, index) => {
                    if (category.id == removeCategoryFieldPayload.categoryId) {
                        return {
                            ...category,
                            fields: category.fields.filter((field) => field.id !== removeCategoryFieldPayload.fieldId)
                        }
                    }
                    return category
                })

                draft.categoryProducts = draft.categoryProducts.map((categoryProduct, index) => {
                    if (categoryProduct.category.id == removeCategoryFieldPayload.categoryId) {
                        return {
                            ...categoryProduct,
                            data: categoryProduct.data.map((categoryProductItem, index) => {
                                return {
                                    ...categoryProductItem,
                                    item: categoryProductItem.item.filter((tField) => tField.field.id !== removeCategoryFieldPayload.fieldId)
                                }
                            })
                        }
                    }
                    return categoryProduct
                })
                break;
            case PRODUCT.ADD_CATEGORY_ITEM:
                let addCategoryItemPayload: AddCategoryItemPayload = action.payload
                let findCategory: CategoryProduct | undefined = undefined
                if (draft.categoryProducts.length > 0) {
                    findCategory = draft.categoryProducts.find((tCategory) => tCategory.category.id == addCategoryItemPayload.categoryId)
                }

                if (draft.categoryProducts.length == 0 || findCategory == undefined) {
                    const category: Category | undefined = draft.categories.find((category) => category.id == addCategoryItemPayload.categoryId)
                    let values: CategoryProductItemValues[] = []
                    let fields = category?.fields
                    if (fields && fields?.length > 0) {
                        for (let i = 0; i < fields.length; i++) {
                            let field: CategoryField = fields[i]
                            let tValue: CategoryProductItemValues = {
                                field: field,
                                value: ''
                            }
                            values.push(tValue)
                        }
                    }

                    let categoryProductItem: CategoryProductItem = {
                        id: uuid.v4(),
                        item: values
                    }

                    let categoryProductItems: CategoryProductItem[] = []
                    categoryProductItems.push(categoryProductItem)


                    let categoryProduct: CategoryProduct = {
                        category: category!,
                        data: categoryProductItems
                    }
                    draft.categoryProducts.push(categoryProduct)
                } else {
                    draft.categoryProducts = draft.categoryProducts.map((categoryProduct, index) => {
                        if (categoryProduct.category.id == addCategoryItemPayload.categoryId) {
                            const category: Category | undefined = draft.categories.find((category) => category.id == addCategoryItemPayload.categoryId)
                            let values: CategoryProductItemValues[] = []
                            let fields = category?.fields
                            if (fields && fields?.length > 0) {
                                for (let i = 0; i < fields.length; i++) {
                                    let field: CategoryField = fields[i]
                                    let tValue: CategoryProductItemValues = {
                                        field: field,
                                        value: ''
                                    }
                                    values.push(tValue)
                                }
                            }

                            let categoryProductItem: CategoryProductItem = {
                                id: uuid.v4(),
                                item: values
                            }

                            let categoryProductItems: CategoryProductItem[] = categoryProduct.data
                            categoryProductItems.push(categoryProductItem)

                            return {
                                ...categoryProduct,
                                data: categoryProductItems
                            }

                        }
                        return categoryProduct
                    })
                }
                break;
            case PRODUCT.SET_PRODUCT_VALUE_INPUT:
                let productInputPayload: ProductInputPayload = action.payload
                draft.categoryProducts = draft.categoryProducts.map((categoryProduct, index) => {
                    if (categoryProduct.category.id == productInputPayload.categoryId) {
                        return {
                            ...categoryProduct,
                            data: categoryProduct.data.map((categoryProductItem, index) => {
                                if (categoryProductItem.id == productInputPayload.itemId) {
                                    return {
                                        ...categoryProductItem,
                                        item: categoryProductItem.item.map((categoryProductItemValues, index) => {
                                            if (categoryProductItemValues.field.id == productInputPayload.fieldId) {
                                                return {
                                                    ...categoryProductItemValues,
                                                    value: productInputPayload.value
                                                }
                                            }
                                            return categoryProductItemValues
                                        })
                                    }
                                }
                                return categoryProductItem
                            })
                        }
                    }
                    return categoryProduct
                })
                break;

            case PRODUCT.REMOVE_CATEGORY_PRODUCT:
                let removeCategoryProductPayload: RemoveCategoryProductPayload = action.payload
                draft.categoryProducts = draft.categoryProducts.map((categoryProduct, index) => {
                    if (categoryProduct.category.id == removeCategoryProductPayload.categoryId) {
                        return {
                            ...categoryProduct,
                            data: categoryProduct.data.filter(categoryProductItem => categoryProductItem.id != removeCategoryProductPayload.itemId)
                        }
                    }
                    return categoryProduct
                })
                break;
        }
    });

export default productReducer;
