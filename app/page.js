'use client'
import { useState } from 'react'
import './page.css'
class Todo {
    constructor(formTitle, formDescription) {
        this.title = formTitle;
        this.description = formDescription;
    }
}
export default function Home() {
    const [todoArray, setTodoArray] = useState([]);
    const [targetTodoIndex,setTargetTodoIndex] = useState();
    const [formState, setFormState] = useState('');
    const [formTitle, setFormTitle] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const [completedArray, setCompletedArray] = useState([]);
    const [completedToggleText, setCompletedToggleText] = useState('Hide Completed');

    const formReset = ()=>{
        setFormTitle('');
        setFormDescription('');
        setFormState('');
    }
    const handleTodo = ()=>{
        return new Todo(formTitle, formDescription);
    }
  
    const handleAction = (value, index) => {
        let targetTodo = todoArray?.slice(index, index + 1)[0];
        let updatedTodoArray = todoArray?.filter((_, i) => i !== index);
        if (value === 'new'){
            setFormState('new')
            setFormTitle('');
            setFormDescription('');
        }
        if (value === 'complete') {
            setCompletedArray(current => [...current,targetTodo]);
            setTodoArray(updatedTodoArray)
        }
        if (value === 'delete'){
            setTodoArray(updatedTodoArray)
        }
        if (value === 'edit'){
            setFormState('edit');
            setTargetTodoIndex(index);
            setFormTitle(targetTodo.title);
            setFormDescription(targetTodo.description)
        }
        if (value === 'add' && formState === 'new' && formTitle!=='' ){
            setTodoArray(current => [...current, (handleTodo())]);
            formReset()
        }
        if (value === 'done' && formTitle!==''){
            let updatedTodoArray = [...todoArray][targetTodoIndex] = handleTodo();
            setTodoArray(updatedTodoArray);
            formReset()
        }
        if (value === 'cancel'){
            formReset()
        }
        if (value === 'clear'){
            setCompletedArray([])
        }
        if (value === 'toggleCompleted' && completedToggleText =='Hide Completed') {
            setCompletedToggleText('Show Completed')
        }
        if (value === 'toggleCompleted' && completedToggleText =='Show Completed') {
            setCompletedToggleText('Hide Completed')
        }
    }


    const handleInputChange = e => {
        if (e.target.id === 'title') {
            setFormTitle(e.target.value);
        }
        if (e.target.id === 'desc') {
            setFormDescription(e.target.value);
        }
    };

    const handlekeyPress = e => {
        if (formState=='new' && e.key === 'Enter' && e.target.value != '') {
            handleAction('add')
        }
        if (formState=='edit' && e.key === 'Enter' && e.target.value != '') {
            handleAction('done')
        }
    };

    return (
        <div className="container">
            <h2 className='header padd-1 br-8'>Todo List</h2>
            <div className="body">
                <div className="side padd-1 br-8">
                    <button onClick={() => handleAction('new')} className='btn btn-light'>New Todo</button>
                    {completedArray?.length > 0 &&
                        <button onClick={() => handleAction('toggleCompleted')} className='btn btn-light'>{completedToggleText}</button>
                    }
                </div>
                {(formState === 'new' || formState === 'edit') &&
                    <div className="main padd-1 br-8">
                        <form className="input card br-8">
                            <input className='custom-input br-8' placeholder='add title' id='title' value={formTitle} onKeyDown={handlekeyPress} onChange={handleInputChange} type="text" />
                            <input className='custom-input br-8' placeholder='add description' id='desc' onKeyDown={handlekeyPress} value={formDescription} onChange={handleInputChange} type="text" />
                        </form>
                        <div className="btn-holder">
                        {formState === 'new' &&
                            <button onClick={()=>{ handleAction('add')}} className='btn btn-green'>Add</button>
                        }
                        {formState === 'edit' &&
                            <button onClick={()=>{ handleAction('done')}} className='btn btn-green'>Done</button>
                        }
                            <button onClick={()=>{ handleAction('cancel')}} className='btn btn-danger'>Cancel</button>
                        </div>                       
                    </div>
                }
                {todoArray?.length > 0  &&
                    <div className="left main content padd-1 br-8">
                        <h3 className='sub-header'>Todos</h3>
                        {todoArray.map((todo, i) => (
                            <div className="card br-8" key={i} >
                                <div className='card-title br-8' >
                                    <div className="btn-holder mweb">
                                        <button className='btn btn-green br-1rm' onClick={() => { handleAction('complete', i) }} >Complete</button>
                                        <button className='btn btn-warning br-1rm' onClick={() => { handleAction('edit', i) }} >Edit</button>
                                        <button className='btn btn-danger br-1rm' onClick={() => { handleAction('delete', i) }} >Delete</button>
                                    </div>
                                    {todo?.title}
                                </div>
                                <div className='card-desc br-8' >
                                    {todo?.description}
                                </div>
                            </div>
                        ))}
                    </div>
                }
                {completedArray?.length > 0 && completedToggleText =='Hide Completed' &&
                    <div className="right main content padd-1 br-8">
                        <div className='sub-header'>
                            <h3>Completed</h3>
                            <button className='btn btn-danger' onClick={() => { handleAction('clear')}}>Clear All</button>
                        </div>

                        {completedArray.map((todo, i) => (
                            <div className="card br-8" key={i} >
                                <div className='card-title br-8' >
                                    {todo?.title}
                                </div>
                                <div className='card-desc br-8' >
                                    {todo?.description}
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    );
}
