import styles from './Register.module.scss'
import classNames from 'classnames/bind'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import Capture from '../../Capture/Capture'
import {
   Typography,
   Button,
   FormControl,
   InputLabel,
   Input,
   InputAdornment,
   Stepper,
   Step,
   StepLabel,
   Box
} from '@mui/material'

import AccountCircle from '@mui/icons-material/AccountCircle'
import KeyIcon from '@mui/icons-material/Key'
import { AccountRegisterUrl } from '~/service/api/const/url'

const steps = ['Create username and password', 'Turn on detect face', 'Finish register form']

const cx = classNames.bind(styles)

function RegisterForm() {
   const navigate = useNavigate()
   const [activeStep, setActiveStep] = useState(0)
   const [skipped, setSkipped] = useState(new Set<number>())

   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')

   const [imgBlobs, setImgBlobs] = useState<Blob[]>([])
   const [disableFinishBtn, setDisableFinishBtn] = useState<boolean>(false)
   
   const isStepOptional = (step: number) => {
      return false
   }

   const isStepSkipped = (step: number) => {
      return skipped.has(step)
   }

   const handleFinish = async () => {
      var formdata = new FormData();
      for(let i = 0; i < imgBlobs.length; i++){
         formdata.append("faces", imgBlobs[i], `${i+1}.jfif`);
      }
      formdata.append("username", username);
      formdata.append("password", password);

      var requestOptions = {
         method: 'POST',
         body: formdata
      };
      let result = await fetch(AccountRegisterUrl, requestOptions);
      if(!result.ok){
         let res = await result.json();
         alert(res.msgs);
         if(res.stepError === "face"){
            setActiveStep(1);
         }
         else{
            setActiveStep(0);
         }
      }
      else{
         navigate('/authenticate/login');
      }
   }

   const handleNext = () => {
      if (activeStep === 0) {
         if (username === '') {
            alert('Username is empty')
            return
         }
         if (password === '') {
            alert('Password is empty')
            return
         }
         if (confirmPassword === '') {
            alert('Confirm password is empty')
            return
         }
         if (password !== confirmPassword) {
            alert('Password and confirm password is not match')
            return
         }
      }
      else if (activeStep === 2) {
         setDisableFinishBtn(true);
         handleFinish().then(() => {setDisableFinishBtn(false);});
         
         return;
      }
      let newSkipped = skipped
      if (isStepSkipped(activeStep)) {
         newSkipped = new Set(newSkipped.values())
         newSkipped.delete(activeStep)
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1)
      setSkipped(newSkipped)
   }

   const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1)
   }

   const handleSkip = () => {
      if (!isStepOptional(activeStep)) {
         // You probably want to guard against something like this,
         // it should never occur unless someone's actively trying to break something.
         throw new Error("You can't skip a step that isn't optional.")
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1)
      setSkipped((prevSkipped) => {
         const newSkipped = new Set(prevSkipped.values())
         newSkipped.add(activeStep)
         return newSkipped
      })
   }

   const handleReset = () => {
      setActiveStep(0)
   }
   const handleRegister = () => {
      navigate('/')
   }
   const handleMoveLogin = () => {
      navigate('/authenticate/login')
   }

   const handleCaptureFace = (data: Blob[]) => {
      if (data && data.length === 30) {
         setImgBlobs(data);
         handleNext();
      }
      else {
         alert('Please check your face.')
      }
   }

   return (
      <div className={cx('register-form')}>
         <h1 style={{ fontWeight: 1000, margin: "0 0 20px 0" }}>Register</h1>
         <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
               const stepProps: { completed?: boolean } = {}
               const labelProps: {
                  optional?: React.ReactNode
               } = {}
               if (isStepOptional(index)) {
                  labelProps.optional = <Typography variant='caption'>Optional</Typography>
               }
               if (isStepSkipped(index)) {
                  stepProps.completed = false
               }
               return (
                  <Step key={label} {...stepProps}>
                     <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
               )
            })}
         </Stepper>
         {activeStep === steps.length ? (
            <>
               <Typography sx={{ mt: 1, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
               
               <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  {/* <Button onClick={handleReset}>Reset</Button> */}
               </Box>
            </>
         ) : (
            <>
               <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button color='inherit' disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                     Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  {isStepOptional(activeStep) && (
                     <Button color='inherit' onClick={handleSkip} sx={{ mr: 1 }}>
                        Skip
                     </Button>
                  )}
                  <Button onClick={handleNext} disabled={activeStep == 1 || disableFinishBtn}>{activeStep === steps.length - 1 ? 'Finish' : 'Next'}</Button>
               </Box>
               {activeStep === 0 && (
                  <Box className={cx('register-box')} key='step-one' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                     <FormControl className={cx('register-box-field')} sx={{ width: '80%' }} variant='standard'>
                        <InputLabel htmlFor='input-with-icon-adornment'>Username</InputLabel>
                        <Input
                           sx={{ width: '100%' }}
                           id='input-with-icon-adornment'
                           placeholder='Type your username'
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                           startAdornment={
                              <InputAdornment position='start'>
                                 <AccountCircle />
                              </InputAdornment>
                           }
                        />
                     </FormControl>
                     <FormControl className={cx('register-box-field')} sx={{ width: '80%' }} variant='standard'>
                        <InputLabel htmlFor='input-with-icon-password'>Password</InputLabel>
                        <Input
                           sx={{ width: '100%' }}
                           id='input-with-icon-password'
                           placeholder='Type your password'
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           startAdornment={
                              <InputAdornment position='start'>
                                 <KeyIcon />
                              </InputAdornment>
                           }
                        />
                     </FormControl>

                     <FormControl className={cx('register-box-field')} sx={{ width: '80%' }} variant='standard'>
                        <InputLabel htmlFor='input-with-icon-confirm-password'>Confirm password</InputLabel>
                        <Input
                           sx={{ width: '100%' }}
                           id='input-with-icon-confirm-password'
                           placeholder='Type your confirm password'
                           value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}
                           startAdornment={
                              <InputAdornment position='start'>
                                 <KeyIcon />
                              </InputAdornment>
                           }
                        />
                     </FormControl>
                  </Box>
               )}
               {activeStep === 1 && <Capture onCaptured={handleCaptureFace} />}
            </>
         )}

         <footer className={cx('footer-signin')}>
            <p style={{ textAlign: 'center' }}>
               Have an account?{' '}
               <button onClick={handleMoveLogin} className={cx('button-signin')}>
                  Sign in
               </button>
            </p>
         </footer>
      </div>
   )
}

export default RegisterForm
