<template>
<ion-page>
<ion-header>
<ion-toolbar>
<ion-buttons slot="start">
<ion-button fill="clear" @click="$router.push('/feed')">
<ion-icon slot="start" :icon="arrowBack"></ion-icon>
</ion-button>
</ion-buttons>
<ion-title size="medium" style="color:#1C6033;margin-right:100px;">Add feeding info</ion-title>
</ion-toolbar>
</ion-header>
<ion-content :fullscreen="true" >

<form @submit.prevent="submit" v-if="status==false" style="padding:40px;">
<div style="color:red;">
{{ error }}
</div>
<div>
<ion-label>Title:</ion-label>
<ion-input fill="outline" placeholder="Enter title" v-model="form.title" class="input"></ion-input>
</div>
<div>
<ion-label>Description:</ion-label>
<ion-input  fill="outline" placeholder="Enter description" v-model="form.description" class="input"></ion-input>
</div>

<div>
<ion-button color="success" expand="block" type="submit">Create account</ion-button>
</div>
</form>


<success-message :message="message" v-else>
<ion-button @click="$router.push('/feed');status=false;">OK</ion-button>
</success-message>


</ion-content>
</ion-page>
</template>

<script>
import database from '@/models/database';
import SuccessMessage from '@/shared/SuccessMessage.vue';
import {
IonAvatar,
IonButton, IonButtons,
IonContent,
IonHeader,
IonIcon,
IonInput,
IonItem, IonLabel, IonList,
IonNote,
IonPage,
IonSelect, IonSelectOption,
IonSpinner,
IonTitle,
IonToolbar,
IonTextarea
} from '@ionic/vue';
import { arrowBack } from 'ionicons/icons';
export default{
components:{
IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonAvatar, IonItem, IonLabel, IonList, IonIcon,IonNote,IonSpinner,
IonButton, IonButtons,IonInput,IonSelect, IonSelectOption,
SuccessMessage,IonTextarea
},
data(){return{
message:null,
error:null,
status:false,
is_loading:false,
form:{
title:'',
description:'',
}

}},


methods:{
async submit(){
if(this.form.title!='' && this.form.description){
this.error=null;
var form=this.form;
const data=database();
await data.from('feed').insert({title:form.title,description:form.description}).then(res=>{
if(res.status==201){
this.status=true;
this.message='User has been added.';
}else{
this.error=res.error;
}
}).catch(errors=>{console.log(errors);});

}else{
this.error='Fill in all fields.';
}
}

},

setup() {
return { arrowBack};
}


}





</script>
<style>
ion-input{
--border-radius:5px;
--padding-start:10px ;
--padding-end:10px ;
--margin-top:10px;
}

</style>