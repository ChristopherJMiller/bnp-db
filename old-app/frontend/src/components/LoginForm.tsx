import { Button, Label, TextInput } from "flowbite-react";
import { FormEvent, useContext, useMemo, useState } from "react";
import { AuthResposne, login } from "../util/auth";
import { AuthContext } from "./AuthContext";
import { HiMiniExclamationTriangle } from "react-icons/hi2";

export function LoginForm() {
  const {loading: contextLoading, updateToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = (e.target as any)[0].value;
    const password = (e.target as any)[1].value;

    const run = async () => {
      setLoading(true);
      setErrorMessage(undefined);

      try {
        const result = await login(email, password);

        if (result.status === 200) {
          const json: AuthResposne = await result.json();
          updateToken(json.accessToken);
        } else if (result.status === 401) {
          setErrorMessage("Email or Password is Incorrect");
        } else if (result.status >= 500) {
          setErrorMessage("Something went wrong on our side. Please contact the system administrator.");
        }
      } catch (e) {
        console.error(e);
      }

      setTimeout(() => setLoading(false), 500);
    };

    run();
  };

  const error = useMemo(() => 
    errorMessage && <p className="text-red-600 flex flex-row gap-1 items-center"><HiMiniExclamationTriangle /> {errorMessage}</p>
  , [errorMessage]);

  const canSubmit = !contextLoading && !loading;

  return (
    <form className="flex max-w-md flex-col gap-4 mx-auto py-12" onSubmitCapture={handleFormSubmit}>
      <h1 className="text-2xl">Login to Continue</h1>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your email" />
        </div>
        <TextInput id="email" type="email" placeholder="name@email.com" required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Your password" />
        </div>
        <TextInput id="password" type="password" required />
      </div>
      <Button type="submit" outline gradientDuoTone="purpleToPink" disabled={canSubmit}>{canSubmit ? "Loading..." : "Submit"}</Button>
      {loading ? null : error}
    </form>
  );
}