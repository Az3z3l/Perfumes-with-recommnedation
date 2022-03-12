import React,{useState,useEffect} from 'react'
import './loginreg.css'
import axios from 'axios'
import  { useHistory,Redirect } from 'react-router-dom'


const Loginreg = () => {

const [signup, setSignup] = useState(true);
const [da, setDa] = useState(false)
const history = useHistory();


useEffect(() => {
	if(localStorage.getItem('token')?.split('.').length==2){
		document.location='/'
	}
}, []);

useEffect(() => {
	console.log('1');
}, [da]);

const Register=async (event)=>{
	event.preventDefault()
	const register={"email":event.target.email.value,"username":event.target.elements.username.value,"password":event.target.password.value}
	const response=await axios.post('http://localhost:3000/api/authentication/register',register)
	if(response.data['status']=='ok'){
		localStorage.setItem("token", response.data['data']['token']);
		document.location="/"
	}else{
		history.push("/auth")
	}
}

const Login=async (event)=>{
    	event.preventDefault()
	const login={"email":event.target.email.value,"password":event.target.password.value}
	const response=await axios.post('http://localhost:3000/api/authentication/login',login)
	if(response.data['status']=='ok'){
		localStorage.setItem("token", response.data['data']['token']);
		document.location="/"

	}else{
		alert('Wrong Passowrd or username')
		history.push("/auth")
	}
}

    return (
<div className="onlythis"> 
<div className={signup?"container":"container right-panel-active"} id="container">
	<div className="form-container sign-up-container">

		<form onSubmit={Register}>
			<h1>Create Account</h1>
			<div className="social-container">
				<a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
				<a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
				<a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
			</div>
			<span>or use your email for registration</span>
			<input type="text" name="username" placeholder="Name*" />
			<input type="email" name="email" placeholder="Email*" />
			<input type="password" name="password" placeholder="Password*" />
			<button>Sign Up</button>
		</form>
	</div>
	<div className="form-container sign-in-container">
		<form  onSubmit={Login}>
			<h1>Sign in</h1>
			<div className="social-container">
				<a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
				<a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
				<a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
			</div>
			<span>or use your account</span>
			<input name="email" type="email" placeholder="Email*" />
			<input name="password" type="password" placeholder="Password*" />
			<a href="#">Forgot your password?</a>
			<button>Sign In</button>
		</form>
	</div>
	<div className="overlay-container">
		<div className="overlay">
			<div className="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<button onClick={()=>{setSignup(!signup)}} className="ghost" id="signIn">Sign In</button>
			</div>
			<div className="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start journey with us</p>
				<button onClick={()=>{setSignup(!signup)}} className="ghost" id="signUp">Sign Up</button>
			</div>
		</div>
	</div>
</div>


</div>
    )
}

export default Loginreg
