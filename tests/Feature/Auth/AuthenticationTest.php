<?php
// breeze

use App\Models\User;

// ログイン画面が表示できるか
test('login screen can be rendered', function () {
    $response = $this->get('/login');

    $response->assertStatus(200);
});

// ログイン画面を使ってユーザ認証ができるかどうか
test('users can authenticate using the login screen', function () {
    $user = User::factory()->create();

    $response = $this->post('/login', [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));
});

// 間違ったパスワードでユーザ認証が失敗すること
test('users can not authenticate with invalid password', function () {
    $user = User::factory()->create();

    $this->post('/login', [
        'email' => $user->email,
        'password' => 'wrong-password',
    ]);

    $this->assertGuest();
});

// ユーザがログアウトできること
test('users can logout', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post('/logout');

    $this->assertGuest();
    $response->assertRedirect('/');
});
