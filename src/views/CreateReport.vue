<template>
<ion-page>
<ion-header>
<ion-toolbar>
<ion-buttons slot="start">
<ion-button fill="clear" @click="$router.push('/health/report')">
<ion-icon slot="start" :icon="arrowBack"></ion-icon>
</ion-button>
</ion-buttons>
<ion-title size="medium" style="color:#1C6033;margin-right:100px;">New report</ion-title>
</ion-toolbar>
</ion-header>
<ion-content :fullscreen="true" >
<form @submit.prevent="submit" v-if="status==false" style="padding:40px;">
<div style="color:red;">
{{ error }}
</div>
<div>
<ion-label>Title:</ion-label>
<ion-input class="input" fill="outline" placeholder="Enter report title" v-model="form.title"></ion-input>
</div>

<div>
<ion-label>Report Type:</ion-label>
<ion-select aria-label="Report type" placeholder="--Select--" v-model="form.type" class="input">
<ion-select-option value="health">Aminal Health</ion-select-option>
<ion-select-option value="feeding">Feeding</ion-select-option>
<ion-select-option value="disease">Desease</ion-select-option>
</ion-select>
</div>

<div style="margin-bottom:20px;">
<ion-label>Description:</ion-label>
<ion-textarea  class="input"  placeholder="Enter report description" v-model="form.description" style="height:150px;border:solid thin silver;"></ion-textarea>
</div>

<div>
</div>

<div>
<ion-button color="success" expand="block" type="submit">Create report</ion-button>
</div>
</form>

<success-message :message="message" v-else>
<ion-button @click="$router.push('/tabs/tab3');status=false;">OK</ion-button>
</success-message>

</ion-content>
</ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonAvatar, IonItem, IonLabel, IonList, IonIcon, IonNote, IonSpinner,
IonButton, IonButtons,IonInput,IonSelect, IonSelectOption, IonTextarea } from '@ionic/vue';
import { arrowBack } from 'ionicons/icons';
import database from '@/models/database';
import send_message from '@/models/message';
import SuccessMessage from '@/shared/SuccessMessage.vue';
export default{
components:{
IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonAvatar, IonItem, IonLabel, IonList, IonIcon,IonNote,IonSpinner,
IonButton, IonButtons,IonInput,IonSelect, IonSelectOption, IonTextarea,
SuccessMessage
},
data(){return{
message:null,
error:null,
status:false,
is_loading:false,
form:{
title:'',
description:'',
type:''
}

}},


methods:{
submit(){
if(this.form.title!='' && this.form.description!='' && this.form.type){
this.error=null;
const data=database();
data.from('report').insert({title:this.form.title,
description:this.form.description,
user_role:this.$store.state.role,
tag:this.form.type,
user_id:this.$store.state.id
}).select().then(res=>{
this.status=true;
this.message='Report has been created.';
res.data.forEach(el=>{
//first get users.
//send message.
data.from('message')
.insert({user_id:100,message:this.form.description,report_id:el.id,status:true}).then(response=>{

});

//
this.$router.push('/report/details/'+el.id);
});

}).catch(errors=>{console.log(errors);});
}else{
this.error='Fill in all fields.';
}
},

},


setup() {
return { arrowBack};
}


}





</script>
