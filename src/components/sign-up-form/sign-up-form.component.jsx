import './sign-up-form.styles.scss';
import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

const defaultFormFields = {
    displayName : '',
    email:'',
    password:'',
    confirmPassword:''
};

const SignUpForm = () => {
    const [formFields,setFormFields] = useState(defaultFormFields);
    const {displayName,email,password,confirmPassword} = formFields;

    const resetFormField = () => {
      setFormFields(defaultFormFields);
    };

    const onSubmitHandler = async (e) => {
     e.preventDefault();

     if(password !== confirmPassword) {
      alert('passwords do not match');
      return;
     };

     try{
      const {user} = await createAuthUserWithEmailAndPassword(email,password);
      await createUserDocumentFromAuth(user,{displayName});
      resetFormField();
     }catch(err){
        if(err.code === 'auth/email-already-in-use'){
          alert('email is already in used')
        }
    }
    };

    const onChangeHandler = (e) => {
      const {name,value} = e.target;
      setFormFields({...formFields,[name]:value})
    };

    return (
        <div className='sign-up-container'>
        <h2>Don't have an account?</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={onSubmitHandler}>
          
          <FormInput label='Display Name' type='text' name='displayName' value={displayName} onChange={onChangeHandler}/>

          <FormInput label='Email' type='email' name='email' value={email} onChange={onChangeHandler}/>

          <FormInput label='Password' type='password' name='password' value={password} onChange={onChangeHandler}/>

          <FormInput label='Confirm Password' type='password' name='confirmPassword' value={confirmPassword} onChange={onChangeHandler}/>

          <Button type="submit">Sign Up</Button>
        </form>
        </div>
    )
}
export default SignUpForm;