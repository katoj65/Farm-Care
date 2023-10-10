<template>
<ion-app>
<ion-router-outlet v-if="login==true"/>
<login-page v-else/>
</ion-app>
</template>
<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import LoginPage from '@/views/LoginPage.vue';
import database from './models/database.js';
export default {
components:{
LoginPage,
IonApp, IonRouterOutlet
},
data(){return{
login:false,
}},

//
methods:{
user_session(){
this.login=false;
const data=database();
data.auth.getSession().then(response=>{
// console.log(response.data.session);
const er=response.error;
console.log(er);
if(er==null){
this.login=false;
const user=response.data.session.user.user_metadata;
this.$store.state.user=user;
console.log(response);
}else{
this.login=false;
}
}).catch(error=>{console.log(error);});
}
},
mounted(){
this.user_session();
}




}



</script>
