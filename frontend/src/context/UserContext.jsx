import {createContext,useReducer} from 'react';

const userState = {
    data:JSON.parse(localStorage.getItem('auth'))||null
}

export const UserContext = createContext(userState);

function reducer(state,action) {
    switch(action.type) {
        case "login_success":
            localStorage.setItem('auth',JSON.stringify(action.payload))
            return {...state,data:JSON.parse(localStorage.getItem("auth"))}
        case "logout":
            localStorage.removeItem("auth")
            return {...state,data:null}
        default:
            return state;
    }
}

export const UserProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,userState)

    function login_success(data) {
        dispatch({
            type:"login_success",
            payload:{...data}
        })
    }

    function logout() {
        dispatch({type:"logout"})
    }

    return (<UserContext.Provider value={{
        user:state,login_success,logout
    }}>
        {children}
        </UserContext.Provider>)
}