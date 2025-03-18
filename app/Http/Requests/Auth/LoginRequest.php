<?php

namespace App\Http\Requests\Auth;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

/**
 * ログインリクエストをハンドリングする
 * 
 * FormRequest は Request とは異なり、フォームリクエストのバリデーションを自動的に行う。
 * rules() メソッドでバリデーションルールを定義し、authorize() メソッドで認可ロジックを実装できる。
 * 
 * validateWithBag() など特殊なバリデーションメソッドを用いないものの場合に使う？
 * validateWithBag() は１ページ内に form がたくさんある場合にエラーメッセージがどのフォームのものか確定するために使う？
 * 
 * 実装方法がコントローラに書くのとリクエストクラスに書くので二種類になってしまうため、
 * リクエストクラスを使った実装は正直微妙。使わない方がまし。
 * 
 * @author breeze
 */
class LoginRequest extends FormRequest
{
    /**
     * ユーザーがこの要求を行う権限を持っているかどうかを判断する
     * Determine if the user is authorized to make this request.
     * 
     * これが定義されている場合、FormRequest::passesAuthorization() からコールされる。
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * リクエストに適用される検証ルールを取得する
     * Get the validation rules that apply to the request.
     * 
     * これが定義されている場合、FormRequest::validationRules() からコールされる。
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ];
    }

    /**
     * リクエストの資格情報の認証を試みる
     * Attempt to authenticate the request's credentials.
     * 
     * ※ このメソッドはオーバーライドでも親クラスから呼ばれることもないこのクラス固有のもの
     * 
     * @throws \Illuminate\Validation\ValidationException
     * @see \Illuminate\Auth\SessionGuard
     */
    public function authenticate(): void
    {
        // ログイン要求がレート制限されていないことを確認
        $this->ensureIsNotRateLimited();

        // 指定された資格情報を使用してユーザーの認証を試みる
        // only() : インスタンス データから、指定されたキーと値を含むサブセットを取得
        // boolean() : データをブール値として取得
        // /home/tosy/src/laravel_resume/config/auth.php の providers で行われる認証方法が設定されている
        if (! Auth::attempt($this->only('email', 'password'), $this->boolean('remember'))) {
            // 指定されたキーのカウンターを指定された減衰時間の間 (1 ずつ) 増加
            // ※ キャッシュを使用している
            // ※ throttleKey() : リクエストのレート制限スロットルキーを取得
            RateLimiter::hit($this->throttleKey());

            // 検証エラー例外
            // 認証に失敗したときに表示される文言は These credentials do not match our records.
            // @see /home/tosy/src/laravel_resume/vendor/laravel/framework/src/Illuminate/Translation/lang/en/auth.php
            throw ValidationException::withMessages([
                'email' => trans('auth.failed'), // ←これは vendor 内で定義されている
            ]);
        }

        // 指定されたキーのヒットとロックアウト タイマーをクリア
        RateLimiter::clear($this->throttleKey());
    }

    /**
     * ログイン要求がレート制限されていないことを確認
     * Ensure the login request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * リクエストのレート制限スロットルキーを取得
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        // transliterate() : ASCII 文字だけにしている
        return Str::transliterate(Str::lower($this->string('email')) . '|' . $this->ip());
    }
}
