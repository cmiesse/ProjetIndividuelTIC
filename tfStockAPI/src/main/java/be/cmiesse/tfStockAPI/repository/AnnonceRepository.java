package be.cmiesse.tfStockAPI.repository;

import be.cmiesse.tfStockAPI.entity.Annonce;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnonceRepository extends JpaRepository<Annonce, Long> {
}
