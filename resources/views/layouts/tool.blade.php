<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>ツール</title>

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap" rel="stylesheet">

  <!-- Scripts -->
  @vite(['resources/css/app.css', 'resources/js/app.js', 'resources/css/print.css', 'resources/css/resume-v3.css'])
</head>

<body class="relative min-h-full antialiased">
  <div class="bg-white">

    <!-- Header Content -->
    <header class="no-print">
      <div class="mx-auto flex max-w-7xl items-center justify-between py-6 px-2">
        <div class="flex items-center gap-4 sm:gap-5">
          <a href="/resume/v3" class="text-lg text-gray-700 hover:text-gray-800 active:text-gray-500">ツール</a>
        </div>
      </div>
    </header>

    <!-- Page Content -->
    <main>
      {{ $slot }}
    </main>

    <!-- Footer Content -->
    <footer class="no-print"></footer>

  </div>

  <!-- Scripts -->
  {{ $script }}
</body>

</html>
