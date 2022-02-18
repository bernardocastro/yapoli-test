import React, { useState, useEffect } from 'react';
import '../styles/mobile.css';
import api from '../api/api';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Box } from '@mui/material';
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

const ImageApiList = () => {
	const [imageApiList, setImageApiList] = useState([]);

	const getApiData = async() => {

		const { data } = await api.get('/prod/images')

		setImageApiList(data);	
		localStorage.setItem('imageApiList', JSON.stringify(data));
	}

	useEffect(() => {
		const localImageApiList = JSON.parse(localStorage.getItem('imageApiList'))
		
		if (localImageApiList && localImageApiList.length > 0) {
			return setImageApiList(localImageApiList);	
		}

		getApiData();
	}, []);
	
	const deleteImage = (index) => { 
		const updatedList = imageApiList.filter((image) => imageApiList.indexOf(image) != index)
		console.log(updatedList)
		setImageApiList(updatedList)
		localStorage.setItem('imageApiList', JSON.stringify(updatedList));
	}

	const retrieveImages = () => {
		getApiData();
		
	}

	return(
		<Box sx={{ display: 'flex', justifyContent:'center', flexDirection:'column', alignItems:'center' }}>
			<ImageList className="image__list" sx={{ width: 500, height: 710, display: 'flex', flexDirection:'column'}}>{imageApiList.map((image) => (
						<ImageListItem key={imageApiList.indexOf(image)} >
							<img src={image.url} />
							<ImageListItemBar title={image.nome} subtitle={image.data} />
							<Box sx={{ display: 'flex', justifyContent:'end', marginRight: 3 }}>
								<IconButton  sx={{width: 50, height: 50, color:"#B30027"}} aria-label="delete" onClick= {() => {deleteImage(imageApiList.indexOf(image))}}>
									<DeleteIcon />
								</IconButton>
							</Box>
						</ImageListItem>
					))}</ImageList>
					<Button variant="outlined" sx={{margin:2}} onClick={() => {retrieveImages()}}>Retrieve all images</Button>
		</Box>
		
	)
}

export default ImageApiList;