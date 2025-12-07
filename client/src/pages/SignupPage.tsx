import { useState, type FormEventHandler } from "react"

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: ""
  })

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }
  return (
    <div className=" h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme="forest">
      
    </div>
  )
}

export default SignupPage