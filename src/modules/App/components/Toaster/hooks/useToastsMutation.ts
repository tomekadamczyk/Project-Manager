import { toastsVar } from '../../../config/apolloClient'
import { addToast, deleteToast } from '../operations'

export function useToastsMutations() {

    const { removeLastToast, removeToast } = deleteToast(toastsVar);

    return {
        addToast: addToast(toastsVar), 
        removeLastToast,
        removeToast
    }
}