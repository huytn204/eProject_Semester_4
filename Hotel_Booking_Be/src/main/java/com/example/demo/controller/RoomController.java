package com.example.demo.controller;

import com.example.demo.entity.Room;
import com.example.demo.repose.RoomRepository;
import com.example.demo.security.ResourceNotFoundException;
import com.example.demo.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "http://localhost:3000")
public class RoomController {
    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private RoomService roomService;

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/rooms";


    //upload file image
    @PostMapping("/upload-image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR, fileName);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());
            return ResponseEntity.ok(fileName);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed");
        }
    }

    //create new rooms
    @PostMapping
    public Room createRoom(@RequestBody Room room) {
        return roomRepository.save(room);
    }

    //get all room
    @GetMapping
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    //lấy ra room theo Id
    @GetMapping("/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable Long id) {
        Optional<Room> product = roomService.getRoomById(id);
        return product.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).body(null));
    }

    // Trả về all rooms có trạng thái "Available"
    @GetMapping("/available")
    public List<Room> getAvailableRooms() {
        return roomRepository.findByStatus("Available");
    }


    // Trả về 3 phòng có trạng thái "Available"
    @GetMapping("/available/top3")
    public List<Room> getTop3AvailableRooms() {
        return roomRepository.findTop3ByStatus("Available");
    }

    // Update room
    @PutMapping("/{id}")
    public ResponseEntity<Room> updateRoom(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("price") Double price,
            @RequestParam("status") String status,
            @RequestParam("introduce") String introduce,
            @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            String imageUrl = null;
            if (file != null && !file.isEmpty()) {
                String fileName = StringUtils.cleanPath(file.getOriginalFilename());
                Path filePath = Paths.get(UPLOAD_DIR).resolve(fileName);
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                imageUrl = fileName;
            }
            Room updatedRoom = roomService.updateRoom(id, name, price, status, introduce, imageUrl);
            return ResponseEntity.ok(updatedRoom);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Delete room
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteRoom(@PathVariable Long id) {
        return roomRepository.findById(id).map(room -> {
            roomRepository.delete(room);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }

    // Cập nhật trạng thái của phòng
    @PutMapping("/{id}/status")
    public ResponseEntity<Room> updateRoomStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + id));

        String newStatus = request.get("status");
        room.setStatus(newStatus);
        Room updatedRoom = roomRepository.save(room);

        return ResponseEntity.ok(updatedRoom);
    }

    // Get all rooms by hotel ID
    @GetMapping("/by-hotel/{hotelId}")
    public ResponseEntity<List<Room>> getRoomsByHotelId(@PathVariable Long hotelId) {
        List<Room> rooms = roomService.getRoomsByHotelId(hotelId);
        return ResponseEntity.ok(rooms);
    }
}
