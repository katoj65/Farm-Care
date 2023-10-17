<template>
<ion-page>
<ion-header>
<ion-toolbar>
<ion-title style="color:#1C6033;">Farm Reports</ion-title>
</ion-toolbar>
</ion-header>
<ion-content :fullscreen="true">
<ion-header collapse="condense">
<ion-toolbar>
<ion-title size="large" style="color:#1C6033;">Farm Reports</ion-title>
</ion-toolbar>
</ion-header>




<ion-list :inset="true" v-if="reports.length>0">
  <ion-item v-for="(r,key) in reports" :key="key">
    <ion-label>
      {{ r.name }}
    </ion-label>
  </ion-item>
</ion-list>








</ion-content>
</ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList} from '@ionic/vue';
export default{
components:{
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonItem, IonLabel, IonList
},

data(){return{
reports:[
{name:'Aminal Report',icon:'',url:''},
{name:'Health Report',icon:'',url:''},
{name:'Vet Report',icon:'',url:''},
{name:'Feeding Report',icon:'',url:''},

]





}},

methods:{



}






}





</script>
