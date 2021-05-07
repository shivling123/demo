import Axios from "axios";
import react , { useState,useEffect } from "react";
function EmployForm() {

    const [fname, setFname] = useState('');

    const [rollno, setRollno] = useState('');
    const [fnameList, setRollnoList] = useState([]);

    const [newFname, setNewFname] = useState("");
  
    
useEffect(() => {
    Axios.get("http://localhost:2002/api/get").then((Response) =>{
        setRollnoList(Response.data);
    });
});

    const submitReview = () => {
        Axios.post("http://localhost:2002/api/insert", {
            fname: fname, 
            rollno: rollno,
            
        }).then(()=>{
            alert("successfull insert");
            console.log("record inserted ")
            setRollnoList([...fnameList, {fname: fname, rollno: rollno},
            ]);
        });
    };

    const deleteReview= (name) =>{
        Axios.delete(`http://localhost:2002/api/delete/${name}` );
        console.log("deleted")
    };

    const updateReview= (name) =>{
        Axios.put(`http://localhost:2002/api/update`,  {
            rollno: name,
            fname: newFname, 
           
        });
        console.log("update suceesfull");

        setNewFname("")
    };
    
        return(
            <>
            <div className="App shadow-lg p-3 mb-5 bg-body rounded">
                <h1>EmployForm </h1>
                <br/>

                <label>First Name : &nbsp;</label>
                <input type="text" name="fname" onChange={(e)=>{setFname(e.target.value)}} placeholder="enter first name"/>
                <br/><br/>
                <label>Roll No. : &nbsp;</label>

                <input type="text"name="rollno" onChange={(e)=>{setRollno(e.target.value)}} placeholder="enter last name"/>
                <br/><br/>
                <button className="btn btn-primary" onClick={submitReview}> Submit </button>

                    <br/> <br/><br/><br/><br/>

                {fnameList.map((val) => {
                    return(
                        <div className="card">
                         <h5> First Name : { val.fname} | Rollno no: {val.rollno}</h5>
                         <button id="delete" onClick={() => {deleteReview(val.rollno)}} className="btn btn-primary"> Delete </button>
                         <br/>
                         <input id="Input" type="text" onChange={(e)=> {
                             setNewFname(e.target.value)
                         }} />
                         <br/>

                          <button id="delete" className="btn btn-success" onClick={()=> {updateReview(val.rollno)}} > Update Name </button>  
                         </div>
                    );
                })};
            

            </div> 
            </>
        );
    
}
export default EmployForm