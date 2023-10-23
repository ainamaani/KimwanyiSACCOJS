import  React,{useContext} from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useAuthContext = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error ("You cannot access this context");
       } 
       return context;
}
 
export default useAuthContext;


