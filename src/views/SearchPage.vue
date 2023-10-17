<template>
<ion-page>
<ion-header>
<ion-toolbar>
<ion-buttons slot="start">
<ion-button fill="clear" @click="$router.push('/tabs/tab1')">
<ion-icon slot="start" :icon="arrowBack"></ion-icon>
</ion-button>
</ion-buttons>
<ion-title size="medium" style="color:#1C6033;margin-right:100px;">Search</ion-title>
</ion-toolbar>
</ion-header>
<ion-content :fullscreen="true" >

<form @submit.prevent="submit" style="border-bottom:solid thin silver;">
<ion-grid>
<ion-row>
<ion-col size="9">
<ion-input placeholder="Search for animal..." v-model="form.search" class="input"></ion-input>
</ion-col>
<ion-col size="2">
<ion-button type="submit">Find</ion-button>
</ion-col>
</ion-row>
</ion-grid>
</form>

<div style="text-align:center;color:red">
{{ error }}
</div>
<div v-if="loading==false">
<div style="text-align:center;padding:10px;" v-if="is_loading==true">
{{ row.length==0?'No animal found':null }}
</div>
</div>
<div v-else style="text-align:center;">
<loader-component/>
</div>
</ion-content>
</ion-page>
</template>

<script>
import {
IonCol, IonGrid, IonRow,
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
IonToolbar
} from '@ionic/vue';
import { arrowBack } from 'ionicons/icons';
import database from '@/models/database';
import LoaderComponent from '@/components/LoaderComponent.vue';
export default{
components:{
IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonAvatar, IonItem, IonLabel, IonList, IonIcon,IonNote,IonSpinner,
IonButton, IonButtons,IonInput,IonSelect, IonSelectOption,
IonCol, IonGrid, IonRow,LoaderComponent
},
data(){return{
loading:false,
error:null,
row:[],
is_loading:false,
form:{
search:'',
}


}},


methods:{
submit(){
this.error=null;
this.is_loading=false;


if(this.form.search!=''){
this.loading=true;
const data=database();
data.from('animal').select().match({tag:this.form.search}).then(response=>{
console.log(response);
if(response.status==200){
this.loading=false;
const count=response.data.length;
if(count>0){

this.is_loading=false;
response.data.forEach(element=>{
this.row=element;
this.$router.push('/animal/profile/'+element.id);
this.form={};
});

}else if(count==0){
this.is_loading=true;
}


}else{
console.log(response.error);
}
}).catch(error=>{console.log(error)});
}else{
this.error='Fill in the search field.';
}

}


},

setup() {
return { arrowBack};
}


}





</script>
<style scoped>
ion-input{
--padding-start:10px;
--padding-end:10px;
border-radius: 0px;

}
ion-button{
--border-radius:0;
--margin:0;
margin:0;
}



</style>