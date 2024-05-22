import React, { useState } from "react"

interface LoginFormProps{
    onClose:() => void
}

const INITIAL_STATE = {
    name:'',
    email:'',
    password:'',
    phone:0
}

export const LoginForm:React.FC<LoginFormProps>=({onClose})=>{
    const [user,setUser] = useState<User>(INITIAL_STATE)
    //TODO  validacion de usuarios
    //      login con google
    //      DB de usuarios



    const handleSubmit= (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log(user);
        
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
      

    return(
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-50" >
                <div className="bg-white p-4 shadow-md rounded-lg" >
                    <form onSubmit={handleSubmit}>
                        <span>Nombre</span>
                        <input
                            name="name"
                            type='text'
                            value={user.name}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2 mb-2 w-full text-black"
                            placeholder="First and Last Name"
                        />
                        <span>Email</span>
                        <input
                            name="email"
                            type='email'
                            value={user.email}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2 mb-2 w-full text-black"
                            placeholder="example@mail.com"
                        />
                        <span>Contraseña</span>
                        <input
                            name="password"
                            type='password'
                            value={user.password}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2 mb-2 w-full text-black"
                            placeholder="Password"
                        />
                        {/*TODO confirm password */}
                        <span>Telefono <span>(opcional)</span></span>
                        <input
                            name="phone"
                            type='number'
                            value={user.phone}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2 mb-2 w-full text-black"
                            
                            
                        />
                        
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Login
                        </button>
                    </form>
                    <button onClick={onClose} className="mt-2 text-gray-600 hover:text-gray-800">
                        Close
                    </button>
                </div>
            </div>
    )
}