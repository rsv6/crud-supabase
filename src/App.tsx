import React, { FormEvent, useEffect, useState } from 'react';
import { supabase } from './createClient';

type UserProps = {
  id: number,
  name: string,
  age: number,
}

interface Users extends UserProps {}

const App = () => {
  
  const [users, setUsers] = useState<Users[]>([]);
  const [user, setUser] = useState<Omit<Users, "id">>({
    name: "",
    age: 0
  })


  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const { data } = await supabase
      .from('users')
      .select("*")

    if (!data) return;
    setUsers(data);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevFromData) => {
      return {
        ...prevFromData,
        [e.target.name]: e.target.value
      }
    })
  }

  async function createUser(e: React.FormEvent<HTMLFormElement>) {
    // e.preventDefault();
    const { error, data } = await supabase
      .from("users")
      .insert({
        name: user.name,
        age: user.age
      })
      
    console.log("data: ", data); 

    if (error) {
      console.log("Error: ", error);
      return;
    }
    
    console.log("User created!");
    return
  }

  console.log(user);
  
  return (
    <div
      className='
        w-screen
        h-screen
        border-[2px]
        border-red-500
        flex
        flex-col
        justify-start
        items-center
        gap-4
      '
    >
      <form className='flex gap-2 mt-7' onSubmit={createUser}> 
        <input 
          type='text'
          className='border-[1px] border-blue-800'
          placeholder='Name'
          name='name'
          onChange={handleChange}
          // value={use}
        />
        <input 
          type='number'
          className='border-[1px] border-blue-800'
          placeholder='Age'
          name='age'
          onChange={handleChange}
          // value={use}
        />
        <button type='submit'>Create</button>
      </form>
      
      <table 
        className='
          border-collapse]
          border-[1px]
          border-green-500
          max-w-[900px]
          w-full
          //m-[2rem auto]
        '
      >
        <thead>
          <tr>
            <th className='border'>Id</th>
            <th className='border'>Name</th>
            <th className='border'>Age</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className='border text-center'>{user.id}</td>
              <td className='border text-center'>{user.name}</td>
              <td className='border text-center'>{user.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App