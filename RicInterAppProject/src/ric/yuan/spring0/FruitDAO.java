package ric.yuan.spring0;

import java.util.List;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
/*
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;*/
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

@Stateless
@LocalBean
public class FruitDAO {

	@PersistenceContext
    private EntityManager em;
	
	public List<Fruit> getAllFruit(){
		Query query =em.createQuery("SELECT w FROM Fruit w");
		return query.getResultList();
	}
	
	public Fruit getFruit(int id) {
		return em.find(Fruit.class,id);
	}
	//use to add new items
	public void save(Fruit fruit) {
		em.persist(fruit);
	}
	//use to update item
	public void update(Fruit fruit) {
		em.merge(fruit);
	}
	//use to delete 
	public void delete(int id) {
		em.remove(getFruit(id));
	}

	public List<Fruit> getWinesByName(String name) {
		Query query=em.createQuery("SELECT w FROM Fruit AS w "+
				"WHERE w.name LIKE ?1");
query.setParameter(1, "%"+name.toUpperCase()+"%");
return query.getResultList();
	}
}
