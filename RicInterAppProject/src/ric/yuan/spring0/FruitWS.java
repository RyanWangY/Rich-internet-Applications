package ric.yuan.spring0;
import java.util.List;
import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/fruits")
@Stateless
@LocalBean
public class FruitWS {
	 @EJB
	 private FruitDAO fruitDAO;
	 
	 @GET
	 @Produces({MediaType.APPLICATION_JSON})
	 public Response getAll() {
		 System.out.println("get all fruits");
		 List<Fruit> fruits=fruitDAO.getAllFruit();
		 return Response.status(200).entity(fruits).build();
	 }
	 
	 @GET
	 @Produces({MediaType.APPLICATION_JSON})
	 @Path("/{id}")
	    public Response getFruitbyid(@PathParam("id") int id) {
		 Fruit fruit=fruitDAO.getFruit(id);
		 return Response.status(200).entity(fruit).build();
	        //return fruitDAO.getFruit(id);
	    }
	 
	 @POST
	 @Produces( { MediaType.APPLICATION_JSON })
	 public Response savefruit(Fruit fruit) {
		 fruitDAO.save(fruit);
		 return Response.status(201).entity(fruit).build(); 
	 }
	 
	 @PUT
	 @Path("/{id}")
	 @Consumes("application/json")
	 @Produces({MediaType.APPLICATION_JSON})
	 public Response updatefruit(Fruit fruit) {
		 fruitDAO.update(fruit);
		 return Response.status(200).entity(fruit).build(); 
	 }
	 @DELETE
	 @Path("/{id}")
	 public Response deleteFruit(@PathParam("id") int id) {
		 fruitDAO.delete(id);
		 return Response.status(204).build();
	 }
	 	@GET
		@Path("/search/{query}")
		@Produces({ MediaType.APPLICATION_JSON })
		public Response findByName(@PathParam("query") String query) {
			System.out.println("findByName: " + query);
			List<Fruit> fruits=fruitDAO.getWinesByName(query);
			return Response.status(200).entity(fruits).build();
		}
}
