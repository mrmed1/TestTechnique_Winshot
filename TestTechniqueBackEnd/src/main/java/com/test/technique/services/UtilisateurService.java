package com.test.technique.services;

import java.io.IOException;
import java.util.List;

import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;

import com.test.technique.entities.Utilisateur;





public interface UtilisateurService {
	
	public List<Utilisateur> getAllUtilisateurs();
	public Utilisateur findUtilisateurById(int id);
	public Utilisateur createUtilisateur(Utilisateur utilisateur);
	public Utilisateur updateUtilisateur(Utilisateur utilisateur);
	public void deleteUtilisateur(int id);
	public List<Utilisateur> getUtilisateurNormal();
	public Utilisateur findByEmailAndMotdepasse(String email, String mdp);
	public Utilisateur deleteUtilisateurLogique(Utilisateur utilisateur);
	public List<Utilisateur> findByEmailAndMotdepassewithJPQL(String email,String password);

}
