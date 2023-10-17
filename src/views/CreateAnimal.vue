<template>
<ion-page>
<ion-header>
<ion-toolbar>
<ion-buttons slot="start">
<ion-button fill="clear" @click="$router.push('/tabs/tab1')">
<ion-icon slot="start" :icon="arrowBack"></ion-icon>
</ion-button>
</ion-buttons>
<ion-title size="medium" style="color:#1C6033;margin-right:100px;">Add animal</ion-title>
</ion-toolbar>
</ion-header>
<ion-content :fullscreen="true" >


<form @submit.prevent="submit" v-if="status==false" style="padding:40px;">
<div style="color:red;">
{{ error }}
</div>
<div>
<ion-label>
Name:
</ion-label>
<ion-input fill="outline" placeholder="Enter animal name" v-model="form.name" class="input">
</ion-input>
</div>

<div>
<ion-label>
Sex:
</ion-label>
<ion-select aria-label="Sex" placeholder="--Select animal sex--" v-model="form.gender" class="input">
<ion-select-option value="male">Male</ion-select-option>
<ion-select-option value="female">Female</ion-select-option>
</ion-select>

</div>


<div>
<ion-label>
Age:
</ion-label>
<ion-input type="number"  fill="outline" placeholder="Enter age" v-model="form.age" class="input"></ion-input>
</div>



<div>
<ion-label>
Breed:
</ion-label>
<ion-select aria-label="Breed" placeholder="--Select breed--" v-model="form.breed" class="input">
<ion-select-option value="local">Local</ion-select-option>
<ion-select-option value="exotic">Exotic</ion-select-option>
<ion-select-option value="cross">Cross</ion-select-option>
<ion-select-option value="other">Other</ion-select-option>
<!-- <ion-select-option value="">Extension wworker</ion-select-option> -->
</ion-select>

</div>

<div>
<ion-label>
Color:
</ion-label>
<ion-input l fill="outline" placeholder="Enter color" v-model="form.color" class="input"></ion-input>
</div>
<div>
<ion-label>
Weight:
</ion-label>
<ion-input type="number"  fill="outline" placeholder="Enter animal weight" v-model="form.weight" class="input"></ion-input>
</div>
<div>
<ion-label>
Origin:
</ion-label>
<ion-input label="Origin" fill="outline" placeholder="Enter animal origin" v-model="form.from" class="input"></ion-input>
</div>

<div>
<ion-label>
Tag:
</ion-label>
<ion-input  fill="outline" placeholder="Enter tag details" v-model="form.tag" class="input"></ion-input>
</div>

<div>
<ion-button color="success" expand="block" type="submit">Save</ion-button>
</div>
</form>


<!-- <success-message :message="message" v-else>
<ion-button @click="$router.push('/tabs/tab1');status=false;">OK</ion-button>
</success-message> -->


</ion-content>
</ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonAvatar, IonItem, IonLabel, IonList, IonIcon, IonNote, IonSpinner,
IonButton, IonButtons,IonInput,IonSelect, IonSelectOption } from '@ionic/vue';
import { arrowBack } from 'ionicons/icons';
import database from '@/models/database';
import SuccessMessage from '@/shared/SuccessMessage.vue';
export default{
components:{
IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonAvatar, IonItem, IonLabel, IonList, IonIcon,IonNote,IonSpinner,
IonButton, IonButtons,IonInput,IonSelect, IonSelectOption,
SuccessMessage
},
data(){return{
message:null,
error:null,
status:false,
is_loading:false,
form:{
name:'',
breed:'',
gender:'',
color:'',
weight:'',
from:'',
tag:'',
age:'',

}

}},


methods:{
async submit(){

if(this.form.name!='' &&
this.form.breed!='' &&
this.form.gender!='' &&
this.form.color!='' &&
this.form.weight!='' &&
this.form.from!='' &&
this.form.tag!=''){

this.error=null;
this.is_loading=true;

const data=database();
await data.from('animal').insert({
name:this.form.name,
breed:this.form.breed,
gender:this.form.gender,
color:this.form.color,
weight:this.form.weight,
from:this.form.from,
tag:this.form.tag,
age:this.form.age})
.select()
.then(response=>{
if(response.status=201){
console.log(response);
this.status=true;
this.form={};
this.message='Aminal record has been added.';
response.data.forEach(el=>{
this.$router.push('/animal/profile/'+el.id);
});
}else{
console.log(response.error);
}

}).catch(error=>{console.log(error)});
}else{
this.error='Fill in all fields.';
}
}

},

setup() {
return { arrowBack};
}


}





</script>
