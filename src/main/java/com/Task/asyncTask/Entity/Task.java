package com.Task.asyncTask.Entity;

import com.Task.asyncTask.Enum.Priority;
import lombok.Data;

import java.awt.*;

@Data
public class Task {
    private int id;
    private String title;
    private String description;
    private Priority priority;
    private boolean done;
}
