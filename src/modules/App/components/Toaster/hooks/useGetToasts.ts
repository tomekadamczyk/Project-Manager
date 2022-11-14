import { toastsVar } from '../../../config/apolloClient'
import { useReactiveVar } from '@apollo/client';

export function useGetToasts() {
    const toasts = useReactiveVar(toastsVar);

    return toasts.slice().reverse()
}