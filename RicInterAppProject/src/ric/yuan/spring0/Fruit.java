package ric.yuan.spring0;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class Fruit {
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	@Column
	private String name;
	@Column
	private String price;
	@Column
	private String unit;
	@Column
	private float inventory;
	@Column
	private String picture;
	
	 public int getId() {
	        return id;
	    }

	    public void setId(int id) {
	        this.id = id;
	    }
	    
	    public String getname() {
	        return name;
	    }

	    public void setname(String fruit_name) {
	        this.name = fruit_name;
	    }
	    public String getprice() {
	        return price;
	    }

	    public void setprice(String price) {
	        this.price = price;
	    }
	    public String getunit() {
	        return unit;
	    }

	    public void setunit(String unit) {
	        this.unit = unit;
	    }
	    public float getinventory() {
	        return inventory;
	    }

	    public void setinventory(float inventory) {
	        this.inventory = inventory;
	    }

		public String getPicture() {
			return picture;
		}

		public void setPicture(String picture) {
			this.picture = picture;
		}
	    
		
}
