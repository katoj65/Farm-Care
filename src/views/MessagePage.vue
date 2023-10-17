<template>
<ion-page>
<ion-header>
<ion-toolbar>
<ion-buttons slot="start">
<ion-button fill="clear" @click="$router.push('/tabs/tab1')">
<ion-icon slot="start" :icon="arrowBack"></ion-icon>
</ion-button>
</ion-buttons>
<ion-title size="medium" style="color:#1C6033;margin-right:100px;">
Message
</ion-title>
</ion-toolbar>
</ion-header>
<ion-content :fullscreen="true">
<div v-if="is_loading==false">




<ion-list v-if="row.length>0" style="margin:0;padding:0;">
<ion-item :button="true" detail="false" v-for="(r,key) in row" :key="key">
<div class="unread-indicator-wrapper" slot="start"></div>
<ion-label>
<ion-text>
<h4 style="font-weight:bold;">
{{ r.report.title }}
</h4>
</ion-text>
<br />
<ion-note color="medium" class="ion-text-wrap">
{{ r.message }}
</ion-note>
</ion-label><br/>
</ion-item>

</ion-list>

<div v-else style="padding:10px;text-align:center;">
No messages
</div>

</div>
<div v-else style="padding:30px;text-align:center;">
<loader-component/>
</div>





</ion-content>
</ion-page>
</template>
<script>
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
IonToolbar,
IonText
} from '@ionic/vue';
import { arrowBack } from 'ionicons/icons';
import LoaderComponent from '@/components/LoaderComponent.vue';
import database from '@/models/database';
export default{
components:{
IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonAvatar, IonItem, IonLabel, IonList, IonIcon,IonNote,IonSpinner,
IonButton, IonButtons,IonInput,IonSelect, IonSelectOption,
IonText,LoaderComponent
},
data(){return{
row:[],
is_loading:false,


}},


methods:{
async get(){
this.is_loading=true;
const data=database();
await data.from('message').select(
'message,created_at,report(title)')
.order('created_at', { ascending: false })
.then(response=>{
if(response.status==200){
this.is_loading=false;
this.row=response.data;
data.from('message').update({status:false}).eq('user_id',100)
.eq('status',true)
.then(res=>{
console.log(res);
}).catch(er=>{console.log(er)});
}else{
console.log(response.error);
}
}).catch(error=>{console.log(error)});
}

},

mounted(){
this.get();
},

setup() {
return { arrowBack};
}


}





</script>
