@extends('layouts.layout')

@section('title', 'Bem-vindo ao Gerencia!')

@section('content')
  <div class="world">
    <div class="container">

      <header>
        <div>
          <img src="{{asset('img/logos/horizontal-cores.svg')}}" alt="Gerencia!">
        </div>
        {{--
        <div>
          <p>Seu email:</p>
          <p>pedrohenriquesv@outlook.com</p>
        </div>
        <div>
          <p>Seu nome:</p>
          <p>Pedro Henrique</p>
        </div>
        --}}
      </header>

      <main>
        <h2>Olá! Digite seu melhor email:</h2>

        <input type="email" placeholder="exemplo@dominio.com.br" required>
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
<script type="module" src="{{asset('js/auth/auth.js')}}"></script>

<script>
  const img_error = "{{asset('img/icons/error.svg')}}"
  const url_has_email = "{{URL::route('login.has_email')}}"
</script>
@endpush
