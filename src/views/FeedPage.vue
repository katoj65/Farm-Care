<template>
<ion-page>
<ion-header>
<ion-toolbar>
<ion-buttons slot="start">
<ion-button fill="clear" @click="$router.push('/tabs/tab1')">
<ion-icon slot="start" :icon="arrowBack"></ion-icon>
</ion-button>
</ion-buttons>

<ion-buttons slot="end">
<ion-button fill="clear" @click="$router.push('/feeding/create')">
Add
</ion-button>
</ion-buttons>

<ion-title size="medium" style="color:#1C6033;margin-right:100px;">Animal Feeding</ion-title>
</ion-toolbar>
</ion-header>
<ion-content :fullscreen="true">
<div v-if="is_loading==false">
<div v-if="row.length>0">
<ion-item button detail="false" class="ion-text-wrap" v-for="(r,key) in row" :key="key">
<ion-label>
<h3 style="text-transform:capitalize;font-weight:bold;">{{ r.title }} </h3>
<p>{{ r.description }} </p>
</ion-label>
</ion-item>
</div>
<div v-else style="padding:10px;">
No feeding information
</div>

</div>
<div v-else style="padding:20px;text-align:center;">
<loader-component/>
</div>
</ion-content>
</ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonAvatar, IonItem, IonLabel, IonList, IonIcon, IonNote, IonSpinner,
IonButton, IonButtons,IonInput,IonSelect, IonSelectOption } from '@ionic/vue';
import { arrowBack } from 'ionicons/icons';
import database from '@/models/database';
import SuccessMessage from '@/shared/SuccessMessage.vue';
import LoaderComponent from '@/components/LoaderComponent.vue';
export default{
components:{
IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonAvatar, IonItem, IonLabel, IonList, IonIcon,IonNote,IonSpinner,
IonButton, IonButtons,IonInput,IonSelect, IonSelectOption,
SuccessMessage,
LoaderComponent
},
data(){return{
is_loading:false,
row:[],


}},


methods:{
async get(){
this.is_loading=true;
const data=database();
await data.from('feed').select().then(response=>{
if(response.status==200){
this.is_loading=false;
this.row=response.data;
}else{
console(response.error);
}
}).catch(error=>{console.log(error)});
}

},

setup() {
return { arrowBack};
},

mounted(){
this.get();
}


}





</script>
