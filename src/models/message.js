export default function send_message(database,content,report_id){
database.from('users').select()
.then(response=>{
if(response.status==200){
response.data.forEach(element => {
database.from('message').insert({user_id:element.id,message:content,report_id:report_id,status:true});
});
}else{
console.log(response.error);
}
})
.catch((error) => {
console.log(error);
})
}
