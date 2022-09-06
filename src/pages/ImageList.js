import React, { useState, useEffect } from 'react';
import '../styles/mobile.css';
import api from '../api/api';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography
} from '@mui/material';

const ImageApiList = () => {
	const [imageApiList, setImageApiList] = useState([]);

	const getApiData = async () => {

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
		const updatedList = imageApiList.filter((image) => imageApiList.indexOf(image) !== index)
		console.log(updatedList)
		setImageApiList(updatedList)
		localStorage.setItem('imageApiList', JSON.stringify(updatedList));
	}

	const retrieveImages = () => {
		getApiData();

	}

	return (
		<>
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
				{
					imageApiList.map((image) => {
						return (
							<Card sx={{ width: 345, margin: 2 }}>
								<CardMedia
									sx={{ maxWidth: 345 }}
									component='img'
									height='350'
									image={image.url}
									alt={image.nome}
								>
								</CardMedia>
								<CardContent>
									<Typography gutterBottom variant="h5" component="div">
										{image.nome}
									</Typography>
								</CardContent>
								<CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
									<Button
										variant='outlined'
										color='error'
										sx={{ width: 133, height: 48 }}
										aria-label="delete"
										onClick={() => { deleteImage(imageApiList.indexOf(image)) }}>
										Delete image
									</Button>
								</CardActions>
							</Card>
						)
					})
				}
			</Box >
			<div style={{ display: 'flex', justifyContent: 'end', margin: 128 }}>
				<Button
					variant="outlined"
					sx={{ margin: 2 }}
					onClick={() => { retrieveImages() }}
				>
					Retrieve all images
				</Button>
			</div>
		</>
	)
}

export default ImageApiList;