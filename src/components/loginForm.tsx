import React, { useEffect, useState } from "react";


interface LoginFormProps {
    onClose: () => void;
    toLogin: (name: string, email: string, phone?: number | undefined) => void;
}

const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
    testPassword: '',
    phone:2284123456
};

type ErrorType = "passwordLength" | "emailRegistered" | "invalidEmail" | "passwordMismatch" | "nameLength";
type ErrorMessage = [ErrorType];

export const LoginForm: React.FC<LoginFormProps> = ({ onClose,toLogin }) => {
    const [user, setUser] = useState<User>(INITIAL_STATE);
    const [errors, setErrors] = useState<ErrorMessage[]>([]);
    const [trySubmit,setTrySubmit]=useState<boolean>(false)
    const inputClassname = "border border-gray-300 rounded-md p-2 mb-2 w-full text-black";

    const validation = () => {
        const errorMessages: ErrorMessage[] = [];
        const addError = (type: ErrorType) => {
            errorMessages.push([type]);
        }
       
        if (user.name.length < 5) {
            addError("nameLength");
        }

        if (user.password !== user.testPassword) {
            addError("passwordMismatch");
        }

        if (!user.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            addError("invalidEmail");
        }

        if (user.password.length < 5) {
            addError("passwordLength");
        }

        setErrors(errorMessages);
        return errorMessages.length === 0;
    
        
    };

    

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTrySubmit(true);
        const isvalid = validation();
        
        isvalid&&(
            toLogin(user.name, user.email, user.phone),
            onClose()
        )
         
    }

    const handleChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
        trySubmit&&(validation())
    };

    useEffect(() => {()=>validation()},[user]);

    

    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-4 shadow-md rounded-lg  w-3/4">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <span>Nombre</span>
                        <input
                            name="name"
                            type='text'
                            value={user.name}
                            onChange={handleChange}
                            className={inputClassname}
                            placeholder="First and Last Name"
                        />
                        {errors.find(error => error[0] === "nameLength") && (
                            <span className="text-red-600">El nombre es demasiado corto (debe tener más de 4 dígitos)</span>
                        )}
                    </div>
                    
                    <div>
                        <span>Email</span>
                        <input
                            name="email"
                            type='email'
                            value={user.email}
                            onChange={handleChange}
                            className={inputClassname}
                            placeholder="example@mail.com"
                        />
                        {errors.find(error => error[0] === "invalidEmail") && (
                            <span className="text-red-600">El correo electrónico no es válido</span>
                        )}
                    </div>
                    
                    <div>
                        <span>Contraseña</span>
                        <input
                            name="password"
                            type='password'
                            value={user.password}
                            onChange={handleChange}
                            className={inputClassname}
                            placeholder="Password"
                        />
                        {errors.find(error => error[0] === "passwordLength") && (
                            <span className="text-red-600">La contraseña es demasiado pequeña (debe tener más de 4 dígitos)</span>
                        )}
                    </div>
                    

                    <div className=" flex flex-col gap-0">
                        <span>Confirmar contraseña</span>
                        <input
                            name="testPassword"
                            type='password'
                            value={user.testPassword}
                            onChange={handleChange}
                            className={inputClassname}
                            placeholder="Confirm Password"
                        />
                        {errors.find(error => error[0] === "passwordMismatch") && (
                            <span className="text-red-600">Las contraseñas no coinciden</span>
                        )}
                    </div>
                    
                    <div>
                        <span>Telefono <span>(opcional)</span></span>
                        <input
                            name="phone"
                            type='number'
                            value={user.phone}
                            onChange={handleChange}
                            className={inputClassname}
                        />
                    </div>
                    

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
