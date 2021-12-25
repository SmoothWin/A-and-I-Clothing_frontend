export default function Spinner(){
    return(
    <div className="text-center mt-auto mb-auto bg-white" style={{zIndex:300000,position:"absolute", display:"flex", justifyContent:"center", alignItems:"center",width:  "100%", height: "100%", left:0, right:0}}>
        <div className="spinner-grow text-success mx-2" style={{width:  70, height: 70}} role="status">
        <span className="sr-only"></span>
        </div>
        <div className="spinner-grow text-warning mx-2" style={{width:  70, height: 70}} role="status">
        <span clasName="sr-only"></span>
        </div>
        <div className="spinner-grow text-danger mx-2" style={{width:  70, height: 70}} role="status">
        <span className="sr-only"></span>
        </div>
    </div>
    );
}