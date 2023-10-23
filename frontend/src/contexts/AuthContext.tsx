import React,{useState,createContext,useReducer, ReactNode,useEffect} from 'react';

interface AuthState{
    member: any | null;
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
    member:null,
    dispatch: () => {},
    state: {member: null}
});

export const authReducer = (state : AuthState | undefined,action : AuthAction):AuthState=>{
    switch(action.type){
        case 'LOGIN':
            return {
                member: action.payload
            }
        case 'LOGOUT':
            return {
                member: null
            }
        default:
            return state || {member:[]};
    }
}

interface AuthContextProviderProps{
    children: ReactNode;
}
const AuthContextProvider = ({children}:AuthContextProviderProps) => {
    const [state,dispatch] = useReducer(authReducer,{
        member:null
    });
    //check local storage for the user when the component first renders
    useEffect(()=>{
        const userString = localStorage.getItem('member');
        if(userString){
            const member = JSON.parse(userString);
            dispatch({ type:'LOGIN',payload:member })
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
