package com.test.technique.controllers;
import java.io.IOException;

import java.util.List;


import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.test.technique.entities.Utilisateur;
import com.test.technique.repositories.UtilisateurRepository;
import com.test.technique.services.UtilisateurService;



@RestController
@RequestMapping("/Utilisateur")
public class UtilisateurController {
	
	@Autowired
	private UtilisateurRepository utilisateurRepository;
	@Autowired
	private UtilisateurService utilisateurService;

	@GetMapping
	public List<Utilisateur> getAllUtilisateurs() {
		return utilisateurService.getAllUtilisateurs();

	}
	@GetMapping(path = "normal")
	public List<Utilisateur> getUtilisateurNormal() {
		return utilisateurService.getUtilisateurNormal();

	}
	
	// solution SignIn N*1
		@GetMapping(path="SignIn/{email}/{password}")
		public ResponseEntity<Utilisateur> singIn(@PathVariable String email, @PathVariable String password ){
			List<Utilisateur> users= utilisateurService.findByEmailAndMotdepassewithJPQL(email, password);
			int j=0;
			if(!users.isEmpty()) {
			for(int i=0;i<=users.size();i++) {

				 if ((users.get(i).getEmail().equals(email))&&( users.get(i).getMotdepasse().equals(password)) ) {
					 return new ResponseEntity<Utilisateur>(users.get(i),HttpStatus.OK);
				}else {
					j++;
					if(j==users.size())
						return new ResponseEntity<Utilisateur>(HttpStatus.NO_CONTENT);
					}
				}
			}
			return new ResponseEntity<Utilisateur>(HttpStatus.NO_CONTENT);
				
		}
	
	
	@GetMapping(path = "/{email}/{pwd}")
	public Utilisateur FindByEmailPassword(@PathVariable String email, @PathVariable String pwd) {
		Utilisateur utilisateur = utilisateurService.findByEmailAndMotdepasse(email,pwd);
		if (utilisateur != null)
			return utilisateur;
		return null;

	}

	@GetMapping(path = "/{id}")
	public ResponseEntity<Utilisateur> findUtilisateurById(@PathVariable int id) {

		Utilisateur utilisateur = utilisateurService.findUtilisateurById(id);
		if (utilisateur == null)
			return new ResponseEntity<Utilisateur>(HttpStatus.NOT_FOUND);
		else
			return new ResponseEntity<Utilisateur>(utilisateur, HttpStatus.OK);

	}

	@PostMapping
	public ResponseEntity<Utilisateur> createUtilisateur(@RequestBody Utilisateur utilisateur) {
		
		Utilisateur ut=utilisateurService.findUtilisateurById(utilisateur.getId());
		if(ut==null)
		{
			 utilisateurService.createUtilisateur(utilisateur);
			return new ResponseEntity<Utilisateur>(utilisateur,HttpStatus.CREATED);
		}
		
		else 
			return new ResponseEntity<Utilisateur>(HttpStatus.BAD_REQUEST); 
		
	}

	@PutMapping
	public  Utilisateur updateUtilisateur (@RequestBody Utilisateur utilisateur) {
		return   utilisateurService.updateUtilisateur(utilisateur);

	}

	@DeleteMapping(path = "/{id}")
	public void deleteUtilisateur(@PathVariable int id) {
		utilisateurService.deleteUtilisateur(id);

	}
	
	
	@PutMapping(path = "/delete")
	public Utilisateur deleteUtilisateurLogique(@RequestBody Utilisateur utilisateur) {
		return   utilisateurService.deleteUtilisateurLogique(utilisateur);

	}
	
	
	

	
	@PostMapping(path = "add")
	public void AddFileExcel(@RequestParam("file") MultipartFile files) throws IOException {

            
                 XSSFWorkbook workbook=new XSSFWorkbook(files.getInputStream());
                 XSSFSheet sheet = workbook.getSheetAt(0);

                 
                 
                 int rows=sheet.getLastRowNum();
           
                 for(int r=1;r<=rows;r++) {
                     Utilisateur u = new Utilisateur();
                     XSSFRow row=sheet.getRow(r);
                     
                        
                         XSSFCell nom =row.getCell(0);
                         u.setNom(nom.getStringCellValue());
                         XSSFCell prenom =row.getCell(1);
                         u.setPrenom(prenom.getStringCellValue());
                         XSSFCell email =row.getCell(2);
                         u.setEmail(email.getStringCellValue());
                         XSSFCell motdepasse =row.getCell(3);
                         u.setMotdepasse(motdepasse.getStringCellValue());
                         u.setRole('u');
                   
                    
                         utilisateurRepository.save(u);
       
                 }
                 

 

        
        
    }
	
	
	
	
	
	
	
	

}
