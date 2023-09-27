const createStore = (reducer) => {
  let state; //initialising state and listeners inside createStore as to not pollute the global namespace
  let listeners = [];

  const getState = () => state; //returns the state

  const dispatch = (action) => {
    state = reducer(state, action); //invokes the reducer function, passing current state and action.
    listeners.forEach((listener) => listener()); //Each listener that has been subscribed to the store (stored in the listeners array) is then notified of the change
  };

  const subscribe = (listener) => {
    listeners.push(listener); //pushes each listener that into an array of listeners. (subscribing them)
    return () => {
      listeners = listeners.filter((l) => l !== listener); //This can be used to unsubscribe listeners, removing them from the listeners array
    };
  };

  return { getState, dispatch, subscribe }; //return an object containing all methods, allowing to interact with the store
};
