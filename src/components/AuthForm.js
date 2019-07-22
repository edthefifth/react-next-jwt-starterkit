import Link from 'next/link';
import react from 'react';
import SubmitLoader from '../components/SubmitLoader';
import ErrorMessages from '../components/ErrorMessages';

class AuthForm extends react.Component {


    constructor (props) {
        super(props);
    }



    render () {

        const { alias,password,errorMessages, changePassword, resetPassword, isRegister,termsOfService,privacyPolicy,whiteHatConstitution,isLoading, onChange, onSubmit } = this.props;
        const borderClass = errorMessages && errorMessages.length > 0 ? 'border border-danger p-3' : 'border p-3';
        const passwordLabel = changePassword ? "Old Password" : "Password";


        const errorRender = errorMessages.length > 0
            ? errorMessages.map((err, key) =>
                <li className="text-danger ml-3 align-middle enlarge-font" key={key}>{err}</li>
            ):false;

        const loadingText = isRegister || resetPassword? 'Submitting' : 'Authenticating';

        const isPasswordPage = resetPassword || changePassword;

        return (
        <div>
            <form onSubmit={onSubmit} className={borderClass}>

                <ErrorMessages messages={errorMessages} />

                { !isPasswordPage  &&
                <div className="form-group">
                  <label>Username</label>
                  <input className="form-control border border-dark" type='text' name='username' onChange={onChange} />
                </div>
                }

                { !resetPassword &&
                <div className='mt-3'>
                  <label>{passwordLabel}</label>
                  <input className="form-control border border-dark" type='password' name='password' onChange={onChange} />
                </div>
                }

                { isPasswordPage &&
                  <div className='mt-3'>
                      <label>New Password</label>
                      <input className="form-control border border-dark" name='newPassword' type='password' onChange={onChange} />
                  </div>
                }

                { isPasswordPage &&
                  <div className='mt-3'>
                    <label>Verify New Password</label>
                    <input className="form-control border border-dark" name='verifyPassword' type='password' onChange={onChange} />
                  </div>
                }



                { isRegister  &&
                  <div className='mt-3 form-check'>
                        <input className="form-check-input" type='checkbox' name='termsOfService' id='termsOfService' onChange={onChange} />
                        <label className="form-check-label">I acknowledge and agree to abide by the &nbsp;<Link href='/terms'><a>terms of service</a></Link></label>

                  </div>
                }


                { isRegister  &&
                  <div className='form-check'>
                        <input className="form-check-input" type='checkbox' name='privacyPolicy' id='privacyPolicy' onChange={onChange} />
                        <label className="form-check-label">I acknowledge the &nbsp;<Link href='/privacy'><a>privacy policy</a></Link></label>

                  </div>
                }


                { isRegister  &&
                  <div className='form-check'>
                      <input className="form-check-input" type='checkbox' name='whiteHatConstitution' id='whiteHatConstitution' onChange={onChange} />
                      <label className="form-check-label">I acknowledge and agree to abide by the &nbsp;<Link href='/constitution'><a>white hat constitution</a></Link></label>

                  </div>

                }


                {isLoading ? (<SubmitLoader text={loadingText}/>)
                :(
                <div className='mt-3'>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                )}


                { !isRegister && !isPasswordPage &&

                  <div className='mt-3'>
                      <Link href='/password/email'><a>Forget Password?</a></Link>
                  </div>
                }

                { !isRegister && !isPasswordPage &&

                  <div className='mt-3'>
                      <Link href='/register'><a>Not Registered?</a></Link>
                  </div>
                }


          </form>
        </div>
        );
    }
}

export default AuthForm;
