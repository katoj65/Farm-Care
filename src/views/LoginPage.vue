<template>
<div>
<ion-content :fullscreen="true" class="ion-padding">
<div style="text-align:center;margin-top:50px;">
<ion-icon :icon="logoIonic" size="large"></ion-icon>
</div>
<h1 style="text-align:center;">FARM CARE</h1>
<h6 style="text-align:center;">{{ screen=='login'?'Login':'Sign Up' }} </h6>


<ion-card style=" margin-top:50px;">
<ion-card-header v-if="screen=='login'">
<ion-card-subtitle v-if="error!=null" style="color:red">{{ error }} </ion-card-subtitle>
</ion-card-header>
<ion-card-content style="padding:30px;">
<form  v-if="screen=='login'" @submit.prevent="submit">
<div>
<ion-label>Email Address:</ion-label>
<ion-input class="input" fill="outline" placeholder="Enter email address" v-model="form.email"></ion-input>
</div>
<div>
<ion-label>Password:</ion-label>
<ion-input fill="outline" placeholder="Enter password" v-model="form.pass" ></ion-input>
</div>
<div>

<ion-button color="success" expand="block" type="submit">Login</ion-button>
</div>
</form>
<register-component v-else-if="screen=='register'" :screen="screen"/>
<div style="margin-top:10px;">
 <ion-button color="light" expand="block" @click="screens()"> {{ screen=='login'?'Create Account':'Login'}}    </ion-button>
</div>
</ion-card-content>
</ion-card>
</ion-content>
</div>
</template>
<script>

import { IonContent,IonIcon,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,IonInput,IonButton,IonLabel  } from '@ionic/vue';
import { logoIonic,} from 'ionicons/icons';
import database from '@/models/database';
import RegisterComponent from './RegisterComponent.vue';
export default {

components:{
IonContent,
IonIcon,
IonCard,
IonCardContent,
IonCardHeader,
IonCardSubtitle,
 IonCardTitle,
IonInput,
IonButton,
RegisterComponent,
IonLabel,

},

setup() {
return { logoIonic };
},

data(){return{
screen:'login',
error:null,
form:{
email:'katoj65@gmail.com',
pass:'1234567890'
}


}},

methods:{
//
submit(){
if(this.form.email!='' && this.form.pass!=''){
const data = database();
data.auth.signInWithPassword({
email: this.form.email,
password: this.form.pass,
}).then(response=>{
const er=response.error;
if(er==null){
const user=response.data.user.user_metadata;
console.log(user);
this.$store.state.user=user;
//
data.from('users').select('email').match({email:this.form.email}).then(res=>{
if(res.error==null){
const count=res.data;
if(count.length==0){
//
data.from('users').insert({
firstname:user.firstname,
lastname:user.lastname,
gender:user.gender,
tel:user.tel,
email:this.form.email,
role:user.role
}).then(res=>{console.log(res)



}).catch(e=>{

console.log(e)


});
}
}
}).catch(e=>{console.log(e)});
this.$router.push('/');


}else{
this.error=er;
}
}).catch(error=>{console.log(error);});
}else{
this.error='Fill in your email address and passord';
}
},




//
screens(){
if(this.screen=='login'){
this.screen='register';
}else if(this.screen=='register'){
this.screen='login';
}
}



}

}
</script>