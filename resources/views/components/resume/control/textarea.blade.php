@php
  $textareaClass =
      'shadow appearance-none border rounded w-full py-1 px-3 text-xs text-gray-700 leading-tight focus:outline-none forcus:shadow-outline';
@endphp
<div class="space-y-2 mb-2">
  <label for="{{ $id }}" class="block text-gray-700 text-sm font-bold">{{ $slot }}</label>
  <textarea x-model="{{ $model }}" type="text" id="{{ $id }}" class="{{ $textareaClass }}" rows="10">
  </textarea>
</div>
