package be.cmiesse.tfStockAPI.repository;

import be.cmiesse.tfStockAPI.entity.User;
import be.cmiesse.tfStockAPI.entity.Ville;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VilleRepository extends JpaRepository<Ville, Long> {
}
