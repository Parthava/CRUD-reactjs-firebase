import React, {useState, useEffect} from 'react';
import database from './Firebase';


function Form() {

  const [title, setTitle] = useState();
  const [time, setTime] = useState();

  const handledata = (event) => {
    event.preventDefault();
    database.collection('myrecord').add({
      title,
      time: parseInt(time)
    })
    .then(() => {
      setTitle('');
      setTime('');
    })
  }

  return (
    <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-around' }}>
      <form onSubmit={handledata}>
        Title: <input type='text' name='title' value={title} placeholder='Title' 
        onChange={(event) => { setTitle(event.target.value) }}/>&nbsp;
        Time in mins: <input type='text' name='time' value={time} placeholder='Time in mins' 
        onChange={(event) => { setTime(event.target.value) }}/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default Form;