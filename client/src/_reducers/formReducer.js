import { handleActions } from 'redux-actions';
import { CHANGE_FIELD, INITIAL_FORM } from '../_actions/types'

const initialState = {
    register: {
        email: '',
        password: '',
        passwordConfirm: '',
        name: ''
    },
    login: {
        email: '',
        password: '',
    }
};

const form = handleActions(
    {
        [CHANGE_FIELD]: (state, { payload: { form, name, value }}) => ({
            // 불변성 유지 너무 힘들다 > immer 쓰자
            ...state,
            [form]: {
                ...state[form],
                [name] : value
            }
        }),
        [INITIAL_FORM]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form],
        }),
        // [CHANGE_FIELD]: (state, { payload: { form, name, value } }) =>
        // immer 사용
        // produce(state, draft => {
        //     draft[form][name] = value;
        // }),
    },
    initialState,
)

export default form;