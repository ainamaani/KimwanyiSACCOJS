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
    loading: boolean
}

export const AuthContext = createContext<AuthContextType>({
    member:null,
    dispatch: () => {},
    state: {member: null},
    loading: false
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
    const [loading, setLoading] = useState(true); // Initialize loading state
    
    //check local storage for the user when the component first renders
    useEffect(()=>{
        const userString = localStorage.getItem('member');
        if(userString){
            const member = JSON.parse(userString);
            dispatch({ type:'LOGIN',payload:member })
        }
        // Set loading to false once the user data is available
        setLoading(false);
        
    },[]);

    console.log("Auth context state: ",state);
    return ( 
        <AuthContext.Provider value={{...state,dispatch,loading}}>
                {children}
        </AuthContext.Provider>
     );
}
 
export default AuthContextProvider;
