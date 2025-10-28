package com.Task.asyncTask.Controller;

import com.Task.asyncTask.Entity.Task;
import com.Task.asyncTask.Service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/Task/Api")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/Create")
    public ResponseEntity<Task> CreateTask(@RequestBody Task task) {
        Task created = taskService.CreateTask(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/All")
    public ResponseEntity<List<Task>> getTasks() {
        List<Task> tasks = taskService.FindAll();
        return ResponseEntity.ok(tasks);
    }

    @PutMapping("/{id}/toggle")
    public ResponseEntity<Task> done(@PathVariable int id) {
        Task updated = taskService.toogleDone(id);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/Delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id){
        taskService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
