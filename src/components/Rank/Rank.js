const Rank=({entries})=>{
	return(
		<div className="content">
			<div>
				Your rank is .... 
			</div>
			<div style={{fontSize:"36px"}}>
				{entries}
			</div>
		</div>
	);
}

export default Rank;