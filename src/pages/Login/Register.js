import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Register = () => {
    const { createUser, updateUser, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate()

    const googleProvider = new GoogleAuthProvider();

    const handleSignUp = (event) => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name);

        console.log(email, password)
        createUser(email, password)
            .then(result => {
                const user = result.user;
                toast.success('Registration successful!');
                updateUserInfo(name);
                navigate('/')
                console.log(user);
            })
            .catch(err => {
                console.error(err);
                toast.error(err)
            })
    }


    const updateUserInfo = (name) => {
        const profile = {
            displayName: name,
        }
        updateUser(profile)
            .then(() => { })
            .catch(e => console.log(e))
    }

    const handleGoogleSignIn = () => {
        googleSignIn(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                const currentUser = {
                    email: user?.email
                }

                fetch('http://localhost:5000/jwt', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        localStorage.setItem('practice-car', data.token);
                        /*  navigate(from, { replace: true }); */
                    })

            })
            .catch(err => {
                console.error(err);
                alert(err)
            })
    }


    return (
        <div className="hero">
            <div className="hero-content flex-col  lg:flex-row">
                <div className="text-center lg:text-left w-1/2">

                </div>
                <div className='px-5 lg:px-20  py-10  flex flex-col items-center text-slate-300 '>
                    <form onSubmit={handleSignUp} className="p-7 lg:p-10  rounded border-green-300 w-[350px]   lg:w-[450px] border" >
                        <p className='text-center text-2xl  font-semibold'>Register</p>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-slate-300">Full Name</span>
                            </label>
                            <input type="text" name='name' placeholder="Your Full Name" className="input input-bordered text-orange-600 font-semibold " required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-slate-300">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="Your Valid Email" className="input input-bordered text-orange-600 font-semibold " required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-slate-300">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="Password" className="input input-bordered text-orange-600 font-semibold " required />

                        </div>
                        <div className='text-red-600 bg-red-100 mb-3 mt-2 '>
                            {/* {error} */}
                        </div>
                        <div >
                            <input type="checkbox" id="terms" name="terms" value="terms" />
                            <label htmlFor="terms"> {<>
                                Accept <Link to='/terms' className="underline text-orange-600">Terms and Conditions</Link>
                            </>}</label>
                        </div>
                        <div className="form-control mt-6">
                            <button type='submit' className="btn  text-black border-btn-color hover:bg-orange-500 hover:border-orange-500 bg-orange-400 border-orange-400">Register</button>
                        </div>
                        <div className="text-center">
                            <small className="mr-2">Already have an account?</small>
                            <Link
                                to="/login"
                                className="label-text-alt link link-hover text-orange-600"
                            >
                                Please Login
                            </Link>
                        </div>
                    </form>
                    <div className='mb-3 mt-3'>
                        Register with one of the following
                    </div>
                    <div className='flex flex-row justify-center gap-3 mb-5 w-[25%]'>
                        <button onClick={handleGoogleSignIn} className="btn btn-outline btn-success rounded  flex gap-2">Google </button>
                        <button className="btn btn-outline btn-success rounded flex gap-2 "> Github</button>
                    </div>

                    {/*  {
                openModal && <Reset handleResetPassword={handleResetPassword}></Reset>
            } */}


                </div >
            </div>
        </div>
    );
};

export default Register;