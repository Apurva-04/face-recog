import './ImageLinkForm.css';

const ImageLinkForm=({onInputChange,onImageSubmit})=>{
	const onKeyUp=(event)=>{
		if(event.keyCode===13){
      		onImageSubmit();
    	}
	}
	return(
		<div className="content">
			<p>This is it !!! GIve an image to discover the beauty.</p>
			<div id="beauty">
				<input onChange={onInputChange} onKeyUp={onKeyUp}
				 type="text" className="imagefeed"/>
				<button className="btn" onClick={onImageSubmit}>Detect</button>
			</div>
		</div>
	);
}

export default ImageLinkForm;