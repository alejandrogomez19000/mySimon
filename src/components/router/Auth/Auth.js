const isAutheticated = ()=>{
	const token = localStorage.getItem('token');
	if(token){
		return true;
	}else{
		console.log('Without Authorization')
		return false
	}
}

export default isAutheticated;