import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";

const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const { createUser, user, signinWithGoogle } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    if(user){
        navigate(location?.state?.from || '/');
    }
    const handalRegister = e => {
        e.preventDefault();
        console.log(e.currentTarget);
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const photo = form.get('photo');
        const email = form.get('email');
        const password = form.get('password');
        console.log(name, photo, email, password);

        // Registration validation start
        if (password.length < 6) {
            setRegisterError('password should have 6 characters')
            return;
        }
        if (!/[A-Z]/.test(password)) { // Check for the absence of a capital letter
            setRegisterError('Password should have a capital letter');
            return;
        }
        if (!/[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/.test(password)) {
            setRegisterError('Password should have at least one special character');
            return;
        }
        // Registration validation End
        setRegisterError('');
        setSuccess('');
        // create user
        createUser(email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('User created successfully');
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: photo,
                })
                .then(() => {
                    console.log('profile updted');
                })
                .catch(error =>{
                    console.log(error.message);
                    
                })
                navigate(location?.state?.from || '/');
            })
            .catch(error => {
                setRegisterError(error.message);
            })


    }

    const handalGoogleSignIn =()=>{
        signinWithGoogle()
        .then( result =>{
            console.log(result.user);
            navigate(location?.state || '/');
        })
        .catch(error =>{
            console.log(error.message);
        })
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handalRegister}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="Name" name="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" placeholder="Photo URL" name="photo" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-pink-600 text-white hover:bg-pink-600">Register</button>
                            </div>
                        </form>
                        {
                            registerError && <p className="text-center text-red-700">{registerError}</p>
                        }
                        {
                            success && <p className="text-center text-green-700">{success}</p>
                        }
                        <div className="text-center pb-2 ">
                            <Link to="/login">
                                have a account ? <span className="text-blue-600">Login Here</span>
                            </Link>
                        </div>
                        <div className="text-center pb-8 ">   
                                 <span className="btn text-blue-600" onClick={handalGoogleSignIn}>Google</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;