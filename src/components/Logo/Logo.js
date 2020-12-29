import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo=()=>{
	return(
		<Tilt className="Tilt" options={{max:40}}>
			<div className="Tilt-inner">
				<img src={brain} alt="logo"/>
			</div>
		</Tilt>
	);
}

export default Logo;