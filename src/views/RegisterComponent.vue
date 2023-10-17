<template>
<div>
<form @submit.prevent="submit" v-if="status==false">
<div style="color:red;">
{{ error }}
</div>
<div>
<ion-label>First name:</ion-label>
<ion-input  fill="outline" placeholder="Enter first name" v-model="form.firstname" class="input" ></ion-input>
</div>
<div>
    <ion-label>Last name:</ion-label>
<ion-input class="input"  fill="outline" placeholder="Enter last name" v-model="form.lastname"></ion-input>
</div>

<div>
    <ion-label>Gender:</ion-label>
<ion-select aria-label="Select" placeholder="--Select--" v-model="form.gender" class="input">
<ion-select-option value="male">Male</ion-select-option>
<ion-select-option value="female">Female</ion-select-option>
</ion-select>

</div>

<div>
    <ion-label>Telephone number:</ion-label>
<ion-input type="number"  fill="outline" placeholder="Enter telephone number" v-model="form.tel" class="input"></ion-input>
</div>
<div>
    <ion-label>Email address:</ion-label>
<ion-input class="input" fill="outline" placeholder="Enter email address" v-model="form.email"></ion-input>
</div>

<div>
<ion-label>Password:</ion-label>
<ion-input class="input" type="password" fill="outline" placeholder="Enter password" v-model="form.pass"></ion-input>
</div>

<div>
<ion-button color="success" expand="block" type="submit">Register</ion-button>
</div>
</form>
<success-message v-else :message="'Registered Successfully. Verification link has been sent to your email.'"/>
</div>
</template>

<script>
import { logoIonic } from 'ionicons/icons';
import {IonInput,IonButton,IonSelect, IonSelectOption, IonLabel } from '@ionic/vue';
import database from '@/models/database';
import SuccessMessage from '@/shared/SuccessMessage.vue';
export default{
components:{IonInput,IonButton,IonSelect, IonSelectOption,
SuccessMessage,IonLabel
},
props:{
screen:{}
},
setup() {
return { logoIonic };
},
data(){return{
status:false,
error:null,
form:{
firstname:'',
lastname:'',
gender:'',
tel:'',
email:'',
pass:'',

}


}},
methods:{
submit(){
if(this.form.firstname!='' && this.form.lastname!='' && this.form.gender && this.form.tel!='' && this.form.email!='' && this.form.pass!=''){
this.error=null;
const data=database();
data.auth.signUp(
{
email:this.form.email,
password: this.form.pass,
options: {
data: {
firstname:this.form.firstname,
lastname:this.form.lastname,
gender:this.form.gender,
tel:this.form.tel,
role:'admin',
},
emailRedirectTo:'https://docs.google.com/document/d/1OxkLSLd00LnaYSJ63eFtC7QGYL4MdRsotAOltwfZPUA/edit?usp=sharing'
}
}
).then(response=>{
console.log(response);
this.status=true;
}).catch(error=>{this.error='Check your internet connection please.'});
}else{
this.error='Fill in all fields.';
}
}

}



}
</script>
