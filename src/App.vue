<template>
<ion-app>
<div v-if="is_loading==false">
<ion-router-outlet v-if="$store.state.user!=null"/>
<ion-page v-else style="height:650px;">
<login-page />
</ion-page>
</div>
<div v-else style="text-align:center;padding:30px">
<loader-component />
</div>
</ion-app>
</template>
<script>
import { useBackButton, useIonRouter } from '@ionic/vue';
import { App } from '@capacitor/app';
import { IonApp, IonRouterOutlet,IonPage } from '@ionic/vue';
import LoginPage from '@/views/LoginPage.vue';
import database from './models/database.js';
import LoaderComponent from './components/LoaderComponent.vue';
export default {
components:{
LoginPage,
IonApp,
IonRouterOutlet,
LoaderComponent,IonPage
},


setup() {
const ionRouter = useIonRouter();
useBackButton(-1, () => {
if (!ionRouter.canGoBack()) {
App.exitApp();
}
});
},


data(){return{
login:false,
is_loading:false,
}},

//
methods:{
user_session(){
this.is_loading=true;
this.login=false;
const data=database();
data.auth.getUser().then(response=>{
// console.log(response);
if(response.error==null){
// console.log(response.data.user.email);
this.$store.state.user=response.data.user.user_metadata;
this.$store.state.email=response.data.user.email;
this.login=true;
// console.log(this.login);
data.from('users').select().match({email:this.$store.state.email}).then(res=>{
console.log(res.data)
res.data.forEach(element => {
this.$store.state.role=element.role;
this.$store.state.firstname=element.firstname;
this.$store.state.id=element.id;
this.is_loading=false;
});
//get messages
data.from('message').select('*', { count: 'exact'}).then(res1=>{
if(res1.status==200){
this.$store.state.count_message=res1.data.length;
}else{
console.log(res1.error);
}
}).catch(er=>{console.log(er)});
}).catch(er=>{console.log(er);
    this.is_loading=false;
});


}else{
this.login=false;
this.is_loading=false;
}
}).catch(error=>{
console.log(error);
this.log=false;
this.is_loading=false;
});
}


},
mounted(){
this.user_session();
},




}



</script>
<style>

ion-input.input, ion-textarea.input {
padding:15px;
--padding-end: 15px;
--padding-start: 15px;
--border:solid thin silver;
--margin-top:10px;
--margin-bottom:5px;
border-radius: 5px;
margin-top:10px;

}

ion-select.input{

    padding:10px;
    --padding-end: 15px;
    --padding-start: 15px;
    border:solid thin silver;
    --margin-top:5px;
    --margin-bottom:5px;
    border-radius: 5px;
    margin-top:10px;
}




form div{
margin-bottom:10px;
}

ion-label{
--margin-bottom:5px;
--padding-bottom:10px;
}
</style>