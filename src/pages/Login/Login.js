import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Login = () => {
    const { signIn } = useContext(AuthContext);
    let location = useLocation();
    const navigate = useNavigate();

    let from = location.state?.from?.pathname || "/";

    const handleSignIn = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        //console.log(email, password)
        signIn(email, password)
            .then(result => {
                const user = result.user;
                const currentUser = {
                    email: user.email
                }

                console.log(currentUser)
                //getting token from the server
                fetch('https://smart-car-server.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        localStorage.setItem('smart-token', data.token);
                        navigate(from, { replace: true });
                    })
                /* navigate(from, { replace: true });
                toast.success('You are logged in!')
                console.log(user); */
            })
            .catch(err => {
                console.error(err);
                toast.error(err)
            })

    }
    return (
        <div className="hero">
            <div className="hero-content flex-col  lg:flex-row">
                <div className="text-center lg:text-left w-1/2">

                </div>
                <div className='px-5 lg:px-20  py-10  flex flex-col items-center text-slate-900'>
                    <form onSubmit={handleSignIn} className="p-7 lg:p-10 border    rounded border-orange-300 w-[350px]   lg:w-[450px] " >
                        <p className='text-center text-black text-2xl  font-semibold'>Login </p>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-slate-900">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered text-orange-600 font-semibold " required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-slate-900">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered text-orange-600 font-semibold" required />
                        </div>
                        <div className='text-red-600 bg-red-100 mb-3 mt-2 '>
                            {/* {error} */}
                        </div>
                        <div className='flex justify-between mt-3'>
                            <div>

                                <label htmlFor="terms"> {<>
                                    Forgot Password?
                                </>}</label>
                            </div>
                            <div >
                                <label htmlFor="my-modal-3" className="cursor-pointer underline text-orange-600 ">Reset Password</label>
                            </div>

                        </div>
                        <div className="form-control mt-6">
                            <button className="btn  text-black border-btn-color hover:bg-orange-500 hover:border-orange-500 bg-orange-400 border-orange-400">Login</button>
                        </div>

                        <div className='text-center'>
                            <small className='mr-2'>New to edu-Cate?</small>
                            <Link to='/register' className="label-text-alt link link-hover text-orange-600">Register Now</Link>
                        </div>
                    </form>
                    <div className='mb-3 mt-3'>
                        Log in with one of the following
                    </div>
                    <div className='flex flex-row justify-center gap-3 mb-5 w-[25%]'>
                        <button className="btn btn-outline btn-warning rounded  flex gap-2"> Google </button>
                        <button className="btn btn-outline btn-warning rounded flex gap-2 "> Github</button>
                    </div>
                </div >
            </div>
        </div>
    );
};

export default Login;