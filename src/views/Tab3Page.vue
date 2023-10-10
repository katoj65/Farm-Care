<template>
  <ion-page>
  <ion-header>

  <ion-toolbar>
  <ion-title style="color:#1C6033;">Users</ion-title>
  </ion-toolbar>
  </ion-header>







  <ion-content :fullscreen="true">
  <ion-header collapse="condense">
  <ion-toolbar>
  <ion-title size="large" style="color:#1C6033;">Users</ion-title>

  </ion-toolbar>
  </ion-header>


{{ $store.state }}











  </ion-content>
  </ion-page>
  </template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, } from '@ionic/vue';
import database from '@/models/database';
export default{
components:{
IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
},
data(){return{
users:[],



}},


methods:{
async get_users(){
const data=database();
await data.auth.admin.listUsers().then(response=>{
console.log(response);
}).catch(error=>{alert('Connection Error')});


}
},

mounted(){
this.get_users();
}






  }





  </script>
