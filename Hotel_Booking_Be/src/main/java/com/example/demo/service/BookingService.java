package com.example.demo.service;

import com.example.demo.entity.Booking;
import com.example.demo.repose.BookingRepository;
import com.example.demo.security.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;


    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }


    public Booking cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        // Cập nhật trạng thái
        booking.setStatus("Canceled");
        return bookingRepository.save(booking);
    }

    public List<Booking> getCancelledBookings() {
        return bookingRepository.findByStatus("Canceled");
    }


}
