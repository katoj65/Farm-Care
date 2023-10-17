<template>
    <ion-page>
    <ion-header>
    <ion-toolbar>
    <ion-buttons slot="primary">
    <ion-button fill="clear" @click="$router.push('/drug/create')">
    Add
    <ion-icon slot="end" :icon="create"></ion-icon>
    </ion-button>
    </ion-buttons>
    <ion-title size="medium" style="color:#1C6033;">Drugs</ion-title>
    </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
    <div v-if="is_loading==false">


<div v-if="row.length>0" style="padding:20px;">
<table>
<thead>
<tr>
<th>Name</th>
<th>Description</th>
<th>Manf-date</th>
<th>Exp-date</th>
</tr>
</thead>
<tbody>
<tr v-for="(r,key) in row" :key="key">
<td>{{ r.name }} </td>
<td>
{{ r.description }}
</td>
<td>{{ r.manufacture_date }} </td>
<td>{{ r.expiry_date }} </td>
</tr>
</tbody>
</table>



</div>
<div v-else>No drug records</div>


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
    row:[],
    is_loading:false,


    }},


    methods:{
    //
    async get(){
    this.is_loading=true;
    const data=database();
    await data
    .from('drug')
    .select().then(response=>{
    this.is_loading=false;
    if(response.status==200){
    this.row=response.data;
    console.log(response.data);
    }
    }).catch(error=>{console.log(error)});
    }
    },

    mounted(){
    this.get();
    },


    setup() {
    return { create, ellipsisHorizontal, ellipsisVertical, helpCircle, search, personCircle, star };
    }



      }





      </script>
<style scoped>
table td, table th{text-align: left;
padding:10px;
font-size: 13px;
border:solid thin silver;
}
table th{
height:30px;
}
table{
border:solid thin silver;
}
</style>