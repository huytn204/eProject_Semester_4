package com.example.demo.repose;

import com.example.demo.entity.Booking;
import com.example.demo.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByRoom(Room room);

    //hển thị theo trạng thái
    List<Booking> findByStatus(String status);

    List<Booking> findByIsCancelled(boolean isCancelled);
}

