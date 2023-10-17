<template>
<span>
<ion-button fill="outline" size="small" @click="flip()">
+ Advise
</ion-button>
<form @submit.prevent="submit"  v-if="show==true" style="margin:0;border:solid thin #F4F6F6;border-radius:10px;padding:10px;">
<div v-if="error!=null" style="color:red;padding:10px;">{{ error }} </div>
<ion-textarea  placeholder="Enter comment" class="input" v-model="form.comment" style="border:solid thin silver;"></ion-textarea>
<div style="padding:10px;">
<div style="margin-bottom:10px;color:green;" v-if="success!=null">{{ success }}</div>
<ion-button fill="outline" size="small" @click="submit">
Comment
</ion-button>
</div>
</form>

</span>
</template>
<script>
import { IonButton, IonTextarea} from '@ionic/vue';
import database from '@/models/database';
export default {
components:{IonButton, IonTextarea},
props:{
id:{}
},

data(){return{
success:null,
error:null,
show:false,
form:{
comment:'',
content_id:this.id,
user_id:this.$store.state.id
}
}},

methods:{
//
submit(){
this.success=null;
this.error=null;
//
if(this.form.comment!=''){
const form=this.form;
this.error=null;
const data=database();
data.from('report_comment').insert({user_id:form.user_id,content_id:form.content_id,comment:form.comment}).then(response=>{
if(response.status==201){
console.log(response)
this.success='Your comment has been saved.';
this.form={};
}else{
this.error=response.error;
}
}).catch(error=>{
console.log(error);
});

}else{
this.error='Fill in the the comment';
}
},


//
flip(){
if(this.show==true){
this.show=false;
}else{
this.show=true;
}
}
}

}




</script>