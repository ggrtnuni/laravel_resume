<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

/**
 * 認証済みセッション コントローラ
 * 
 * @author breeze
 */
class AuthenticatedSessionController extends Controller
{
    /**
     * ログインビューの表示
     * Display the login view.
     */
    public function create(): View
    {
        // dd(\App\Utils\DebugHelper::backtrace());
        return view('auth.login');
    }

    /**
     * 受信した認証リクエストを処理する
     * Handle an incoming authentication request.
     * 
     * memo:
     * route('login') を from method="POST" で呼んだ場合は、単に URI の login として解釈されている
     * $ ./vendor/bin/sail artisan route:list | grep login
     *  GET|HEAD  login ......... login › Auth\AuthenticatedSessionController@create
     *  POST      login ..................Auth\AuthenticatedSessionController@store
     * 
     * @see route() /home/tosy/src/laravel_resume/vendor/laravel/framework/src/Illuminate/Foundation/FileBasedMaintenanceMode.php
     * @see \Illuminate\Routing\UrlGenerator
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        // dd(\App\Utils\DebugHelper::backtrace());

        // FormRequest を継承した LoginRequest
        $request->authenticate();

        // 新しいセッション識別子を生成
        $request->session()->regenerate();

        // ログインに成功したらダッシュボードに飛ばす
        // intended() は認証後に元のページに戻る事に使う。引数に与えているルートはデフォルトルート。
        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * 認証されたセッションを破棄
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        // セッションから認証情報を削除
        // 現在のユーザを未認証状態にする
        // 必要に応じて、Remember Me クッキーを削除する
        Auth::guard('web')->logout();

        // セッション データをフラッシュし、ID を再生成
        $request->session()->invalidate();

        // CSRF トークン値を再生成
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
