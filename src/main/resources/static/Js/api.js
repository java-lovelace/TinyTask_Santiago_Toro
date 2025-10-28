const API_URL = "http://localhost:8080/Task/Api";

export const api = {
    // Obtener todas las tareas
    async getAll() {
        const response = await fetch(`${API_URL}/All`);
        if (!response.ok) {
            throw new Error("Error to fetch the tasks");
        }
        return await response.json(); // devuelve la lista
    },

    // Crear una nueva tarea
    async create(task) {
        const response = await fetch(`${API_URL}/Create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });

        if (!response.ok) {
            throw new Error("Error al crear la tarea");
        }

        return await response.json();
    },

    // Alternar el estado "done"
    async toggleDone(id) {
        const response = await fetch(`${API_URL}/${id}/toggle`, {
            method: "PUT",
        });

        if (!response.ok) {
            throw new Error("Error to change the task status");
        }

        return await response.json();
    },
    async delete(id) {
        const response = await fetch(`${API_URL}/Delete/${id}`, {
            method: "DELETE",
        });
    }
};
