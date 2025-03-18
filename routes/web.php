<?php

use Illuminate\Support\Facades\Route;

// ---------------------------------------------------------------
// Blade + Alpine.js + Tailwindcss
// ---------------------------------------------------------------

// ログイン前のページ (breeze でログインボタンとユーザ追加ボタンが追加される）
Route::get('/', function () {
    return view('welcome');
});
Route::get('/org', function () {
    return view('welcome_org');
});

// ダッシュボード (breeze が生成)
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// ユーザ情報 (breeze が生成)
Route::middleware('auth')->group(function () {
    // ユーザ情報画面
    Route::get('/profile', [\App\Http\Controllers\ProfileController::class, 'edit'])->name('profile.edit');
    // ユーザ情報更新
    // email の変更がある場合は email_verified_at を null にする。
    // これにより、メール検証が再度必要になる。(User モデルに use Illuminate\Contracts\Auth\MustVerifyEmail; が必要)
    Route::patch('/profile', [\App\Http\Controllers\ProfileController::class, 'update'])->name('profile.update');
    // ユーザ削除
    Route::delete('/profile', [\App\Http\Controllers\ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
