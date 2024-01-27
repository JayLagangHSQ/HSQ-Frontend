

const uploadUpdate = async(department, title, userId,setUpdatePosted,articleId) => {
    setUpdatePosted(true)
    let message = `Hi! I uploaded a new article titled "${title}". Please 
                click the link below to see the full details about this article:
                https://portal.hollywoodsq.com/article/${articleId}`
    let postTitle = 'New Article Posted'
    const formData = new FormData();
    formData.append('department', department);
    formData.append('title', postTitle);
    formData.append('message', message);
    formData.append('author', userId);

    await fetch(`${import.meta.env.VITE_APP_API_URL}/api/newsAndUpdates/upload`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: formData,
    }).then((data) => {
        if (data.status === 201) {

            setUpdatePosted(false)

        } else {

            setUpdatePosted(false)
        }
    });
}

export default uploadUpdate;