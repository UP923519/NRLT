import React from "react";
import StartFirebase from "./firebase";
import {getDatabase, ref, set, get, update, remove, child } from "firebase/database";

export class Handle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            db: '',
            username: '',
            fullname: '',
            phonenumber: '',
            dob: ''
        }
        //this.interface = this.interface.bind(this);
    }

    componentDidMount(){
        this.setState({
            db: StartFirebase()
        });
    }

    render(){
        return(
            <div>    
                <label>Enter1</label>
                <input type='text' id='userbox' value={this.state.username}
                onChange={e =>{this.setState({username: e.target.value});}}/>
                <br/><br/>

                <button id="addBtn" onClick={this.insertData}>Add Data</button>
            </div>
        )
    }

    /*interface(element){
        const id = event.target.id;
        if (id=='addBtn'){
            this.insertData();
        }
    }*/
    
    getAllInputs(){
        return{
            username: this.state.username,
            name: this.state.fullname,
            phone: this.state.phonenumber,
            dob: this.state.dob
        }
    }

    insertData(){
        //const db = this.state.db;
        //const data = this.getAllInputs();
        const db = getDatabase();

        set(ref(db, 'JourneyX/'),
        {
            Fullname: "test32",
            //Phonenumber: data.phone,
            //dateofbirth: data.dob
        });

    }
}


