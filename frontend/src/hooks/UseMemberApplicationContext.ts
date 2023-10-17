import  React,{useContext} from 'react';
import { ApplicationsContext } from '../contexts/MemberApplicationsContext';

const useMemberApplicationContext = () => {
    const context = useContext(ApplicationsContext);
    if(!context){
        throw new Error ("You cannot access this context");
       } 
       return context;
}
 
export default useMemberApplicationContext;


