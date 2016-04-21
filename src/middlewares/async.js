export default function({dispatch}){  // dispatch is a function
  return next  => action => {
    console.log(action);
    //case in which the promsie is not returned. that is, there is no 'then' helper method on the object action.payload
    if(!action.payload || !action.payload.then){
      return next(action);
    }
    console.log("We have a promise", action);
    //Make sure that action's promise has resolved
        action.payload.then(function(response) {
          //create a new action with old type but with promise data, (without promise)
          const newAction =  {...action, payload:response}
          dispatch(newAction) // run the entire cycle again
        });



  }
}
