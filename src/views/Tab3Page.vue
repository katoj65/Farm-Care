<template>
<ion-page>
<ion-header>
<ion-toolbar>
<ion-buttons slot="primary">
<ion-button fill="clear" @click="$router.push('/user/create')">
Add
<ion-icon slot="end" :icon="create"></ion-icon>
</ion-button>
</ion-buttons>
<ion-title size="medium" style="color:#1C6033;">Users</ion-title>
</ion-toolbar>
</ion-header>
<ion-content :fullscreen="true">
<div v-if="is_loading==false">

<ion-list v-if="users.length>0">



<ion-item v-for="(u ,key) in users" :key="key" @click="$router.push('/user/profile/'+u.id)">
<ion-avatar aria-hidden="true" slot="start">
<img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
</ion-avatar>
<ion-label>

{{ u.firstname }} {{ u.lastname }}

</ion-label>
<ion-note color="medium" style="text-transform:capitalize;">{{ u.role }} </ion-note>
</ion-item>
</ion-list>
<div v-else>
No user details
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
users:[],
is_loading:false,


}},


methods:{

async get_users(){
this.is_loading=true;
const data=database();
await data
.from('users')
.select().then(response=>{
this.is_loading=false;
if(response.status==200){
this.users=response.data;
console.log(response.data);
}
}).catch(error=>{console.log(error)});
}
},

mounted(){
this.get_users();
},


setup() {
return { create, ellipsisHorizontal, ellipsisVertical, helpCircle, search, personCircle, star };
}



  }





  </script>
