export const loggerMiddleWare = (store) => (next) => (action) => {
    if(!action.type){
        return next()
    };

    console.log('type: ',action.type);
    console.log('payload: ',action.payload);
    console.log('current State: ',store.getState());

    next(action);

    console.log('next state: ',store.getState());
};