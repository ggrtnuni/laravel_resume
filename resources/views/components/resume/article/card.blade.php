<div class="card {{ $class }}">
  <h2>{{ $label }}</h2>
  @if (isset($preLike))
    <div x-text="{{ $model }}" :class="{ 'pre-like': true }">{{ $value }}</div>
  @else
    <div x-text="{{ $model }}">{{ $value }}</div>
  @endif
</div>
