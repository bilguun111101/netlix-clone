import axios from 'axios';
import { Input } from '@/components';
import React, { useCallback, useState } from 'react';

const Auth = () => {
    // some hooks 
    const [email, setEmail] = useState<string>("");
    const [confirm, setConfirm] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [variant, setVariant] = useState<string>("login");

    // const toggleVariants = useCallback(() => setVariant(variant === 'login' ? 'register' : 'login'), []);
    const toggleVariants = (): void => setVariant(variant === 'login' ? 'register' : 'login');

    const register = useCallback(async() => { 
        try {
            // if(!(password === confirm)) return;
            await axios.post('/api/register', {
                email,
                name: username,
                password
            })
        } catch (error) {
            console.log(error)
        }
    }, [email, username, password]);

    const inputs = [
        { id: 'email', label: "Email", type: 'email', onChange: (e: any) => setEmail(e.target.value), value: email  },
        { id: 'username', label: "Username", type: 'text', onChange: (e: any) => setUsername(e.target.value), value: username },
        { id: 'password', label: 'Password', type: 'password', onChange: (e: any) => setPassword(e.target.value), value: password },
        { id: 'confirm', label: 'Confirm password', type: 'password', onChange: (e: any) => setConfirm(e.target.value), value: confirm }
    ]
  return (
    <div className='relative h-screen w-full bg-[url("../../public/images/hero.jpeg")] bg-no-repeat bg-center bg-fixed bg-cover'>
        <div className='bg-black w-full h-full lg:bg-opacity-50'>
            <nav className='px-12 py-5'>
                <img src="../../public/images/logo.png" alt="logo" className='h-12 ' />
            </nav>
            <div className='flex justify-center'>
                <div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
                    <h2 className='text-4xl mb-8 font-semibold'> { variant === 'login' ? 'Sign in' : 'Register' } </h2>
                    <div className='flex flex-col gap-4'>
                        { inputs.map((el, idx) => {
                            const { value, type, id, onChange, label } = el;
                            if(variant === 'login' && (id === 'confirm' || id === 'username')) return;
                            return (
                                <Input 
                                    value={value} 
                                    type={type} 
                                    id={id} 
                                    onChange={onChange} 
                                    label={label} 
                                    key={idx}
                                />
                            )
                        }) }
                    </div>
                    <button className='bg-red-600 py-3 rounded-md w-full mt-8 hover:bg-red-700' onClick={register}>
                        { variant === 'login' ? 'Log in' : 'Sign up' }
                    </button>
                    <p className='text-neutral-500 mt-12'>
                        { variant === 'login' ? 'First time using Netflix?' : 'Already have an account?' }
                        <span className='ml-1 hover:underline cursor-pointer' onClick={toggleVariants}>
                            { variant === 'login' ? 'Create and account' : 'Log in' }
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Auth;