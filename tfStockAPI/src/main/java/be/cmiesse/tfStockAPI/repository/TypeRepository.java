package be.cmiesse.tfStockAPI.repository;

import be.cmiesse.tfStockAPI.entity.Type;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TypeRepository extends JpaRepository<Type,Long> {
}
