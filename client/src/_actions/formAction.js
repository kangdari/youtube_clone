import { createAction } from 'redux-actions';
import { CHANGE_FIELD, INITIAL_FORM } from './types'

export const changeFiled = createAction(
    CHANGE_FIELD,
    ({ form, name, value }) => ({
        form,
        name,
        value,
    })
);

export const initialForm = createAction(INITIAL_FORM, form => form);  