const INITIAL_STATE = {
    transactionList : []
}

export const transactionReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'LOAD_TRANSACTION' :
            return {
                ...state,
                transactionList : action.pay
            }
            default : 
                return state
    }
}