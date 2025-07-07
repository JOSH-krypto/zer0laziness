document.addEventListener('DOMContentLoaded',() => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn =document.getElementById('add-task-btn');
    const taskList =document.getElementById('tasklist');
     const todosContainer =document.querySelector('.todos-cointainer');
    const progressBar=document.getElementById('progress');
    const progressNumbers=document.getElementById('numbers');

     const toggleEmptyState = () =>{
      todosContainer.style.width=taskList.
      children.length > 0 ? '100%' : '50%';
     };

   const updateProgress=(checkcompletion = true) =>{
      const  totalTasks = taskList.children.length;
      const  completedTasks= taskList.querySelectorAll('.checkbox:checked')
      .length;
      progressBar.style.width =totalTasks ? `
      ${(completedTasks / totalTasks) * 100}% `: '0%';
      progressNumbers.textContent= `${completedTasks} / ${totalTasks}`;
      if(checkcompletion && totalTasks > 0 && completedTasks === totalTasks){
         Confetti();
      }
   };
     const saveTaskToStorage = () => {
      const tasks =Array.from(taskList.querySelectorAll('li')).map(li => ({
         text: li.querySelector('span').textContent,
         completed: li.querySelector('.checkbox').checked
      }));
      localStorage.setItem('tasks',JSON.stringify(tasks));
     };
     const loadTasksFromLocalStorage = () => {
         const savedTasks= JSON.parse(localStorage.getItem('tasks')) || [];
         savedTasks.forEach(({text , completed})=> addTask(text,completed,false));
         toggleEmptyState();
         updateProgress();


     };
     const addTask=(text , completed =false, 
      checkcompletion=true
     ) => {
       //prevent the default action  from happenin
        const taskText =text || taskInput.value.trim();
          if (!taskText){//checks if taskText is empty
        return;
     }
     const li =document.createElement('li');//template integrals
     li.innerHTML =`
     <input type="checkbox" class="checkbox"
     ${completed ? 'checked' : ''}/>
     <span>${taskText}</span>
     <div class="task-btn">
          <button class="add-btn">
          <i class="fa-solid fa-pen"></i>
          </button>
          <button class="delete-btn">
          <i class="fa-solid fa-trash"></i>
          </button>
     </div>
     `;

     const checkbox =li.querySelector('.checkbox');
     
     const addBtn=li.querySelector('.add-btn');

    if (completed) {
      li.classList.add('completed');
      addBtn.disabled = true;
      addBtn.style.opacity='0.5';
      addBtn.style.pointerEvents='none';
    }

   checkbox.addEventListener('change',() =>{
      const isChecked =checkbox.checked;
      li.classList.toggle('completed',
         isChecked);
         addBtn.disabled=isChecked;
         addBtn.style.opacity=isChecked ? '0.5' :'1';
         addBtn.style.pointerEvents=
         isChecked ? 'none' : 'auto';
         updateProgress();
         saveTaskToStorage();
   });
     addBtn.addEventListener('click', () => {
        if (!checkbox.checked){
            taskInput.value = li.querySelector('span').textContent;
             li.remove();
             toggleEmptyState();
             updateProgress(false);
             saveTaskToStorage();

        }
     });

       li.querySelector('.delete-btn')
     .addEventListener('click', () =>{
        li.remove();
        toggleEmptyState();
        updateProgress();
        saveTaskToStorage();
     });

     taskList.appendChild(li);
     taskInput.value='';
     updateProgress(checkcompletion);
     saveTaskToStorage();
     };
   addTaskBtn.addEventListener('click',() => addTask
   ());//plus btn listened
   taskInput.addEventListener('keypress',(e)=> {
    if (e.key ==='Enter'){
      e.preventDefault();//listens to the enter key
        addTask();
    }
   });
   loadTasksFromLocalStorage();
});
confetti({
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
});
	






