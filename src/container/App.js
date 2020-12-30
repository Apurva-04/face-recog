import {Component} from 'react'
import Particles from 'react-particles-js';

import Navigation from '../components/Navigation/Navigation.js';
import SignIn from '../components/SignInForm/SignInForm.js';
import Register from '../components/Registration/Registration.js';
import Logo from '../components/Logo/Logo.js';
import Rank from '../components/Rank/Rank.js';
import ImageLinkForm from  '../components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition.js';
import './App.css';

const particlesOptions={
  particles:{
    number:{
      value: 40,
      density:{
        enable: true,
        value_area: 500
      }
    },
    size:{
      value: 3,
      random: true
    }
  }
};

class App extends Component{
  constructor(){
    super();
    this.state={
      input: "",
      imageUrl: "",
      boxes: [],
      route: "signin",
      user:{
        id: -1,
        entries: 0
      }
    }
  }
  /*
  componentDidMount(){
    fetch('http://localhost:4000/')
      .then(response=>response.json())
      .then(console.log)
  }
  */
  calculateFaceLocation=(bounding_box)=>{
    const box={
      left: (bounding_box.left_col)*100,
      right: (1-bounding_box.right_col)*100,
      bottom: (1-bounding_box.bottom_row)*100,
      top: (bounding_box.top_row)*100
    }
    return(box);
  }
  faceLocations=(res=[])=>{
    let boxes=[];
    for(let i=res.length-1;i>=0;i--){
      boxes.push(this.calculateFaceLocation(res[i].region_info.bounding_box));
    }
    this.setState({
      boxes: boxes
    });
  }
  onInputChange=(event)=>{
    this.setState({
      input: event.target.value
    })
  }
  onImageSubmit=()=>{
    this.setState({
      imageUrl: this.state.input,
      boxes: []
    });

    fetch('https://immense-mountain-49497.herokuapp.com/imageurl',
    {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response=>response.json())
    .then((response)=>{
      if(response)
      {
        fetch('https://immense-mountain-49497.herokuapp.com/image',
        {
          method: 'put',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        }).then((res)=>res.json())
          .then((entries)=>
          {
            if(entries>0){
              this.setState({
                user:{
                  id: this.state.user.id,
                  entries: entries
                }
              })
            }
              //console.log(this.state.user.id,this.state.user.entries);
          })
          .catch((err)=>{
            console.log(err);
          });
      }
      this.faceLocations(response.outputs[0].data.regions);
    })
    .catch((err)=>this.faceLocations());
    //to remove(override with 0 boxes) any bounding-boxes present previously.
  }
  onRouteChange=(route,id=-1,entries=0)=>{
    this.setState({
      route: route,
      imageUrl: "",
      boxes: [],
      user:{
        id: id,
        entries: entries
      }
    })
  }
  render(){
    return (
      <div>
        <Particles className="particles" params={particlesOptions}/>
        {
          this.state.route==="signin"
          ?<SignIn onRouteChange={this.onRouteChange}/>
          :(this.state.route==="register"
          ?<Register onRouteChange={this.onRouteChange}/>
          :<div>
            <Navigation onRouteChange={this.onRouteChange}/>
            <Logo/>
            <Rank entries={this.state.user.entries}/>
            <ImageLinkForm onImageSubmit={this.onImageSubmit} onInputChange={this.onInputChange}/>
            <FaceRecognition boxes={this.state.boxes} imageUrl={this.state.imageUrl}/>
          </div>)
        }
      </div>
    );
  }
}

export default App;