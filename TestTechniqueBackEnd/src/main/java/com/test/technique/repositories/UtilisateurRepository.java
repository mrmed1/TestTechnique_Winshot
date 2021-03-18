package com.test.technique.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.test.technique.entities.Utilisateur;

@Repository
public interface UtilisateurRepository  extends JpaRepository<Utilisateur,Integer>{
	
	@Query("SELECT u FROM Utilisateur u WHERE u.email = ?1 AND u.motdepasse = ?2")
	public List<Utilisateur> findByEmailAndMotdepassewithJPQL(String email,String password);
	
	public Utilisateur findByEmailAndMotdepasse(String email, String mdp);

	@Query("select u from Utilisateur u where u.role='u' ")
	public List<Utilisateur> getUtilisateurNormal();
	

}
