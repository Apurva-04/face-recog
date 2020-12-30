import React from 'react';
import './SignInForm.css';

class SignIn extends React.Component{
	constructor(props){
		super(props);
		this.state={
			signInEmail: '',
			signInPassword: ''
		}
	}
	onEmailChange=(event)=>{
		this.setState({signInEmail: event.target.value})
	}
	onPasswordChange=(event)=>{
		this.setState({signInPassword: event.target.value})
	}
	onSubmitSignIn=()=>{
		//console.log(this.state);
		fetch('https://immense-mountain-49497.herokuapp.com/signin',{
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
		.then((res)=>res.json())
		.then((user)=>{
			if(user.email===this.state.signInEmail){
				this.props.onRouteChange('home',user.id,user.entries);
			}
		})
		.catch((err)=>{
			console.log(err);
		})
	}
	render(){
		const onKeyUp=(event)=>{
			if(event.keyCode===13){
				this.onSubmitSignIn();
	    	}
		}
		return(
			<div className="content-signin">
				<h1>Sign In</h1>
				<label className="txt">Email</label>
				<input onChange={this.onEmailChange}
				 type="email" className='input-txt' name="email"/>
				<label className="txt">Password</label>
				<input onChange={this.onPasswordChange}
				 onKeyUp={onKeyUp} 
				 type="password" className='input-txt' name="password"/>
				<button onClick={this.onSubmitSignIn}
				 className="signin-btn">Submit</button>
				<hr style={{borderColor: "rgba(0,0,0,0.4)"}}/>
				<button onClick={()=>this.props.onRouteChange('register')}
				 className="signin-btn register">Register</button>
			</div>
		);
	}
}

export default SignIn;