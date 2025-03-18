<?php

namespace App\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

/**
 * アプリレイアウト
 * 
 * Bladeコンポーネント、Laravel によって自動的に検出される
 * Blade 内で <x-app-layout> 要素として使う。
 * 
 * @author breeze
 */
class AppLayout extends Component
{
    /**
     * Get the view / contents that represents the component.
     */
    public function render(): View
    {
        return view('layouts.app');
    }
}
