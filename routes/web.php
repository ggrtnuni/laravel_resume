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

// ---------------------------------------------------------------
// 履歴書
// ---------------------------------------------------------------

Route::get('/tool', [\App\Http\Controllers\ToolController::class, 'index'])->name('tool.index');
Route::prefix('resume')->group(function () {
    Route::prefix('home')->group(function () {
        // 履歴書バージョン別一覧
        Route::get('', [\App\Http\Controllers\Resume\ResumeController::class, 'index'])->name('resume.index');
    });
    Route::prefix('v3')->group(function () {
        // 履歴書一覧
        Route::get('/', [\App\Http\Controllers\Resume\ResumeV3Controller::class, 'index'])->name('resume.v3.index');
        // 履歴書作成
        Route::get('/create', [\App\Http\Controllers\Resume\ResumeV3Controller::class, 'create'])->name('resume.v3.create');
        // 履歴書保存
        Route::post('/', [\App\Http\Controllers\Resume\ResumeV3Controller::class, 'store'])->name('resume.v3.store');
        // 履歴書表示
        Route::get('/{resume}', [\App\Http\Controllers\Resume\ResumeV3Controller::class, 'show'])->name('resume.v3.show');
        // 履歴書編集
        Route::get('/{resume}/edit', [\App\Http\Controllers\Resume\ResumeV3Controller::class, 'edit'])->name('resume.v3.edit');
        // 履歴書更新
        Route::patch('/{resume}', [\App\Http\Controllers\Resume\ResumeV3Controller::class, 'update'])->name('resume.v3.update');
        // 履歴書削除
        Route::delete('/{resume}', [\App\Http\Controllers\Resume\ResumeV3Controller::class, 'destroy'])->name('resume.v3.destroy');
    });
});

require __DIR__ . '/auth.php';
