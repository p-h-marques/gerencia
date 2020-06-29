@extends('layouts.layout')

@section('title', 'Bem-vindo ao Gerencia!')

@section('content')
  <div class="world">
    <div class="container">

      <header>
        <div>
          <img src="{{asset('img/logos/horizontal-cores.svg')}}" alt="Gerencia!">
        </div>
        <div>
          <p>Seu email:</p>
          <p>pedrohenriquesv@outlook.com</p>
        </div>
        <div>
          <p>Seu nome:</p>
          <p>Pedro Henrique</p>
        </div>
      </header>

      <main>
        <h2>Vamos escolher sua futura senha?</h2>
        <input type="text" placeholder="digite aqui sua senha, por favor!">
        <p>
          <img src="{{asset('img/icons/error.svg')}}" alt=""><span>mínimo de 8 dígitos</span>
        </p>
        <p>
          <img src="{{asset('img/icons/error.svg')}}" alt=""><span>precisa conter letras e números</span>
        </p>
      </main>

      <footer>
        <a href="#">Esqueceu sua senha?</a>
      </footer>
      <aside>
        <img src="{{asset('img/icons/confirm.svg')}}" alt="">
      </aside>
    </div>
  </div>
@endsection

@push('scripts')

@endpush
