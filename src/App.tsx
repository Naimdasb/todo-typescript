import React, { useState, useRef } from 'react';

type FormElement = React.FormEvent<HTMLFormElement>;

interface ITask {
  name: string,
  done: boolean
}

function App(): JSX.Element {
  
  const [newTask, setNewTask] = useState<string>('');
  const [tasks, setTasks] = useState<ITask[]>([])
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement) => {
      e.preventDefault();
      addTask(newTask);
      setNewTask('');
      taskInput.current?.focus();
  }

  const addTask = (name: string):void => {
    const newTasks = [...tasks, {name: name, done: false}];
    setTasks(newTasks);
  }

  const toggleDoneTask = (i: number):void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  }

  const removeTask = (i: number):void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i,1);
    setTasks(newTasks);
  }


  return (
    <div className='container p-2'>
      <div className="row m">
        <div className="col-md-6 offset-md-3">
            <div className="card p-2">
              <div className="car-body">
                <form onSubmit={handleSubmit}>
                  <input className='form-control' 
                          value={newTask} 
                          type="text" 
                          onChange={e => setNewTask(e.target.value)}
                          autoFocus
                          ref={taskInput}
                  />
                  <button className='btn btn-success btn-block mt-2'>
                    Save
                  </button>
                  
                </form>
              </div>
            </div>
            {
              tasks.map((t: ITask, i: number) => {
              return <div key={i} className='card card-body mt-2'>
                  <h2 style={{textDecoration: t.done ? 'line-through': ''}}>{t.name}</h2>
                  <div>
                    <button className='btn btn-secondary' onClick={() => toggleDoneTask(i)}>
                      {t.done? '✓' : '✗'}
                    </button>
                    <button className='btn btn-danger' onClick={() => removeTask(i)}>
                    🗑
                  </button>
                  </div>
              </div>
              })
            }
        </div>
      </div>
    </div>
  );
}

export default App;
