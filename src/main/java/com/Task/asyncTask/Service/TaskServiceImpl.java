package com.Task.asyncTask.Service;

import com.Task.asyncTask.Entity.Task;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskServiceImpl implements TaskService{
    List<Task> tasks = new ArrayList<>();
    private int nextId = 1;

    @Override
    public Task CreateTask(Task task) {
        task.setId(nextId++);
        tasks.add(task);
        return task;
    }

    @Override
    public List<Task> FindAll() {
        return tasks;
    }

    @Override
    public Task findById(int id) {
        return tasks.stream().filter(t -> t.getId() == id).findFirst().orElse(null);
    }

    @Override
    public Task toogleDone(int id) {
        for(Task t : tasks){
            if(t.getId() == id){
                t.setDone(!t.isDone());
                return t;
            }
        }
        return null;
    }

    @Override
    public boolean delete(int id) {
        for(Task t: tasks){
            if(t.getId() == id){
                tasks.remove(t);
                return true;
            }
        }
        return false;
    }
}
