<?php
// ----------------------------------------------------------------------
// このファイルは、Breeze で追加された認証関連のルートを定義します。
// ----------------------------------------------------------------------
use Illuminate\Support\Facades\Route;

// 非認証時に呼ばれるルート
Route::middleware('guest')->group(function () {
    // ユーザ登録フォーム
    Route::get('register', [\App\Http\Controllers\Auth\RegisteredUserController::class, 'create'])
        ->name('register');

    // ユーザ登録 (入力バリデーション)
    Route::post('register', [\App\Http\Controllers\Auth\RegisteredUserController::class, 'store']);

    // ログインフォーム
    Route::get('login', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'create'])
        ->name('login');

    // ログイン (入力バリデーション)
    Route::post('login', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'store']);

    // パスワードリセットリンクフォーム
    Route::get('forgot-password', [\App\Http\Controllers\Auth\PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    // パスワードリセットリンク (入力バリデーション)
    Route::post('forgot-password', [\App\Http\Controllers\Auth\PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    // パスワードリセットフォーム (メール内リンクから)
    Route::get('reset-password/{token}', [\App\Http\Controllers\Auth\NewPasswordController::class, 'create'])
        ->name('password.reset');

    // パスワードリセット (入力バリデーション)
    Route::post('reset-password', [\App\Http\Controllers\Auth\NewPasswordController::class, 'store'])
        ->name('password.store');
});

// 認証後に呼ばれるルート
Route::middleware('auth')->group(function () {
    // メール検証
    // User モデルに use Illuminate\Contracts\Auth\MustVerifyEmail; を追加している場合にのみ、
    // ログイン直後にメール検証が必要な場合にここにリダイレクトされる。
    // ログイン前の状態で http://localhost/verify-email にアクセスすると、ログイン画面にリダイレクトされる
    // ログイン後の状態で http://localhost/verify-email にアクセスすると、メール検証画面にリダイレクトされる
    // Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
    // ご登録ありがとうございます。開始する前に、先ほどお送りしたリンクをクリックして、メールアドレスを確認してください。メールが届いていない場合は、再度お送りいたします。
    // vendor/laravel/framework/src/Illuminate/Auth/Middleware/EnsureEmailIsVerified.php の handle() で処理される。
    Route::get('verify-email', \App\Http\Controllers\Auth\EmailVerificationPromptController::class)
        ->name('verification.notice');

    // ログイン時にメール検証メール内に記載されるリンクからアクセスされる
    Route::get('verify-email/{id}/{hash}', \App\Http\Controllers\Auth\VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    // プロフィール画面上のメール検証
    // User モデルに use Illuminate\Contracts\Auth\MustVerifyEmail; を追加している場合にのみ、
    // プロフィール情報パネル上に表示されるボタンから実行される。
    // また、ログイン直後にメール検証が必要な場合に表示される画面のボタンから実行される。
    Route::post('email/verification-notification', [\App\Http\Controllers\Auth\EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    // パスワード確認画面
    // ルートに「'password.confirm'」ミドルウェアを追加することで、パスワード確認画面を表示することができる。
    // This is a secure area of the application. Please confirm your password before continuing.
    // これはアプリケーションの安全な領域です。続行する前にパスワードを確認してください。
    Route::get('confirm-password', [\App\Http\Controllers\Auth\ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [\App\Http\Controllers\Auth\ConfirmablePasswordController::class, 'store']);

    // プロフィール画面上のパスワード変更
    Route::put('password', [\App\Http\Controllers\Auth\PasswordController::class, 'update'])->name('password.update');

    // ログアウト
    Route::post('logout', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
