import './FaceRecognition.css';

const FaceRecoginition=({imageUrl,boxes})=>{
    //const bounding_boxes=document.getElementsByClassName("bounding-boxes");
    //console.log(bounding_boxes.length);
    let arr=[];
	for(let i=0;i<boxes.length;i++)
	{
		const style={
			position: "absolute",
			left: boxes[i].left+'%',
			right: boxes[i].right+'%',
			bottom: boxes[i].bottom+'%',
			top: boxes[i].top+'%'
		}
		const boxElement=<div key={i} className="bounding-boxes" style={style}></div>;
		arr.push(boxElement);
	}
	return(
		<div className="img-container">
			<img id="input-img" alt="beauty" src={imageUrl}/>
			{arr}
		</div>
	);
}

export default FaceRecoginition;