import { api } from "./api.js";

document.getElementById('createButton').addEventListener('click', async () => {
    const {value: formvalues} = await Swal.fire({
        title: 'Add a new course',
        html: `
            <input type="text" id="courseTitle" class="swal2-input" placeholder="Course Title">
            <textarea id="courseDescription" class="swal2-input" placeholder="Description"></textarea>
            <select name="" id="PrioritySelect">
            <option value="High">High</option>
            <option value="Mid">Mid</option>
            <option value="Low">Low</option>
            </select>
        `,
        focusConfirm: false,
        preConfirm: () => {
            const title = document.getElementById('courseTitle').value.trim();
            const description = document.getElementById('courseDescription').value.trim();
            const priority = document.getElementById('PrioritySelect').value;
            if (!title || !description || !priority) {
                Swal.showValidationMessage('all fields are required');
                return null;
            }
            return [title, description, priority];
        }

    })
    if (formvalues) {
        const [title, description, priority] = formvalues;
        const task = { title, description, priority };

        const created = await api.create(task);

        Swal.fire({
            title: 'Course created successfully',
            icon: 'success'
        });
        const tasks = await api.getAll();
        renderTask(tasks);
    }
})
async function deleteTask(id) {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    })
    if (result.isConfirmed) {
        try {
            await api.delete(id);

            Swal.fire({
                title: 'Deleted!',
                text: 'The task has been deleted.',
                icon: 'success'
            });

            const tasks = await api.getAll();
            renderTask(tasks);

        } catch (error) {
            console.error('Error deleting task:', error);
            Swal.fire({
                title: 'Error',
                text: 'There was a problem deleting the task.',
                icon: 'error'
            });
        }
    }
}
async function toggleDone(id) {
        await api.toggleDone(id);

        const tasks = await api.getAll();
        renderTask(tasks);
        Swal.fire({
            title: 'Status Updated',
            text: 'The task status has been toggled successfully!',
            icon: 'success',
            timer: 1200,
            showConfirmButton: false
        });
}

document.addEventListener('DOMContentLoaded', async ()  => {
    const taskBody = document.getElementById('taskBody');
    try{
        const tasks = await api.getAll();
        renderTask(tasks);
    }catch (e){
        console.error("Error fetching tasks: ", e);
    }
})
function renderTask(tasks){
    const taskBody = document.getElementById('taskBody');
    taskBody.innerHTML = ""
    tasks.forEach(task => {
        const row = document.createElement('tr');
        row.classList.add('border-b');
        row.innerHTML = `
            <td class="px-6 py-3">${task.id}</td>
            <td class="px-6 py-3">${task.title}</td>
            <td class="px-6 py-3">${task.description}</td>
            <td class="px-6 py-3">${task.priority}</td>
            <td class="px-6 py-3 text-center">
            <span
              class="px-3 py-1 rounded ${task.done ? 'bg-green-500' : 'bg-gray-400'} text-white">
              ${task.done ? '✓ Done' : 'Pending'}
            </span>
             </td>
             <td class="px-6 py-3 text-center">
             <button onclick="deleteTask(${task.id})" class="px-3 py-1 rounded bg-red-500 text-white">Delete</button>
             <button onclick="toggleDone(${task.id})" class="px-3 py-1 rounded bg-blue-500 text-white">Complete</button>
             </td>
        `;
        taskBody.appendChild(row);
    })
    window.deleteTask = deleteTask;
    window.toggleDone = toggleDone;
}

