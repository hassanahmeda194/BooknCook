<?php

namespace App\Http\Controllers;

use App\Models\Chief;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login()
    {
        return inertia('Auth/Login');
    }

    public function submitLogin(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required|min:6'
        ]);

        if (!Auth::attempt($credentials)) {
            return back()->withErrors(['email' => 'Invalid credentials.']);
        }
        return redirect()->route('dashboard')->with('success', 'User login Successfully');
    }


    public function userRegister()
    {
        return inertia('Auth/UserRegister');
    }



    public function submitUserRegister(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'phone_number' => 'required',
            'avatar' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        try {
            // Avatar Upload
            $avatarPath = $request->file('avatar')->store('avatars', 'public');

            // User Create
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone_number' => $request->phone_number,
                'avatar' =>  'storage/' . $avatarPath,
            ]);

            $user->assignRole('user');
            Auth::login($user);
            return redirect()->route('dashboard')->with('success', 'Registration successful!');
        } catch (\Throwable $th) {
            return back()->withErrors(['error' => 'Something went wrong!'])->withInput();
        }
    }


    public function chiefRegister()
    {
        return inertia('Auth/ChiefRegister');
    }

    public function submitChiefRegister(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'phone_number' => 'required',
            'avatar' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'portfolio.*' => 'image|mimes:jpg,jpeg,png|max:2048',
        ]);
        DB::beginTransaction();
        try {
            $avatarPath = $request->file('avatar')->store('avatars', 'public');
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone_number' => $request->phone_number,
                'is_approved' => 1,
                'avatar' => 'storage/' . $avatarPath,
            ]);
            $user->assignRole('chief');
            $portfolioArr = [];
            if ($request->hasFile('portfolio')) {
                foreach ($request->file('portfolio') as $portfolioFile) {
                    $path = $portfolioFile->store('portfolios', 'public');
                    $portfolioArr[] = 'storage/' . $path;
                }
            }
            Chief::create([
                'user_id' => $user->id,
                'bio' => $request->bio,
                'cuisine_specialization' => json_encode($request->cuisine_specialization),
                'experience_years' => $request->experience_years,
                'hourly_rate' => $request->hourly_rate,
                'portfolio' => json_encode($portfolioArr),
            ]);
            DB::commit();
            Auth::login($user);
            return redirect()->route('dashboard')->with('success', 'Chief registered successfully!');
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', 'Something went wrong!');
        }
    }


    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login');
    }

    public function dashboard()
    {
        if (auth()->user()->hasRole('chief')) {
            return inertia('Chief/Home');
        } else {
            return inertia('User/Home');
        }
    }
}
