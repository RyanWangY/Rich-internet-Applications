package ric.yuan.spring0;

import java.util.List;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
@Stateless
@LocalBean
public class UserDAO {
	@PersistenceContext
    private EntityManager em;
	
	public List<User> getAllUser(){
		Query query =em.createQuery("SELECT b FROM User b");
		return query.getResultList();
	}
	
	public User getUser(int id) {
		return em.find(User.class,id);
	}
	//use to add new items
	public void save(User user) {
		em.persist(user);
	}
	//use to update item
	public void update(User user) {
		em.merge(user);
	}
	//use to delete 
	public void delete(int id) {
		em.remove(getUser(id));
	}
	
	
	public List<User> getLogin(String Account,String pssword) {
		Query query=em.createQuery("SELECT w FROM User w "+
				"WHERE w.account = ?1 and w.password = ?2");
		System.out.println(Account+"---------------"+pssword);
		query.setParameter(1, Account);
		query.setParameter(2, pssword);
		return query.getResultList();
	}
}
