package com.sat.crud.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sat.crud.model.Funcionario;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {

  List<Funcionario> findByNomeContaining(String nome);
}
