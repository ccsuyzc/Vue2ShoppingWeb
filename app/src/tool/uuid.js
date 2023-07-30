import { v4 as uuidv4 } from 'uuid';


const CreateId = ()=>{
 
 if(!localStorage.getItem('ShortTimeId')){
    localStorage.setItem('ShortTimeId',uuidv4())
 }
let ShortTimeId = localStorage.getItem('ShortTimeId')
 return ShortTimeId
}

export default CreateId
