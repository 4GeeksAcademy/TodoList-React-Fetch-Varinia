import React, {useState, useEffect} from "react";

const TodoListApi = () => {

    let [lista, setLista]= useState([])

	const crearUsuario = () => {
		const API_URL = 'https://playground.4geeks.com/todo/';
		fetch (API_URL+"users/varinia",{
            method: "POST",
            headers: {
                "Content-Type":"aplication/json"
            },
        })
		.then(response => response.json())
		.then ((data) =>console.log(data))
		.catch (error => { console.log(error)});
	}

const traerLista = () => {
	const API_URL = 'https://playground.4geeks.com/todo/';
	fetch (API_URL+"users/varinia")
	.then((response) => {
        if (response.status === 404){
            crearUsuario()
        }    
        return response.json()
    })
	.then ((data) =>setLista(data.todos || []))
	.catch (error => { console.log(error)});
}

const eliminarTarea = (id) =>{
    fetch (`https://playground.4geeks.com/todo/todos/${id}`,{
            method: "DELETE"
    })
    .then ((response)=>{
        if (response.ok){
            console.log('Tarea con id ${id} eliminada');
            traerLista();
        }else{
            console.log("No se elimino la tarea");
        }        
    })
.catch((error)=>console.log(error));
}
const eliminarLista = () => {
		const API_URL = 'https://playground.4geeks.com/todo/';
		fetch (API_URL+"users/varinia",{
            method: "DELETE",
        })
		.then(()=>{
        console.log("Eliminaste todas las tareas");
		setLista([]);
        crearUsuario();
    })
		.catch (error => { console.log(error)});
	}

useEffect(()=>{
    traerLista()
},[])


	return (
		<div className="paper bg-body text-body p-3 mb-5 rounded border-bottom">
			<h1 className="text-center">Todo List Api-Fetch</h1>
            <input type="text" placeholder="What needs to be done?"/>
            <ul className="list-unstyled text-start ">
                {lista.map((item)=>(
                <li key={item.id}>
                    {item.label} <span onClick={()=>eliminarTarea(item.id)}> χ</span>
                </li>
            ))}
            </ul>
            <div className="d-flex justify-content-between">
                <p>{lista.length} item left</p>
                <button className="btn btn-info">Eliminar todas las tareas</button>
            </div>
		</div>
	);
};
export default TodoListApi;
