import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Home } from './Home'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Story } from '../components/Story'
import { uploadFile } from '../utility/uploadFile'
import { addPost, ReadPost, updatePost } from '../utility/crudUtility'
import { CategContext } from '../context/CategContext'
import { CategDropdown } from '../components/CategDropdown'
import { Alerts } from '../components/Alerts'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

export const AddEditPost = () => {
	const { categories } = useContext(CategContext)
	const { user } = useContext(UserContext)
	const [loading, setLoading] = useState(false)
	const [uploaded, setUploaded] = useState(false)
	const [photo, setPhoto] = useState(null)
	const [story, setStory] = useState(null)
	const [selCateg, setSelCateg] = useState(null)
	const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
	//az editáláshoz kell:
	const [post, setPost] = useState(null)
	const params = useParams()
	console.log(params.id, post);

	useEffect(() => {
		if (params?.id) ReadPost(params.id, setPost)
	}, [params?.id])

	useEffect(() => {
		if (post) {
			setValue("title", post.title)
			setSelCateg(post.category)
			setStory(post.story)
		}
	}, [post])
	

	if (!user) return <Home />

	const onSubmit = async (data) => {
		setLoading(true)
		if (params.id) {
			//update
			console.log(data);
			
			try {
				updatePost(params.id,{...data,category:selCateg,story})
			} 
			catch (error) {
				console.log('update:',error);
				
			}
			finally{
				setLoading(false)
			}
		}
		else {
			//insert
			let newPostData = {
				...data,
				story,
				author: user.displayName,
				userId: user.uid,
				category: selCateg,
				likes: []
			}
			console.log('postData: ', newPostData);

			try {
				const file = data?.file ? data.file[0] : null;
				const { url, id } = file ? await uploadFile(file) : {}
				delete newPostData.file
				newPostData = { ...newPostData, photo: { url, id } }
				console.log('postData', newPostData);

				addPost(newPostData)
				setUploaded(true)
				reset()
				setPhoto(null)
				setStory(null)
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}
	}

	return (
		<div className='page'>
			<form onSubmit={handleSubmit(onSubmit)}>

				<div><label >Post name:  </label>
					<input {...register('title', { required: true })} type='text' />
					<p className='text-danger'>{errors.title && 'Naming the post is required'}</p>
					<CategDropdown categories={categories} setSelCateg={setSelCateg} selCateg={selCateg} />
					<Story setStory={setStory} uploaded={uploaded} story={story} />
				</div>
				<div><label >Avatar: </label>
					<input {...register('file', {
						required:!params.id,
						validate: (value) => {
							if (!value[0]) return true
							const acceptedFormats = ['jpg', 'png']
							console.log(value[0]);
							const fileExtension = value[0].name.split('.').pop().toLowerCase()
							if (!acceptedFormats.includes(fileExtension)) return "Invalid file format"
							if (value[0].size > 1 * 1000 * 1024) return "Maximum file size 1MB!"
							return true
						}
					})} type='file'
						onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))}
					/>
					<p className='text-danger'>{errors?.file?.message}</p>
				</div>
				<input type="submit" disabled={!selCateg || !story} />
			</form>
			{loading && <p>Loading...</p>}
			{uploaded && <Alerts txt='Successfully uploaded!' />}
			<img src={post?.photo?.url ? post.photo.url : photo} />
		</div>
	)
}
