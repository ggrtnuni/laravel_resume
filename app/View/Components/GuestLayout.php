<?php

namespace App\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

/**
 * ゲストレイアウト
 * 
 * Bladeコンポーネント、Laravel によって自動的に検出される
 * Blade 内で x-guest-layout 要素として使う。
 * 
 * @author breeze
 */
class GuestLayout extends Component
{
    /**
     * Get the view / contents that represents the component.
     */
    public function render(): View
    {
        return view('layouts.guest');
    }
}
