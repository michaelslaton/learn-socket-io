import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './app.css';

function App() {
  const [formInputs, setFormInputs] = useState({name:'', age: '', phone: ''});
  const [ crudData, setCrudData] = useState({});
  const socket = io('localhost:3000');

  const handleInput = (event) => {
    const { name, value } = event.target;
    let obj = {[name]: value};
    setFormInputs((prev)=> ({...prev, ...obj}));
  };

  const handleSubmit = () => {
    socket.emit('data', formInputs);
    setFormInputs({name:'', age: '', phone: ''})
  };

  useEffect(()=>{
    socket.on('crudData', (data)=>{
      setCrudData(data);
    })
  },[])

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

        <button onClick={handleSubmit}>Add Data</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {crudData.length > 0 && 
            crudData.map((data, i) => (
              <tr key={i}>
                <td>{data?.name}</td>
                <td>{data?.age}</td>
                <td>{data?.phone}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default App;