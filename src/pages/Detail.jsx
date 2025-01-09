import React from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import parse from 'html-react-parser'
import { useContext } from 'react';
import { MdDelete } from 'react-icons/md';
import { useState } from 'react';
import { useConfirm } from 'material-ui-confirm';
import { UserContext } from '../context/UserContext';
import { deletePost, ReadPost, toggleLikes } from '../utility/crudUtility';
import { delPhoto } from '../utility/uploadFile';
import { MdEdit } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { Alerts } from '../components/Alerts';

export const Detail = () => {
	const { user } = useContext(UserContext)
	const [post, setPost] = useState(null)
	const [txt, setTxt] = useState(null)
	const confirm = useConfirm()
	const params = useParams()
	const navigate = useNavigate()
	console.log(params.id);

	useEffect(() => {
		ReadPost(params.id, setPost)
	}, [])

	const handleDelete = async () => {
		try {
			await confirm({
				descripton: "Ez egy visszavonhatatlan művelet!",
				confirmationText: "Igen",
				cancellationText: "Mégesem",
				title: "Biztosan ki szeretnéd törölni a bejegyzést?"
			})
			deletePost(post.id)//Firestore-ból törlés
			delPhoto(post.photo.id)//Cloudinary-ból törli a fotót
			navigate('/posts')
		} catch (error) {
			console.log('mégse:', error);
		}
	}

	const handleLikes=() => {
		if (!user) setTxt("Csak bejelentkezett felhasználók likeolhatnak!")
		else toggleLikes(post.id, user.uid)
	}

	post && console.log(post);

	return (
		<div className='page'>
			{post && <>
				<img src={post.photo['url']} alt={post.title} style={{ maxWidth: "300px" }} />
				<p>{parse(post.story)}</p>
			</>}
			<button className='btn btn-secondary' onClick={() => navigate('/posts')}>Return</button>
			<div>
				<button><AiFillLike onClick={handleLikes} /></button>
				{post && <span>Likes nr.:{post?.likes.length}</span>}
			</div>
			{
				user && post && (user.uid = post.userId) &&
				<>
					<button><MdDelete onClick={handleDelete} /></button>
					<button><MdEdit /></button>
				</>
			}
			{txt && <Alerts txt={txt} err={false} />}
		</div>
	)
}