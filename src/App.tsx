import React, { useEffect, useState } from 'react';
import { supabase } from './createClient';

type UserProps = {
  id: number,
  name: string,
  age: number,
}

interface Users extends UserProps {}

const App = () => {
  
  const [toggleButton, setToggleButton] = useState<boolean>(false);
  const [users, setUsers] = useState<Users[]>([]);
  // const [userUpdate, setUserUpdate] = useState<UserProps>({
  //   id: 0,
  //   name: "",
  //   age: 0
  // });
  // const [user, setUser] = useState<Omit<Users, "id">>({
  const [user, setUser] = useState<Users>({
    id: 0,
    name: "",
    age: 0
  })


  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
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

  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    const { error, data } = await supabase
      .from("users")
      .insert({
        name: user.name,
        age: user.age
      })

    fetchUser();
      
    console.log("Data create: ", data); 

    if (error) {
      console.log("Error: ", error);
      return;
    }
    
    console.log("User created!");
    return;
  }

  async function deleteUser(id?: number){
    console.log("User Id: ", id)
    const { error, data } = await supabase
      .from("users")
      .delete()
      .eq('id', id)
  
    fetchUser();

    if (error) {
      console.log("Error: ", error);
    }

    if (data) {
      console.log("Data delete ", data);
    }
  }

  async function editUser(userData: UserProps) {
    setUser({
      id: userData.id,
      name: userData.name,
      age: userData.age
    })

    setToggleButton(true);
  }

  async function updateUser(userDataUpdate: UserProps) {
    const { error, data } = await supabase
      .from("users")
      .update({
        name: userDataUpdate.name,
        age: userDataUpdate.age
      })
      .eq("id", userDataUpdate.id);
      
    console.log("Data: ", data);
    await fetchUser();

    setToggleButton(false)
    setUser({
      id: 0,
      name: "",
      age: 0
    })

    if (error) {
      console.log("Error: ", error);
    }    
  }

  
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
      <form className='flex gap-2 mt-7' onSubmit={async (e) => {
          e.preventDefault();
          console.log("toggleButton: ", toggleButton)
          if (!toggleButton) {
            await createUser(e)
            return
          }

            await updateUser(user)
            return
        }}> 
        {toggleButton && 
          <input 
            className='
              //disabled:*
              w-20
              bg-gray-100
              border-none
              outline-none
              text-center
            '
            type='text' 
            readOnly 
            value={user.id} 
            name='id'
          />}
        <input 
          type='text'
          className='border-[1px] border-blue-800 pl-2'
          placeholder='Name'
          name='name'
          onChange={handleChange}
          value={user.name}
        />
        <input 
          type='number'
          className='border-[1px] border-blue-800 pl-2'
          placeholder='Age'
          name='age'
          onChange={handleChange}
          value={user.age}
        />
        {!toggleButton
          ? <button type='submit' 
              className={`
                  text-white 
                  font-semibold 
                  rounded-md
                  hover:shadow-md
                  p-2
                bg-green-500 hover:bg-green-600
                `
              }
            >Create</button>
          : <button type='submit' 
            className={`
                text-white 
                font-semibold 
                rounded-md
                hover:shadow-md
                p-2 
                bg-blue-500 hover:bg-blue-60
              `
            }
          >Update</button>
        }
        <button type='button' 
          className='
          bg-red-500
            text-white 
            font-semibold 
            rounded-md
            p-2
            hover:bg-red-600 
            //hover:text-gray-100
            hover:shadow-md
          '
          onClick={() => {
            setUser({
              id: 0,
              name: "",
              age: 0
            })
            setToggleButton(false)
          }}

        >Cancel</button>
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
            <th className='border'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.sort((a, b) => a.id - b.id).map((user) => (
            <tr key={user.id}>
              <td className='border text-center'>{user.id}</td>
              <td className='border text-center'>{user.name}</td>
              <td className='border text-center'>{user.age}</td>
              <td className='border text-center flex justify-center gap-2'>
                <button
                  className='
                    bg-red-600
                    hover:bg-red-700
                    hover:shadow-md
                    text-white
                    font-semibold
                    p-2
                    rounded-md
                  '
                  onClick={() => deleteUser(user.id)}
                >Delete</button>

                <button
                  className='
                    bg-yellow-400
                    hover:bg-yellow-500
                    hover:shadow-md
                  
                    font-semibold
                    p-2
                    rounded-md
                  '
                  onClick={() => editUser(user)}
                >Edit</button>
              </td>
            </tr>
          )).sort()}
        </tbody>
      </table>
    </div>
  )
}

export default App



/*



{users.map((user) => (
            <tr key={user.id}>
              <td className='border text-center'>{user.id}</td>
              <td className='border text-center'>{user.name}</td>
              <td className='border text-center'>{user.age}</td>
              <td className='border text-center flex justify-center gap-2'>
                <button
                  className='
                    bg-red-600
                    hover:bg-red-700
                    hover:shadow-md
                    text-white
                    font-semibold
                    p-2
                    rounded-md
                  '
                  onClick={() => deleteUser(user.id)}
                >Delete</button>

                <button
                  className='
                    bg-yellow-400
                    hover:bg-yellow-500
                    hover:shadow-md
                  
                    font-semibold
                    p-2
                    rounded-md
                  '
                  onClick={() => editUser(user)}
                >Edit</button>
              </td>
            </tr>
          )).sort()}


          */