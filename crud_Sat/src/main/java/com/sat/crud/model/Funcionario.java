package com.sat.crud.model;

import javax.persistence.*;

@Entity
@Table(name = "funcionarios")
public class Funcionario {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "nome")
	private String nome;

	@Column(name = "funcao")
	private String funcao;

	public Funcionario() {

	}

	public Funcionario(String nome, String funcao) {
		this.nome = nome;
		this.funcao = funcao;
	}

	public long getId() {
		return id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getFuncao() {
		return funcao;
	}

	public void setFuncao(String funcao) {
		this.funcao = funcao;
	}

	@Override
	public String toString() {
		return "funcionario [id=" + id + ", nome=" + nome + ", funcao=" + funcao + "]";
	}
}
