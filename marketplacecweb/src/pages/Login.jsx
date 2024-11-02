import logo from '../imgs/logo.png';

function Login() {
    return(
            <>
            <div class="flex justify-center items-center h-screen bg-gray"> {/*container*/}
                <div class="w-1/3 h-5/6 p-5 bg-light-purple flex flex-col items-center text-white rounded-3xl"> {/*login-box*/}
                    <img src={logo} alt="logo" className="w-32 h-32 rounded-full"/>
                    <h2 class="mb-5 p-3">SignIn</h2>  
                    <form class="login-form w-full">
                        <label class="text-lg mb-1" for="username">Username:</label>
                        <input type="email" class="w-full p-2 mb-2 rounded-md border-none bg-[#D7CDE2]" id="username" name="username" />
                        
                        <label class="text-lg mb-1" for="password">Password:</label>
                        <input type="password" class="w-full p-2 mb-2 rounded-md border-none bg-[#D7CDE2]" id="password" name="password" />

                        <a href="#" class="self-end text-xs text-[#D7CDE2] mb-5">Forgot Password?</a>

                        <button class="w-full p-2 rounded-full bg-purple text-white font-bold cursor-pointer">Login</button>
                    </form>
                </div>
                
                <div class="w-1/3 h-4/6 p-4 flex flex-col items-center justify-center bg-very-light-purple border-2 border-purple rounded-r-3xl border-l-0"> {/*register-box*/}
                    <h2 class="mb-5 text-xl">SignUp</h2> 
                    <form class="signup-form w-full">
                        <label for="signup-username" class="text-lg mb-1 text-[#523254]">Username:</label>
                        <input type="text" id="signup-username" name="signup-username" class="w-full p-2 mb-2 rounded-md border-none bg-[#D7CDE2]" />

                        <label for="email" class="text-lg mb-1 text-[#523254]">Email:</label>
                        <input type="email" id="email" name="email" class="w-full p-2 mb-2 rounded-md border-none bg-[#D7CDE2]" />

                        <label for="confirm-password" class="text-lg mb-1 text-[#523254]">Password:</label>
                        <input type="password" id="signup-password" name="signup-password" class="w-full p-2 mb-2 rounded-md border-none bg-[#D7CDE2]" />

                        <label for="confirm-password" class="text-lg mb-1 text-[#523254]">Confirm Password:</label>
                        <input type="password" id="confirm-password" name="confirm-password" class="w-full p-2 mb-2 rounded-md border-none bg-[#D7CDE2]" />                        
                        
                        <button type="submit" class="w-full p-2 rounded-full bg-purple text-white font-bold cursor-pointer">Create Account</button>
                    </form>
                </div>
            </div>
            </>
    )
}

export default Login