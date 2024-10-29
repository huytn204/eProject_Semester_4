package com.example.demo.controller;

import com.example.demo.entity.Comment;
import com.example.demo.repose.CommentRepository;
import com.example.demo.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private CommentRepository commentRepository;

    @GetMapping("/room/{roomId}")
    public List<Comment> getCommentsByRoom(@PathVariable Long roomId) {
        return commentService.getCommentsByRoomId(roomId);
    }

    @PostMapping
    public Comment addComment(@RequestBody Comment comment) {
        return commentService.addComment(comment);
    }
    // Delete room
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteComment(@PathVariable Long id) {
        return commentRepository.findById(id).map(comment -> {
                commentRepository.delete(comment);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
