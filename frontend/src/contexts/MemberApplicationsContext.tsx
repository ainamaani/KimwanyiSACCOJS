import React,{createContext,useReducer,ReactNode} from 'react';

interface ApplicationsState {
    applications: any[] | null;
}

interface ApplicationsAction {
    type:string,
    payload:any
}

interface ApplicationsContextType extends ApplicationsState{
    dispatch: React.Dispatch<ApplicationsAction>;
    state?: ApplicationsState;
}

export const ApplicationsContext = createContext<ApplicationsContextType>({
    applications:null,
    dispatch: () => {},
    state: { applications:null }
});

export const applicationsReducer = (state: ApplicationsState | undefined, action: ApplicationsAction):ApplicationsState =>{
    switch(action.type){
        case 'SET_APPLICATIONS':
            return{
                applications: action.payload
            }
        case 'ADD_APPLICATION':
            return{
                applications: [action.payload, ...(state?.applications || [])]
            }
        default:
            return state || {applications:[]}
    }
}

interface ApplicationsContextProviderProps{
    children: ReactNode;
}

export const ApplicationsContextProvider = ({children}:ApplicationsContextProviderProps) =>{
    const [state, dispatch] = useReducer(applicationsReducer,{
        applications: null
    })
    return (
        <ApplicationsContext.Provider value={{...state,dispatch}}>
            {children}
        </ApplicationsContext.Provider>
    )
}
