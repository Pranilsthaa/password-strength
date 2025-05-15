import { useEffect, useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import "./App.css";

function App() {
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedback, setFeedback] = useState<string[]>([]);
  const [strength, setStrength] = useState("");

  useEffect(() => {
    function checkPassStrength() {
      let strength = 0;
      const feedback = [];

      if (
        username &&
        password.trim().toLowerCase().includes(username.trim().toLowerCase())
      ) {
        feedback.push("Password should not include username. ");
        console.log(strength);
      } else {
        if (password.length >= 8) {
          strength += 1;
        } else {
          feedback.push("Password should be at least 8 characters long. ");
        }

        if (/[A-Z]/.test(password)) {
          strength += 1;
        } else {
          feedback.push("Add uppercase letters. ");
        }

        if (/[a-z]/.test(password)) {
          strength += 1;
        } else {
          feedback.push("Add lowercase letters. ");
        }

        if (/[0-9]/.test(password)) {
          strength += 1;
        } else {
          feedback.push("Add numbers. ");
        }

        if (/[^A-Za-z0-9]/.test(password)) {
          strength += 1;
        } else {
          feedback.push("Add special characters. ");
        }
      }

      let strengthText = "";
      if (strength === 0) strengthText = "Very Weak";
      else if (strength === 1) strengthText = "Weak";
      else if (strength === 2) strengthText = "Fair";
      else if (strength === 3) strengthText = "Good";
      else if (strength === 4) strengthText = "Strong";
      else strengthText = "Very Strong";
      setStrength(strengthText);
      setFeedback(feedback);
    }
    if (password.length == 0) {
      setStrength("");
      setFeedback([]);
    }
    if (password != "") {
      checkPassStrength();
    }
  }, [password, username]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setFeedback(["Passwords do not match"]);
      return;
    }
    if (feedback.length === 0) {
      setFeedback(["Form submitted successfully"]);
    } else {
      setFeedback(["Please fix the errors before submitting"]);
    }
  };

  return (
    <div className=" bg-gray-200 h-[100vh] flex items-center justify-center">
      <form className="bg-white px-10 w-[400px] min-h-[400px] py-8 rounded-lg shadow-md flex flex-col justify-center mx-auto">
        <label htmlFor="username">Username</label>
        <input
          className=" border-1 rounded-md  h-[44px] mb-2 pl-2"
          id="username"
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <div
          className={`flex flex-row items-center border-1 rounded-lg  h-[44px] mb-2 ${
            isPasswordFocused ? "outline-1" : "outine-none"
          } `}
        >
          <input
            id="password"
            className=" w-[90%] h-[50px]  pl-2 outline-none"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
          />
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? (
              <FaEye size={24} color="gray" />
            ) : (
              <FaEyeSlash size={24} color="gray" />
            )}
          </button>
        </div>
        <label htmlFor="con_password">Confirm Password</label>
        <input
          id="con_password"
          className=" border-1 rounded-lg  h-[44px] mb-2 pl-2 "
          type="password"
          placeholder="Confirm Password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        {/* Strength indicator */}
        {password && (
          <div className="">
            <p className="flex justify-end">{strength}</p>
            <div
              className={`h-3 rounded-lg  my-2 ${
                strength == "Weak"
                  ? "bg-red-700"
                  : strength == "Fair"
                  ? "bg-yellow-500"
                  : strength == "Good"
                  ? "bg-blue-400"
                  : strength == "Very Strong"
                  ? "bg-green-600"
                  : "bg-green-200"
              }`}
            ></div>
          </div>
        )}
        {/* Feedback */}
        {feedback.length > 0 && (
          <div className="mb-4 bg-orange-100 p-4 rounded-lg my-2">
            <p className="font-semibold">Suggestion:</p>
            {feedback.map((item) => (
              <li className="text-left ">{item}</li>
            ))}
          </div>
        )}
        <button
          className="cursor-pointer text-white bg-orange-500 px-6 py-2 my-2 rounded-md "
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
