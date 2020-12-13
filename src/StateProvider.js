import React, {createContext,useContext,useReducer}

from 'react'
import reducer from './reducer'
export const initialState = {
    user:null
}

export const StateContext =createContext(initialState)

export const StateProvider =({children

})=>{
       const [state,dispatch]=useReducer(reducer,initialState)

       const adduser=(payload)=>{
           console.log(payload)
        dispatch({
            type:'SET_USER',
            payload
        })
    }



         
       return (
          <StateContext.Provider value={{
              user:state.user
              ,adduser
          }}>
              {children}
          </StateContext.Provider>


       )

   
 
}



