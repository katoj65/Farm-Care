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















    </ion-content>
    </ion-page>
    </template>

    <script>
    import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, } from '@ionic/vue';
    export default{
    components:{
      IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
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
