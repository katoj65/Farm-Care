<template>
  <ion-page>
  <ion-header>
  <ion-toolbar>
  <ion-buttons slot="start">
  <ion-button fill="clear" @click="$router.push('/tabs/tab1')">
  <ion-icon slot="start" :icon="arrowBack"></ion-icon>
  </ion-button>
  </ion-buttons>
  <ion-title size="medium" style="color:#1C6033;margin-right:100px;">Animal Feeding</ion-title>
  </ion-toolbar>
  </ion-header>
  <ion-content :fullscreen="true" >



some inoformation






  </ion-content>
  </ion-page>
  </template>

  <script>
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
IonToolbar
} from '@ionic/vue';
import { arrowBack } from 'ionicons/icons';
  export default{
  components:{
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonAvatar, IonItem, IonLabel, IonList, IonIcon,IonNote,IonSpinner,
  IonButton, IonButtons,IonInput,IonSelect, IonSelectOption,
  SuccessMessage
  },
  data(){return{

  is_loading:false,


  }},


  methods:{
get(){

}

  },

  setup() {
  return { arrowBack};
  }


  }





  </script>
