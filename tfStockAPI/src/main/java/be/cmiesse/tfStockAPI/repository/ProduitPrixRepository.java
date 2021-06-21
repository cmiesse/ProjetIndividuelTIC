package be.cmiesse.tfStockAPI.repository;

import be.cmiesse.tfStockAPI.entity.ProduitPrix;
import be.cmiesse.tfStockAPI.entity.ProduitPrixKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProduitPrixRepository extends JpaRepository<ProduitPrix, ProduitPrixKey> {
}
