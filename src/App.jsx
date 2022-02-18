import React, { useState } from 'react';
import '../src/styles/mobile.css'
import '../src/styles/global.css';
import SignIn from './pages/SignIn';
import ImageList from './pages/ImageList';
import api from  './api/api';
import {BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

 const App = () => {

		return(
			<Router>
				<main>
					<Routes>
						<Route path="/" element={<SignIn />} />
						<Route path="/list" element={<ImageList />} />
					</Routes>
				</main>
			</Router>			
		) 
	}

export default App;