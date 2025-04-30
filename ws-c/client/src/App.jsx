import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import io from 'socket.io-client';
import './app.css';

const socket = io('localhost:3000');

function App() {
  const [formInputs, setFormInputs] = useState({name:'', age: '', phone: ''});
  const [ crudData, setCrudData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  
  useEffect(()=>{
    socket.on('crudData', (data)=>{
      setCrudData(data);
    })
  },[]);

  const handleInput = (event) => {
    const { name, value } = event.target;
    let obj = {[name]: value};
    setFormInputs((prev)=> ({...prev, ...obj}));
  };

  const handleSubmit = () => {
    socket.emit('data', { ...formInputs, id: uuidv4() });
    
    setFormInputs({name:'', age: '', phone: ''})
  };

  const getEditData = (data) => {
    setFormInputs(data)
    setIsEdit(true);
  }

  const handleEdit = () => {
    socket.emit('editData', formInputs);
    setIsEdit(false);
    setFormInputs({name:'', age: '', phone: ''})
  }

  const handleDelete = (id) => {
    socket.emit('deleteData', id);
  }

  return (
    <>
      <h1>Crud Operations</h1>

      <div className='form-fields'>
        <input
          onChange={handleInput}
          name='name'
          className='input-field'
          placeholder='Enter your Name'
          value={formInputs.name}
        />
        <input
          onChange={handleInput}
          name='age'
          className='input-field'
          placeholder='Enter your Age'
          value={formInputs.age}
        />
        <input
          onChange={handleInput}
          name='phone'
          className='input-field'
          placeholder='Enter your Phone Number'
          value={formInputs.phone}
        />

        <button onClick={() => isEdit ? handleEdit() : handleSubmit()}>{isEdit ? 'Edit' : 'Add'} Data</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Phone Number</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {crudData.length > 0 && 
            crudData.map((data, i) => (
              <tr key={i}>
                <td>{data?.name}</td>
                <td>{data?.age}</td>
                <td>{data?.phone}</td>
                <td>
                  <button
                    onClick={()=> getEditData(data)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button onClick={()=> handleDelete(data.id)}>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default App;