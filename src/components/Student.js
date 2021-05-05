import { useEffect, useState } from 'react';
import { read, insert, update, remove } from '../services/apiService';

const Student = ({ match, history}) => {

const [id] = useState(match.params.id);
const [student, setStudent] = useState({
    _id: '0',
    firstName: '',
    lastName: '',
    yearOfBirth: 0,
    address: '' 
});
const [validationFirstName,setFirstName] = useState(''); 
const [validationLastName,setLastName] = useState(''); 
const [validationYearOfBirth,setYearOfBirth] = useState(''); 


useEffect (() => {
    if(id !== '0'){
        read('students', id, data => {
            if(data) setStudent(data);
        })
    }
}, [id]);

function changeHandler(e) {
  if(e.target.name ==='firstName' && e.target.value !=='')
  {
      setFirstName('');
  }
  if(e.target.name==='lastName' && e.target.value !=='')

   {
    setLastName('');

   }     

   if(e.target.name==='yearOfBirth' && e.target.value !=='')

   {
    setYearOfBirth('');

   }     

setStudent({
    ...student,
    [e.target.name]:e.target.value

});
}
const validateinput = () => {
     
         let firstNameError ='';
         let lastNameError = '';
         let yearOfBirthError = '';
         let noFirstName = false;
         let noLastName = false;
         let noYearOfBirth = false;
         
         if (!student.firstName) {
             firstNameError = 'first name required';
             setFirstName(firstNameError);
             noFirstName = true ;

         }
         if (!student.lastName) {
             lastNameError = ' last name required';
             setLastName(lastNameError);
             noLastName = true ;
         }
         let n=parseInt(student.yearOfBirth);
         if (!Number.isInteger(n)) {                      
            yearOfBirthError = " number required";
           setYearOfBirth(yearOfBirthError);                  
           noYearOfBirth =true;
         }
         if(noFirstName=== true || noLastName=== true || noYearOfBirth=== true)
         {
             return false
         }
             return true;

};

const back = () => {
 history.push('/students');
}
const save = () => {

const isValid = validateinput();
if(isValid) { 

   if (id === '0') {
       insert('students', student, data => {
           if(data) return history.push('/students');
           console.log('There was error during save data');
       })     
   } else {
       update('students', id, student, data => {
        if(data) return history.push('/students');
        console.log('There was error during save data');

       })
   }
}
}

const del = () => {
    remove('students', id, data => {
        history.push('/students');
    })
}


    return (
    <div className='container'>
      <h2>Student</h2>
      <form className='input-form'>
          <div style={{margin:'12px 0'}}>
              <label htmlFor='firstName'> First name</label>
              <input type='text' 
              name='firstName' 
              value={student.firstName}
              onChange={changeHandler} 
               />
          </div>
          <div style={{ fontSize: 12, color: "red" }}>
            {validationFirstName}
            </div>
         
          <div style={{margin:'12px 0'}}>
              <label htmlFor='lastName'> Last name</label>
              <input type='text' 
              name='lastName'  
              value={student.lastName} 
                onChange={changeHandler}  
                  />
                </div>
                <div style={{ fontSize: 12, color: "red" }}>
            {validationLastName}
            </div>

                <div style={{margin:'12px 0'}}>
              <label htmlFor='yearOfBirth'> Year of Birth</label>
              <input type='text' 
              name='yearOfBirth'  
              value={student.yearOfBirth} 
                onChange={changeHandler}  />
          </div>
          <div style={{ fontSize: 12, color: "red" }}>
            {validationYearOfBirth}
            </div>
          <div style={{margin:'12px 0'}}>
              <label htmlFor='address'> Address </label>
              <input type='text' 
              name='address'  
              value={student.address} 
                onChange={changeHandler}  />
          </div>
          <hr/>
          {id !== '0' &&  ( 
          <div className='left'>
              <button type='button' onClick={del}>DELETE</button>
          </div>
          )}
          <div className='right'>
              <button type='button'onClick={back}>BACK</button>
              &nbsp;&nbsp;
              <button type='button' onClick={save}>SAVE</button>
          </div>
          </form>  
        </div>

         );
}

export default Student; 