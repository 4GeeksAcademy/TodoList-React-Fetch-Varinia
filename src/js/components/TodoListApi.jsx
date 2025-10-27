import React, {useState, useEffect} from "react";

const TodoListApi = () => {

    let [lista, setLista]= useState([])

	const crearUsuario = () => {
		const API_URL = 'https://playground.4geeks.com/todo/';
		fetch (API_URL+"users/varinia",{
            method: "POST",
            headers: {
                "Content-Type":"aplication"/json
            },
        })
		.then(response => response.json())
		.then ((data) =>console.log(data))
		.catch (error => { console.log(error)});
	}

const traerTareas = () => {
	const API_URL = 'https://playground.4geeks.com/todo/';
	fetch (API_URL+"users/varinia")
	.then((response) => {
        if (response.status === 404){
            crearUsuario()
        }    
        return response.json()
    })
	.then ((data) =>setLista(data.todos))
	.catch (error => { console.log(error)});
}

useEffect(()=>{
    traerTareas()
},[])


	return (
		<div className="paper bg-body text-body">
			<h1>Todo List Api-Fetch</h1>
            <input type="text" placeholder="What needs to be done?"/>
            <ul className="list-unstyled text-start ">
                {lista.map((item)=>(
                <li key={item.id}>
                    {item.label} <span onClick={()=>eliminarTarea(index)}> χ</span>
                </li>
            ))}
            </ul>
            <p>{lista.length} item left</p>  
		</div>
	);
};
export default TodoListApi;
