<?php

use Illuminate\Support\Facades\Route;

// ---------------------------------------------------------------
// Blade + Alpine.js + Tailwindcss
// ---------------------------------------------------------------

// ログイン前のページ (breeze でログインボタンとユーザ追加ボタンが追加される）
Route::get('/', function () {
    return view('forbidden');
});

// SVG を削ったウェルカムページ
Route::get('/welcome', function () {
    return view('welcome');
});
// 元のウェルカムページ
Route::get('/org', function () {
    return view('welcome_org');
});

// ダッシュボード (breeze が生成)
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// ユーザ情報 (breeze が生成)
// Route::middleware('auth')->group(function () {
//     // ユーザ情報画面
//     Route::get('/profile', [\App\Http\Controllers\ProfileController::class, 'edit'])->name('profile.edit');
//     // ユーザ情報更新
//     // email の変更がある場合は email_verified_at を null にする。
//     // これにより、メール検証が再度必要になる。(User モデルに use Illuminate\Contracts\Auth\MustVerifyEmail; が必要)
//     Route::patch('/profile', [\App\Http\Controllers\ProfileController::class, 'update'])->name('profile.update');
//     // ユーザ削除
//     Route::delete('/profile', [\App\Http\Controllers\ProfileController::class, 'destroy'])->name('profile.destroy');
// });

// ---------------------------------------------------------------
// 履歴書
// ---------------------------------------------------------------

Route::get('/tool', [\App\Http\Controllers\ToolController::class, 'index'])->name('tool.index');
Route::prefix('resume')->group(function () {
    Route::prefix('v3')->group(function () {
        // 履歴書作成
        Route::get('/create', [\App\Http\Controllers\Resume\ResumeV3Controller::class, 'create'])->name('resume.v3.create');
    });
});
Route::prefix('skillsheet')->group(function () {
    // スキルシート作成
    Route::get('/create', [\App\Http\Controllers\Skillsheet\SkillsheetController::class, 'create'])->name('skillsheet.create');
});

// require __DIR__ . '/auth.php';
