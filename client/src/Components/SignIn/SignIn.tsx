import { useLocation, useNavigate } from "react-router-dom";
import agent from "../../app/agent";
import { FieldError, FieldValues, useForm } from "react-hook-form";
import { useStoreContext, useUserContext } from "../../context/context";
import { LoginDto } from "../../models/loginDto";

export default function SignIn() {

    const { setUser } = useUserContext();
    const { setBasket } = useStoreContext();

    const navigate = useNavigate();
    const location = useLocation();

    const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: "onTouched"
    });

    async function submitForm(data: FieldValues) {
        // Map FieldValues to LoginDto
        const loginData: LoginDto = {
            username: data.username,
            password: data.password,
        };
        try {
            const userDto = await agent.Account.login(loginData);
            const { basket, ...user } = userDto;
            setBasket(basket);
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
            navigate(location.state?.from || '/catalog');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* <img
                        alt="Your Company"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    /> */}
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register("username", {
                                        required: "Please write your username"
                                    })}
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.username && (
                                    <span className="text-red-600 text-sm">
                                        {(errors.username as FieldError)?.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                {/* <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div> */}
                            </div>
                            <div className="mt-2">
                                <input
                                    {...register("password", {
                                        required: "Please write your password"
                                    })}
                                    type="password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.password && (
                                    <span className="text-red-600 text-sm">
                                        {(errors.password as FieldError)?.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                disabled={!isValid}
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {isSubmitting ? "Loading..." : "Sign In"}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Create your account now
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}

