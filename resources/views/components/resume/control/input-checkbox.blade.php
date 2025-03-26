<div class="mb-2">
  <label for="{{ $id . '-label' }}" class="block text-nowrap text-gray-700 text-sm font-bold">{{ $slot }}</label>
  <div class="flex items-center">
    <input x-model="{{ $model }}" type="checkbox" name="{{ $id }}" value="{{ $value ?? '1' }}"
      id="{{ $id }}"
      class="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500" />
    <label for="{{ $id }}" class="ml-2 text-xs font-medium text-gray-900">{{ $name ?? '' }}</label>
  </div>
</div>
