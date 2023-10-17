<template>
<ion-page>
<ion-header>
<ion-toolbar>
<ion-buttons slot="primary">
<ion-button fill="clear" @click="$router.push('/animal/create')">
Add
<ion-icon slot="end" :icon="create"></ion-icon>
</ion-button>
</ion-buttons>
<ion-title size="medium" style="color:#1C6033;">Farm animals</ion-title>
</ion-toolbar>
</ion-header>
<ion-content :fullscreen="true">
<div v-if="is_loading==false">

<ion-list v-if="animal.length>0">

<ion-item v-for="(a ,key) in animal" :key="key" @click="$router.push('/animal/profile/'+a.id)">
<ion-avatar aria-hidden="true" slot="start">
<img alt="" :src="'/cow.png'" />
</ion-avatar>
<ion-label>
<h4 style="font-weight:bold;text-transform:capitalize">{{ a.name }}</h4>
<p color="small" style="text-transform:capitalize;">{{ a.breed }} breed . {{ a.color }} . {{ a.weight }}Kgs </p>
</ion-label>
</ion-item>

</ion-list>
<div v-else style="text-align:center;">
No animal details
</div>
</div>
<div v-else style="text-align:center;padding:30px;">
<ion-spinner />
</div>
</ion-content>
</ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonAvatar, IonItem, IonLabel, IonList, IonIcon, IonNote, IonSpinner,
  IonButton, IonButtons } from '@ionic/vue';
import { create, ellipsisHorizontal, ellipsisVertical, helpCircle, search, personCircle, star } from 'ionicons/icons';
import database from '@/models/database';
export default{
components:{
IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonAvatar, IonItem, IonLabel, IonList, IonIcon,IonNote,IonSpinner,
IonButton, IonButtons,
},
data(){return{
animal:[],
is_loading:false,


}},


methods:{
//
async get_animals(){
this.is_loading=true;
const data=database();
await data
.from('animal')
.select().then(response=>{
this.is_loading=false;
if(response.status==200){
this.animal=response.data;
console.log(response.data);
}
}).catch(error=>{console.log(error)});
}
},

mounted(){
this.get_animals();
},


setup() {
return { create, ellipsisHorizontal, ellipsisVertical, helpCircle, search, personCircle, star };
}



  }





  </script>
