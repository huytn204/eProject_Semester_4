package com.example.demo.service;
import com.example.demo.entity.Hotel;
import com.example.demo.repose.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    private final Path root = Paths.get("uploads/hotels");

    public Optional<Hotel> getHotelById(Long id) {
        return hotelRepository.findById(id);
    }

    // Xóa sản phẩm theo ID
    public void deleteHotel(Long id) throws Exception {
        if (hotelRepository.existsById(id)) {
            hotelRepository.deleteById(id);
        } else {
            throw new Exception("Hotel not found");
        }
    }

    // Cập nhật sản phẩm
    public Hotel updateHotel(Long id, String name, String address, MultipartFile file) throws Exception {
        Optional<Hotel> optionalProduct = hotelRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Hotel hotel = optionalProduct.get();
            hotel.setName(name);
            hotel.setAddress(address);

            if (file != null && !file.isEmpty()) {
                if (!Files.exists(root)) {
                    Files.createDirectories(root);
                }

                String filename = file.getOriginalFilename();
                Files.copy(file.getInputStream(), this.root.resolve(filename));

                hotel.setImageUrl(filename);
            }

            return hotelRepository.save(hotel);
        } else {
            throw new Exception("Product not found");
        }
    }

}
