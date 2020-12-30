import './Navigation.css';

const Navigation=({onRouteChange})=>{
	return(
		<nav>
			<p onClick={()=>onRouteChange('signin')}>Sign Out</p>
		</nav>
	);
}

export default Navigation;