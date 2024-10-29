package com.example.demo.controller;

import com.example.demo.entity.Booking;
import com.example.demo.repose.BookingRepository;
import com.example.demo.security.ResourceNotFoundException;
import com.example.demo.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/booking")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private BookingService bookingService;

    //get all room
    @GetMapping
    public List<Booking> getAllBooking() {
        return bookingRepository.findAll();
    }

    @PostMapping
    public Booking addBooking(@RequestBody Booking booking) {
        return bookingRepository.save(booking);
    }

    @GetMapping("/pending")
    public List<Booking> getPendingBooking() {
        return bookingRepository.findByStatus("Pending");
    }

    @GetMapping("/confirmed")
    public List<Booking> getConfirmedBooking() {
        return bookingRepository.findByStatus("Confirmed");
    }

    // Delete Booking
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteBooking(@PathVariable Long id) {
        return bookingRepository.findById(id).map(room -> {
            bookingRepository.delete(room);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }

    // Cập nhật trạng thái Đặt phòng
    @PutMapping("/{id}/status")
    public ResponseEntity<Booking> updateBookingStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + id));

        String newStatus = request.get("status");
        booking.setStatus(newStatus);
        Booking updatedRoom = bookingRepository.save(booking);

        return ResponseEntity.ok(updatedRoom);
    }

    @PutMapping("/cancel/{id}")
    public ResponseEntity<Booking> cancelBooking(@PathVariable Long id) {
        Booking cancelledBooking = bookingService.cancelBooking(id);
        return ResponseEntity.ok(cancelledBooking);
    }

    @GetMapping("/cancelled")
    public ResponseEntity<List<Booking>> getCancelledBookings() {
        List<Booking> cancelledBookings = bookingService.getCancelledBookings();
        return ResponseEntity.ok(cancelledBookings);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getRoomById(@PathVariable Long id) {
        Optional<Booking> product = bookingService.getBookingById(id);
        return product.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).body(null));
    }
}
