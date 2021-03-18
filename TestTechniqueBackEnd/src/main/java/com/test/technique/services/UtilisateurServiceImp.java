package com.test.technique.services;

import java.io.FileInputStream;
import java.util.List;
import java.util.Optional;


//import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.technique.entities.Utilisateur;
import com.test.technique.repositories.UtilisateurRepository;


@Service
public class UtilisateurServiceImp implements UtilisateurService {
	
	
	@Autowired
	private UtilisateurRepository utilisateurRepository;
	
	
	

	public List<Utilisateur> getAllUtilisateurs() {
		return utilisateurRepository.findAll();
	}

	public Utilisateur findUtilisateurById(int id) {
		Optional<Utilisateur> UtUtilisateurOptional =utilisateurRepository.findById(id);
		if(UtUtilisateurOptional.isEmpty())
		return null;
		else
			return UtUtilisateurOptional.get();
	}


	public Utilisateur createUtilisateur(Utilisateur utilisateur) {
		utilisateur.setRole('s');
		return utilisateurRepository.save(utilisateur);
		
	}


	public Utilisateur updateUtilisateur(Utilisateur utilisateur) {
		Optional<Utilisateur> UtUtilisateurOptional =utilisateurRepository.findById(utilisateur.getId());
		if(UtUtilisateurOptional.isEmpty())
		return null;
		else
			utilisateur.setRole('u');
			return utilisateurRepository.save(utilisateur);
	}

	public void deleteUtilisateur(int id) {
		utilisateurRepository.deleteById(id);
		
	}
	
	
	
	
	public List<Utilisateur> getUtilisateurNormal()
	{
		return utilisateurRepository.getUtilisateurNormal();
	}

	@Override
	public Utilisateur findByEmailAndMotdepasse(String email, String mdp) {
		// TODO Auto-generated method stub
		return utilisateurRepository.findByEmailAndMotdepasse(email, mdp);
	}

	@Override
	public Utilisateur deleteUtilisateurLogique(Utilisateur utilisateur) {
		// TODO Auto-generated method stub
		Optional<Utilisateur> UtUtilisateurOptional =utilisateurRepository.findById(utilisateur.getId());
		if(UtUtilisateurOptional.isEmpty())
		return null;
		else
			utilisateur.setRole('d');
			return utilisateurRepository.save(utilisateur);
	}

	@Override
	public List<Utilisateur> findByEmailAndMotdepassewithJPQL(String email, String password) {
		// TODO Auto-generated method stub
		return utilisateurRepository.findByEmailAndMotdepassewithJPQL(email, password);
	}




	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	}

	
	
	
	
	
	
	
	
	
	

