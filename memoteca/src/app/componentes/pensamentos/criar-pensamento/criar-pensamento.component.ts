import { Router, RouterModule } from '@angular/router';
import { PensamentoService } from '../pensamento/pensamento.service';
import { Pensamento } from '../pensamento/pensamento';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {


formulario! :FormGroup//operador não nulo

  constructor(
    private service:PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder
    
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group(
      {
        conteudo: ['',[Validators.compose([
          Validators.required,//requerimento obrigatório
          Validators.pattern(/(.|\s)*\S(.|\s)*/), //caracteres não permitidos
        
        ])]],

        autoria: ['',Validators.compose([
          Validators.required,
          Validators.minLength(3) //tamanho mínimo 3

        ])],
        modelo: ['modelo1']
      }
    )
  }

  criarPensamento() {
    console.log(this.formulario.get('autoria')?.errors)
    if(this.formulario.valid){

      this.service.criar(this.formulario.value).subscribe(()=>{this.router.navigate(['/listarPensamento'])
        
      })
    }

  }

  cancelarPensamento() {
    this.router.navigate(['/listarPensamento'])
  }
  habilitarBotao(): string {
    if (this.formulario.valid){
      return 'botao'
    }
    else{
      return 'botao__desabilitado'
    }
  }
}