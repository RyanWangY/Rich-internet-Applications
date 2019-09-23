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

@Path("/user")
@Stateless
@LocalBean

public class UserWS {
	 @EJB
	 private UserDAO UserDAO;
	 
	 @GET
	 @Produces({MediaType.APPLICATION_JSON})
	 public Response getAll() {
		 System.out.println("get all users");
		 List<User> fruits=UserDAO.getAllUser();
		 return Response.status(200).entity(fruits).build();
	 }
	 
	 @GET
	 @Produces({MediaType.APPLICATION_JSON})
	 @Path("/{id}")
	    public Response getUserbyid(@PathParam("id") int id) {
		 User user=UserDAO.getUser(id);
		 return Response.status(200).entity(user).build();
	    }
	 
	 @POST
	 @Produces( { MediaType.APPLICATION_JSON })
	 public Response savefruit(User user) {
		 UserDAO.save(user);
		 return Response.status(201).entity(user).build(); 
	 }
	 
	 @PUT
	 @Path("/{id}")
	 @Consumes("application/json")
	 @Produces({MediaType.APPLICATION_JSON})
	 public Response updatefruit(User user) {
		 UserDAO.update(user);
		 return Response.status(200).entity(user).build(); 
	 }
	 
	 @DELETE
	 @Path("/{id}")
	 public Response deleteFruit(@PathParam("id") int id) {
		 UserDAO.delete(id);
		 return Response.status(204).build();
	 } 	
	 
	@GET
	@Path("/acout/{act}/pwd/{password}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response Loginbyaccount(@PathParam("act") String account,@PathParam("password") String pwd) {
			System.out.println("findByName: " + account +" and "+ pwd);
			List<User> user=UserDAO.getLogin(account,pwd);
			boolean xx=user.isEmpty();
			if(xx) {
				return Response.status(404).entity(user).build();
			}
			return Response.status(200).entity(user).build();
		}
}
