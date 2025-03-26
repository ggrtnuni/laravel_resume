@php
  $level = isset($level) ? $level : 'primary';
  switch ($level) {
      case 'danger':
          //
          $class =
              'text-white text-nowrap bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded text-xs  px-1 py-1 me-1 mb-1  dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800';
          break;
      case 'primary':
      default:
          $class =
              'text-white text-nowrap bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded text-xs  px-1 py-1 me-1 mb-1  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800';
          break;
  }
@endphp
<button type="button" {{ $attributes->merge(['class' => $class]) }}>
  {{ $slot }}
</button>
