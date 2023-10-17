<template>
<ion-page>
<ion-header>
<ion-toolbar>
<ion-buttons slot="start">
<ion-button fill="clear" @click="$router.push('/tabs/tab3')">
<ion-icon slot="start" :icon="arrowBack"></ion-icon>
</ion-button>
</ion-buttons>
<ion-title size="medium" style="color:#1C6033;margin-right:100px;">User profile</ion-title>
</ion-toolbar>
</ion-header>
<ion-content :fullscreen="true">

<ion-card v-if="is_loading==false && user!=null">
<ion-card-header>
<ion-card-title style="text-align:center;"><ion-icon :icon="person" style="font-size:50px;"></ion-icon> </ion-card-title>
<ion-card-title style="text-align:center;">{{ user.firstname }} {{ user.lastname }} </ion-card-title>
<ion-card-subtitle style="text-align:center;">
{{ user.role }}
</ion-card-subtitle>
</ion-card-header>
<ion-card-content>
<p style="text-align:center;text-transform:capitalize;">
{{ user.gender }}
</p>
<p style="text-align:center;">
{{ user.tel }}
</p>
<p style="text-align:center;">
{{ user.email }}
</p>

<div>
<form style="margin-top:50px;">
<ion-button fill="outline" expand="block">Edit</ion-button>
</form>
</div>
</ion-card-content>
</ion-card>

<div v-else style="text-align:center;">
<loader-component/>
</div>







</ion-content>
</ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSpinner,IonIcon,
IonButton, IonButtons,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
} from '@ionic/vue';
import { arrowBack, person } from 'ionicons/icons';
import database from '@/models/database';
import LoaderComponent from '@/components/LoaderComponent.vue';
export default{
components:{
IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonSpinner,IonButton, IonButtons,
IonIcon,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,LoaderComponent,
},
data(){return{
is_loading:false,
user:null,

}},


methods:{
async get_user(){
console.log(this.$route.params.id);
const data=database();
await data.from('users')
.select()
.match({ id: this.$route.params.id}).then(response=>{
if(response.status=200){
response.data.forEach(element=>{
this.user=element;
});
}else{
    console.log(response);
}
}).catch(error=>{console.log(error)});

}

},

setup() {
return { arrowBack,person};
},
mounted(){
this.get_user();
}


}





</script>
