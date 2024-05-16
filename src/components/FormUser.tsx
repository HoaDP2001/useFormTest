import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormValues {
  name: string;
  email: string;
  age: number;
}

const FormUser: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    alert(
      `Your information includes ${data.name}, ${data.email} and ${data.age} years old have been submit successfully!`
    );
    reset();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-10">User Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          {/* Name field */}
          <div className="wrapper-field">
            <label className="text-2xl">Name:</label>
            <div className="flex flex-col gap-3">
              <input
                className="input-field"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="error-message">{errors.name.message}</span>
              )}
            </div>
          </div>

          {/* Email field */}
          <div className="wrapper-field">
            <label className="text-2xl">Email:</label>
            <div className="flex flex-col gap-3">
              <input
                className="input-field"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </div>
          </div>

          {/* Age field */}
          <div>
            <div className="wrapper-field">
              <label className="text-2xl">Age:</label>
              <div className="flex flex-col gap-3">
                <input
                  className="input-field"
                  type="number"
                  {...register("age", {
                    required: "Age is required",
                    min: {
                      value: 18,
                      message: "Age must be at least 18",
                    },
                    max: {
                      value: 65,
                      message: "Age must be less than 66",
                    },
                  })}
                />
                {errors.age && (
                  <span className="error-message">{errors.age.message}</span>
                )}
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button className="submit-button mt-5" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormUser;
