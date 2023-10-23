import React,{useState,createContext,useReducer, ReactNode,useEffect} from 'react';

interface AuthState{
    user: any | null;
}

interface AuthAction{
    type:string,
    payload?:any
}

interface AuthContextType extends AuthState{
    dispatch: React.Dispatch<AuthAction>;
    state?: AuthState
}

export const AuthContext = createContext<AuthContextType>({
    user:null,
    dispatch: () => {},
    state: {user: null}
});

export const authReducer = (state : AuthState | undefined,action : AuthAction):AuthState=>{
    switch(action.type){
        case 'LOGIN':
            return {
                user: action.payload
            }
        case 'LOGOUT':
            return {
                user: null
            }
        default:
            return state || {user:[]};
    }
}

interface AuthContextProviderProps{
    children: ReactNode;
}
const AuthContextProvider = ({children}:AuthContextProviderProps) => {
    const [state,dispatch] = useReducer(authReducer,{
        user:null
    });
    //check local storage for the user when the component first renders
    useEffect(()=>{
        const userString = localStorage.getItem('user');
        if(userString){
            const user = JSON.parse(userString);
            dispatch({ type:'LOGIN',payload:user })
        }
    },[]);

    console.log("Auth context state: ",state);
    return ( 
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
     );
}
 
export default AuthContextProvider;
