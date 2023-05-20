import {
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  collection,
  getDocs,
  query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import './App.css';
import { db } from './firebase';


function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [persons, setPersons] = useState([]);
  const onSubmit = async (e) => {
    e.preventDefault();
    const person = { name, age: parseInt(age) };
    await addDoc(collection(db, 'persons'), person);
    setName('');
    setAge('');
    getPersons();
  };

  const getPersons = async () => {
    const q = query(collection(db, 'persons'));
    const querySnapshot = await getDocs(q);
    let persons = [];
    querySnapshot.forEach((doc) => {
      persons.push({ ...doc.data(), id: doc.id });
    });
    setPersons(persons);
  };

  const editPerson = async (id, name, age) => {
    await updateDoc(doc(db, 'persons', id), {
      name,
      age: parseInt(age),
    });
    getPersons();
  };

  const deletePerson = async (id) => {
    await deleteDoc(doc(db, 'persons', id));
    getPersons();
  };
  useEffect(() => {
    getPersons();
  }, []);

  return (
    <>
      <div className='App'>
        <div className='container'>
          <div>
            <h1 className='heading'>React Firebase CRUD</h1>
            <form onSubmit={onSubmit}>
              {' '}
              {/* form begins */}
              <div className='formcontrol'>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className='formcontrol'>
                <label htmlFor='name'>Age</label>
                <input
                  type='text'
                  id='age'
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
              <button type='submit' className='btn'>
                Add
              </button>
            </form>{' '}
            {/* form end */}
            <div className='section'>
              {' '}
              {/* Display Section Begins */}
              <table>
                <thead>
                  <tr>
                    {/* <th>ID</th> */}
                    <th>Name</th>
                    <th>Age</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {persons.map((person) => (
                    <tr key={person.id}>
                      {/*<td>{person.id}</td>*/}
                      <td data-label="Name">{person.name}</td>
                      <td data-label="Age">{person.age}</td>
                      <td data-label="Action">
                        <input
                          type='change'
                          value={'Edit'}
                          onClick={() =>
                            editPerson(
                              person.id,
                              prompt('Enter new name', person.name),
                              prompt('Enter new age', person.age)
                            )
                          }></input>
                        <input
                          type='change'
                          value={'Delete'}
                          onClick={() => deletePerson(person.id)}></input>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>{' '}
            {/* Display Section Ends */}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
