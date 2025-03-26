<div class="space-y-2 mb-2">
  <label for="{{ $id }}" class="block text-gray-700 text-sm font-bold">{{ $slot }}</label>
  <div>
    <x-resume.control.button x-on:click="window.resumeV3.addRow({{ $model }}.rows)">行追加</x-resume.control.button>
    <x-resume.control.button x-on:click="window.resumeV3.deleteAllRow({{ $model }}.rows)"
      level="danger">全削除</x-resume.control.button>
  </div>
  <template x-for="(row, index) in {{ $model }}.rows">
    <div
      :class="{
          'border': true,
          'mb-1': true,
          'bg-gray-100': true,
          'p-1': true,
          'rounded': true,
          'flex': !resumeVisibility,
          'items-left': !resumeVisibility
      }">
      <div class="flex items-center mb-1">
        <input x-model="row['resume-year']" type="text"
          class="shadow appearance-none border rounded w-20 mr-2 py-1 px-3 text-xs text-gray-700 leading-tight focus:outline-none forcus:shadow-outline"
          placeholder="年" />
        <input x-model="row['resume-month']" type="text"
          class="shadow appearance-none border rounded w-20 mr-2 py-1 px-3 text-xs text-gray-700 leading-tight focus:outline-none forcus:shadow-outline"
          placeholder="月" />
      </div>
      <div
        :class="{ 'flex': true, 'items-center': true, 'mb-1': true, 'w-full': !resumeVisibility, 'pr-2': !resumeVisibility }">
        <input x-model="row['resume-text']" type="text"
          class="shadow appearance-none border rounded w-full py-1 px-3 text-xs text-gray-700 leading-tight focus:outline-none forcus:shadow-outline"
          placeholder="内容" />
      </div>
      <div class="flex items-center">
        <x-resume.control.button
          x-on:click="window.resumeV3.swapRow({{ $model }}.rows, index, index - 1)">上へ</x-resume.control.button>
        <x-resume.control.button
          x-on:click="window.resumeV3.swapRow({{ $model }}.rows, index, index + 1)">下へ</x-resume.control.button>
        <x-resume.control.button level="danger"
          x-on:click="window.resumeV3.deleteRow({{ $model }}.rows, index)">行削除</x-resume.control.button>
        <div :class="{ 'pl-1': true, 'text-nowrap': true }">
          <input x-model="row['right']" type="checkbox" name="{{ $id }}" value="1"
            :id="'{{ $id }}-' + index" :checked="row['right']"
            class="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500" />
          <label :for="'{{ $id }}-' + index"
            class="ml-2 text-nowrap text-xs font-medium text-gray-900">右寄せ</label>
        </div>
      </div>
    </div>
  </template>
</div>
