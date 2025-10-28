package com.Task.asyncTask.Service;

import com.Task.asyncTask.Entity.Task;

import java.util.List;

public interface TaskService {
    Task CreateTask(Task task);
    List<Task> FindAll();
    Task findById(int id);
    Task toogleDone(int id);
    boolean delete(int id);
}
