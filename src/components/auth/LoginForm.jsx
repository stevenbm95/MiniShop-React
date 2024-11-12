import { useForm } from "react-hook-form";
import useStoreAuth from "../../stores/auth/StoreAuth";
import { login } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

const LoginForm = () => {
  const { setToken } = useStoreAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitLogin = async (data) => {
    try {
      const res = await login(data);
      const {
        data: { token },
      } = res;

      setToken(token);
      navigate("/");

      // setToken(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex justify-center flex-col items-center">
      <h2 className="text-3xl font-bold text-center mb-5">Login</h2>
      <div className="w-1/2">
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmitLogin)}
      >

        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            {...register("email", { required: true })}
            type="text"
            className="grow text-gray-600"
            placeholder="Email"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            {...register("password", { required: true })}
            type="password"
            className="grow text-gray-600"
            placeholder="Password"
          />
        </label>
        <Button type="submit" style={"primary"} message={"Ingresar"} />
      </form>

      </div>
    </div>
  );
};

export default LoginForm;
