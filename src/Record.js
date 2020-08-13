import React, {useState, useEffect} from 'react';
import database from './Firebase';

const sort_options = {
	'time_asc': {column: 'time', direction: 'asc'},
	'time_dsc': {column: 'time', direction: 'desc'},

	'title_asc': {column: 'title', direction: 'asc'},
	'title_dsc': {column: 'title', direction: 'desc'},
}

function Record() {
   const [data, setData] = useState([]);
   const [sortby, setSortby] = useState('time_asc');

   const [updatetitle, setTitle] =  useState();
   const [updatetime, setTime] = useState();
   const [key, setKey] = useState();

   const handleDelete = (id) => {
   	console.log(id);
   	database.collection('myrecord').doc(id).delete();
	
   }

   const updateData = () => {
   	database.collection('myrecord').doc(key).set({
   	  title: updatetitle,
      time: parseInt(updatetime)
   	})
   	.then(() => {
   		setTitle('');
   		setTime('');
   	})
   }

   useEffect(() => {

   const unsubscribe = database.collection('myrecord')
   	.orderBy(sort_options[sortby].column, sort_options[sortby].direction)
   	.onSnapshot((snapshot) => (
      setData(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})))

    ));

   return () => {

    unsubscribe(); //this is the cleanup

   };

  }, [sortby]);


  return (
    <div>
      <label>Sort by: </label>
      <select onChange={(event) => { setSortby(event.target.value) }}>
      	<option value='time_asc'>Time (Fastest first)</option>
      	<option value='time_dsc'>Time (Slowest first)</option>
      	<option disabled>-----</option>
      	<option value='title_asc'>Title (a-z)</option>
      	<option value='title_dsc'>Title (z-a)</option>
      </select><br/><br/>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
	      	<table border='1' cellPadding="5">
			  <thead>
			    <tr>
			      <th>Title</th>
			      <th>Time in mins</th>
			      <th>Delete</th>
			      <th>Update</th>
			    </tr>
			  </thead>
	      	{data.map((dt) => (
		      	<tbody key={dt.id}>
				    <tr>
				      <td>{ dt.title }</td>
				      <td>{ dt.time }</td>
				      <td><button onClick={() => handleDelete(dt.id)}>Delete</button></td>
				      <td><button onClick={() => { setTitle(dt.title); setTime(dt.time); setKey(dt.id); }}>Update</button></td>
				    </tr>
				</tbody>
	      	))}
	      </table>
	   </div>
	   {(updatetitle || updatetime) ? (<p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}><table border='1' cellPadding="5">
			  <thead>
			    <tr>
			      <th>Title</th>
			      <th>Time in mins</th>
			      <th>Update</th>
			    </tr>
			  </thead>
			  <tbody>
				    <tr>
				      <td><input type='text' value={ updatetitle } placeholder='Title' 
				      onChange={(event) => { setTitle(event.target.value);}}/></td>
				      <td><input type='text' value={ updatetime } placeholder='Time' 
				      onChange={(event) => { setTime(event.target.value);}}/></td>
				      <td><button onClick={updateData}>Done</button></td>
				    </tr>
			</tbody>
		</table></p>) : 
	   (<p></p>)}
    </div>
  );
}

export default Record;
