package com.example.demo.service;

import com.example.demo.entity.Room;
import com.example.demo.repose.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    // Lấy sản phẩm theo ID
    public Optional<Room> getRoomById(Long id) {
        return roomRepository.findById(id);
    }


    // Xóa sản phẩm theo ID
    public void deleteRoom(Long id) throws Exception {
        if (roomRepository.existsById(id)) {
            roomRepository.deleteById(id);
        } else {
            throw new Exception("Product not found");
        }
    }

    public Room updateRoom(Long id, String name, Double price, String status, String introduce, String imageUrl) {
        Optional<Room> optionalRoom = roomRepository.findById(id);
        if (optionalRoom.isPresent()) {
            Room room = optionalRoom.get();
            room.setName(name);
            room.setPrice(price);
            room.setStatus(status);
            room.setIntroduce(introduce);
            if (imageUrl != null) {
                room.setImageUrl(imageUrl);
            }
            return roomRepository.save(room);
        } else {
            throw new RuntimeException("Room not found");
        }
    }

    public List<Room> getRoomsByHotelId(Long hotelId) {
        return roomRepository.findByHotelId(hotelId);
    }
}
