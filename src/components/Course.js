import { useEffect, useState } from 'react';
import { read, insert, update, remove } from '../services/apiService';

const Course = ({ match, history}) => {     

const [id] = useState(match.params.id);     
const [course, setCourse] = useState({      
    _id: '0',                               
    name: '',
    points: 0 
});
const [validationName,setName] = useState(''); 
const [validationPoints,setPoints] = useState(''); 

useEffect (() => {              
    if(id !== '0'){
        read('courses', id, data => {
            if(data) setCourse(data);
        })
    }
}, [id]);

function changeHandler(e) {    
    if(e.target.name==='points' && e.target.value !=='') 
 {
    setPoints('');

 }
 if(e.target.name==='name' && e.target.value !=='')
 {
    setName('');

 }
                      

setCourse({
    ...course,
    [e.target.name]:e.target.value

});
}

const validateinput = () => {  
    let nameError = "";
    let pointsError ="";
   let noName=false;
    let noNumber=false;
    

    if (!course.name) {                
      nameError = "name required";
      setName(nameError);                     
     noName=true;
    }
   
      let n=parseInt(course.points);
      if (!Number.isInteger(n)) {                      
        pointsError = "number required";
        setPoints(pointsError);                  
        noNumber=true;
      }
      if(noName===true ||  noNumber===true)
      {
          return false;
      }
    
    
    return true;
  };





const back = () => {
 history.push('/courses');
}

const save = () => {
    
 
    const isValid = validateinput();      
    if(isValid) { 
   if (id === '0') {
       insert('courses', course, data => {
           if(data) return history.push('/courses');
           console.log('There was error during save data');
       })     
   } else {
       update('courses', id, course, data => {
        if(data) return history.push('/courses');
        console.log('There was error during save data');

       })
   }
}
}

const del = () => {
    remove('courses', id, data => {
        history.push('/courses');
    })
}

    return (
    <div className='container'>
      <h2>Course</h2>
      <form className='input-form'>
          <div style={{margin:'12px 0'}}>
              <label htmlFor='name'> Name</label>
              <input type='text' 
              name='name' 
              value={course.name}
              onChange={changeHandler} 
              />
          </div>
          <div style={{ fontSize: 12, color: "red" }}>
            {validationName}
          </div>
          <div style={{margin:'12px 0'}}>
              <label htmlFor='points'> Points</label>
              <input type='text' 
              name='points'  
              value={course.points} 
                onChange={changeHandler}  
               />
          </div>
          <div style={{ fontSize: 12, color: "red" }}>
            {validationPoints}
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

export default Course; 