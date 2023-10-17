<template>
<ion-page>
<ion-header>
<ion-toolbar>
<ion-buttons slot="start">
<ion-button fill="clear" @click="$router.push('/tabs/tab1')">
<ion-icon slot="start" :icon="arrowBack"></ion-icon>
</ion-button>
</ion-buttons>
<ion-title size="medium" style="color:#1C6033;margin-right:100px;">Settings</ion-title>
</ion-toolbar>
</ion-header>
<ion-content :fullscreen="true" >


<ion-list :inset="true">
<ion-item>
<ion-label>Name</ion-label>
<ion-note slot="end">
{{ $store.state.user.firstname }} {{ $store.state.user.lastname }}
</ion-note>
</ion-item>

<ion-item>

<ion-label>Gender</ion-label>
<ion-note slot="end">
{{ $store.state.user.gender }}
</ion-note>
</ion-item>


<ion-item>
<ion-label>Tel</ion-label>
<ion-note slot="end">
{{ $store.state.user.tel }}
</ion-note>
</ion-item>


<ion-item>
<ion-label>Email</ion-label>
<ion-note slot="end">
{{ $store.state.email }}
</ion-note>
</ion-item>


<ion-item>
    <ion-label>Role</ion-label>
    <ion-note slot="end">
    {{ $store.state.user.role }}
    </ion-note>
    </ion-item>

</ion-list>


<div style="padding:20px;">
<ion-button size="small" expand="block" @click="logout()" fill="outline">Logout</ion-button>
</div>


</ion-content>
</ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonAvatar, IonItem, IonLabel, IonList, IonIcon, IonNote, IonSpinner,
IonButton, IonButtons,  } from '@ionic/vue';
import { arrowBack } from 'ionicons/icons';
import database from '@/models/database';

export default{
components:{
IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonAvatar, IonItem, IonLabel, IonList, IonIcon,IonNote,IonSpinner,
IonButton, IonButtons,
},
data(){return{

}},

methods:{
logout(){
const data=database();
data.auth.signOut().then(response=>{
if(response.error==null){
this.$store.state.user=null;
this.$router.push('/');
}else{
alert('error has occurred');
}
}).catch(error=>{
console.log(error);
})
}

},

setup() {
return { arrowBack};
}


}





</script>
<style scoped>
ion-note{
--font-size:15px;
font-size: 15px;
}
</style>