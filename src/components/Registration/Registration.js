import React from 'react';

class Registration extends React.Component{
	constructor(props){
		super(props);
		this.state={
			name: '',
			email: '',
			password: ''
		}
	}
	onNameChange=(event)=>{
		this.setState({name: event.target.value})
	}
	onEmailChange=(event)=>{
		this.setState({email: event.target.value})
	}
	onPasswordChange=(event)=>{
		this.setState({password: event.target.value})
	}
	onSubmitRegister=()=>{
		//console.log(this.state);
		fetch('https://immense-mountain-49497.herokuapp.com/register',{
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password
			})
		})
		.then(res=>res.json())
		.then(user=>{
			if(user.id){
				this.props.onRouteChange('home',user.id);
			}
			//console.log(id);
		})
		.catch((err)=>{
			console.log(err);
		})
	}
	render(){
		const onKeyUp=(event)=>{
			if(event.keyCode===13){
				this.onSubmitRegister();
	    	}
		}
		return(
			<div className="content-signin">
				<h1>Register</h1>
				<label className="txt">Name</label>
				<input onChange={this.onNameChange}
				 type="text" className='input-txt' name="email"/>
				<label className="txt">Email</label>
				<input onChange={this.onEmailChange}
				 type="email" className='input-txt' name="email"/>
				<label className="txt">Password</label>
				<input onChange={this.onPasswordChange}
				 onKeyUp={onKeyUp}
				 type="password" className='input-txt' name="password"/>
				<button onClick={this.onSubmitRegister}
				 className="signin-btn">Submit</button>
				<hr style={{borderColor: "rgba(0,0,0,0.4)"}}/>
				<button onClick={()=>this.props.onRouteChange('signin')}
				 className="signin-btn register">Sign In</button>
			</div>
		);
	}
}

export default Registration;