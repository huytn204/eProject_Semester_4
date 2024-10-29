package com.example.demo.repose;

import com.example.demo.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface RoomRepository extends JpaRepository<Room, Long> {
    // Tìm 3 phòng đầu tiên có trạng thái là "Available"
    List<Room> findTop3ByStatus(String status);

    // Tìm tất cả các phòng có trạng thái là "Available"
    List<Room> findByStatus(String status);

    List<Room> findByHotelId(Long hotelId);

    Optional<Room> findById(Long id);

}
