package be.cmiesse.tfStockAPI.repository;

import be.cmiesse.tfStockAPI.entity.Magasin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MagasinRepository extends JpaRepository<Magasin, Long> {
}
