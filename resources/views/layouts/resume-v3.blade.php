<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>{{ __('resume.title') }}</title>

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap" rel="stylesheet">

  <!-- Scripts -->
  @vite(['resources/css/app.css', 'resources/js/app.js', 'resources/css/print.css', 'resources/css/resume-v3.css'])
</head>

<body class="relative min-h-full antialiased">
  <div class="bg-white">

    <!-- Page Content -->
    <main>
      {{ $slot }}
    </main>

  </div>

  <!-- Scripts -->
  {{ $script }}
</body>

</html>
