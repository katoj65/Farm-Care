<template>
<ion-page>
<ion-header>
<ion-toolbar>
<ion-title style="color:#1C6033;">Farm</ion-title>
<ion-buttons slot="end">

<ion-button fill="clear" @click="$router.push('/search')">
<ion-icon slot="start" :icon="search"></ion-icon>
</ion-button>


<ion-button fill="clear" @click="$router.push('/message')">
<ion-chip style="font-size:10px;padding:4px;height:15px;width:15px;background:red;color:white;position:absolute;margin-left:-9px;margin-top:-5px;" v-if="$store.state.count_message">{{ $store.state.count_message }}</ion-chip>
<ion-icon slot="start" :icon="chatbox">
</ion-icon>
</ion-button>

<ion-button fill="clear" @click="$router.push('/settings')">
<ion-icon slot="start" :icon="ellipsisVertical"></ion-icon>
</ion-button>



</ion-buttons>
</ion-toolbar>
</ion-header>
<ion-content :fullscreen="true">
<ion-header collapse="condense">
<ion-toolbar>
<ion-title size="large" style="color:#1C6033;">Farm</ion-title>
</ion-toolbar>
</ion-header>
<div style="margin-top:20px;margin-bottom:10px;color:#1C6033;text-align:center;">
<h4 style="font-weight:bold;">Welcome to Farm Care
</h4>
<p>

</p>
</div>
<ion-grid :fixed="true">
<ion-row>
<ion-col v-for="(m,key) in menu" :key="key" size="4" @click="$router.push(m.url);">
<div style="padding:10px;height:120px;border-radius:10px;background:#EAFAF1;">
<div style="height:50px;text-align:center;">
<img :src="m.icon" style="width:50px;height:50px;"/>
</div>
<h5 style="font-size:13px;text-align:center;color:#1C6033;">{{ m.name }}</h5>

</div>
</ion-col>

</ion-row>
</ion-grid>












</ion-content>
</ion-page>
</template>

<script>
import {IonChip, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCol, IonGrid, IonRow,IonButton, IonButtons,IonIcon } from '@ionic/vue';
import { ellipsisVertical,chatbox,search } from 'ionicons/icons';
export default{
components:{
IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCol, IonGrid, IonRow,IonButton, IonButtons,IonIcon,IonChip
},

data(){return{
menu:[
{name:'Aminals',icon:'./cow.png',url:'/animal'},
{name:'Health Reports',icon:'/hreport.png',url:'/health/report'},
{name:'Vet Reports',icon:'/vet.png',url:'/animal'},
{name:'Feeding',icon:'/feed.png',url:'/feed'},
{name:'Drugs',icon:'/drug.png',url:'/drugs'},
{name:'Schedule',icon:'/sch.png',url:'/animal'},

]

}},

methods:{

},

setup(){return {
ellipsisVertical,chatbox,search
}}






}





</script>
