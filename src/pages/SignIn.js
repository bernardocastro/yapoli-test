import React, { useState } from 'react';
import '../styles/mobile.css';
import '../styles/global.css';
import ImageApiList from './ImageList'
import LockIcon from '@mui/icons-material/Lock';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import CREDENTIALS from '../constants/credentials'


const SignIn = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [emailError, setEmailError] = useState(false);
const [passwordError, setPasswordError] = useState(false);
const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
			
		if (email === CREDENTIALS.email && password === CREDENTIALS.password) {
			navigate('/list')
		}
		else if (email !== CREDENTIALS.email) {
			setEmailError(true)
		}
		else if (password !== CREDENTIALS.password) {
			setPasswordError(true)
		} 
	}


		return(
			<form onSubmit={handleSubmit}>
				<Box sx={{
					width: '100%',
					height: 500,
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
					alignItems: "center"}}>
						
							<Avatar style={{backgroundColor: "#7306bd"}}>
								<LockIcon fontSize="medium" />
							</Avatar>
							<h1>Sign in</h1>
							<TextField
							  error={emailError}
								required
								fullWidth
								id="email-input"
								label="Email Address"
								type="email"
								onChange={(e) => setEmail( e.target.value )} 
								size="small"
								sx={{ width: '295px' }}
							/>
							<TextField
								error={passwordError}
								required
								fullWidth
								id="password-input"
								label="Password"
								type="password"
								onChange={(e) => setPassword( e.target.value )}
								size="small"
								sx={{ width: '295px', m:3 }}
							/>
							<Button sx={{ width: '295px' }} variant="contained" type="submit">Sign in</Button>
					</Box>
				</form>
		)
	}		

export default SignIn;