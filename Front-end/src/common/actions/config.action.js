import { ACTION } from '@/common/constants/redux';

export function toggleLoading(isLoading) {
    return (dispatch) => {
        dispatch({
            type: ACTION.SET_LOADING,
            payload: isLoading,
        });
    };
}
