<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title style="color:#1C6033">Schedule</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Schedule</ion-title>
          </ion-toolbar>
        </ion-header>






  <ion-grid :fixed="true">
  <ion-row>
  <ion-col v-for="(m,key) in menu" :key="key" size="4">
  <div style="padding:10px;height:120px;border-radius:10px;background:#EAFAF1;">
  <div style="height:50px;">


  </div>
  <h5 style="font-size:13px;text-align:center;">{{ m.name }}</h5>

  </div>
  </ion-col>

  </ion-row>
  </ion-grid>












      </ion-content>
    </ion-page>
  </template>

  <script>
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCol, IonGrid, IonRow } from '@ionic/vue';
  export default{
  components:{
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCol, IonGrid, IonRow
  },

  data(){return{
  menu:[
  {name:'Aminals',icon:'',url:''},
  {name:'Health Reports',icon:'',url:''},
  {name:'Vet Reports',icon:'',url:''},
  {name:'Feeding',icon:'',url:''},
  {name:'Drugs',icon:'',url:''},
  {name:'Schedule',icon:'',url:''},


  ]





  }},

  methods:{



  }






  }





  </script>
