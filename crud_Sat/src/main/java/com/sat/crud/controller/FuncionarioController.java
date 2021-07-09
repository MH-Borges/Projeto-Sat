package com.sat.crud.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sat.crud.model.Funcionario;
import com.sat.crud.repository.FuncionarioRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class FuncionarioController {

	@Autowired
	FuncionarioRepository funcionarioRepository;

	@GetMapping("/funcionarios")
	public ResponseEntity<List<Funcionario>> getAllFuncionarios(@RequestParam(required = false) String nome) {
		try {
			List<Funcionario> funcionarios = new ArrayList<Funcionario>();

			if (nome == null)
				funcionarioRepository.findAll().forEach(funcionarios::add);
			else
				funcionarioRepository.findByNomeContaining(nome).forEach(funcionarios::add);

			if (funcionarios.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(funcionarios, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/funcionarios/{id}")
	public ResponseEntity<Funcionario> getFuncionarioById(@PathVariable("id") long id) {
		Optional<Funcionario> funcionarioData = funcionarioRepository.findById(id);

		if (funcionarioData.isPresent()) {
			return new ResponseEntity<>(funcionarioData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/funcionarios")
	public ResponseEntity<Funcionario> createFuncionario(@RequestBody Funcionario funcionario) {
		try {
			Funcionario _funcionario = funcionarioRepository
					.save(new Funcionario(funcionario.getNome(), funcionario.getFuncao()));
			return new ResponseEntity<>(_funcionario, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/funcionarios/{id}")
	public ResponseEntity<Funcionario> updateFuncionario(@PathVariable("id") long id, @RequestBody Funcionario funcionario) {
		Optional<Funcionario> funcionarioData = funcionarioRepository.findById(id);

		if (funcionarioData.isPresent()) {
			Funcionario _funcionario = funcionarioData.get();
			_funcionario.setNome(funcionario.getNome());
			_funcionario.setFuncao(funcionario.getFuncao());
			return new ResponseEntity<>(funcionarioRepository.save(_funcionario), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/funcionarios/{id}")
	public ResponseEntity<HttpStatus> deleteFuncionario(@PathVariable("id") long id) {
		try {
			funcionarioRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/funcionarios")
	public ResponseEntity<HttpStatus> deleteAllFuncionarios() {
		try {
			funcionarioRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
}
