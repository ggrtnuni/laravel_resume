@php
  $count = 0;
  $value = isset($value) ? $value : '';
@endphp
<div class="mb-2">
  <label for="resume-gender" class="block text-gray-700 text-sm font-bold">{{ $slot }}</label>
  <div class="flex items-center">
    @foreach ($items as $item)
      <div class="flex items-center">
        <input x-model="{{ $model }}" id="{{ $id }}-{{ ++$count }}" type="radio"
          name="{{ $id }}" value="{{ $item['value'] }}" name="{{ $id }}"
          class="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          {{ $value === $item['value'] ? 'checked' : '' }} />
        <label for="{{ $id }}-{{ $count }}" class="mr-2 text-xs font-medium text-gray-900">
          {{ $item['name'] }}
        </label>
      </div>
    @endforeach
  </div>
</div>
