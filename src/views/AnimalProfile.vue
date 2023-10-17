<template>
<ion-page>
<ion-header>
<ion-toolbar>
<ion-buttons slot="start">
<ion-button fill="clear" @click="$router.push('/')">
<ion-icon slot="start" :icon="arrowBack"></ion-icon>
</ion-button>
</ion-buttons>

<ion-buttons slot="end">
<ion-button fill="clear" @click="show=true">
Add
</ion-button>
</ion-buttons>



<ion-title size="medium" style="color:#1C6033;margin-right:100px;">Animal</ion-title>
</ion-toolbar>
</ion-header>
<ion-content :fullscreen="true">





<div v-if="is_loading==false && user!=null">
<ion-card  style="box-shadow:none;">
<ion-card-header>
<ion-card-title style="text-align:center;">
<img alt="" :src="'/cow.png'" />
</ion-card-title>
<ion-card-title style="text-align:center;">{{ user.name }}</ion-card-title>
<ion-card-subtitle style="text-align:center;">
{{ user.color }}
</ion-card-subtitle>
</ion-card-header>
<ion-card-content>
<p style="text-align:center;text-transform:capitalize;">
{{ user.gender }}
</p>
<p style="text-align:center;">
{{ user.breed }} breed
</p>
<p style="text-align:center;">
{{ user.age }} years old
</p>
<p style="text-align:center;">
Weighs {{ user.weight }} KGs
</p>

<p style="text-align:center;">
Tag Number: {{ user.tag }}
</p>

<p style="text-align:center;">
 Originates from   {{ user.from }}
    </p>
</ion-card-content>
<ion-content>
</ion-content>
</ion-card>



<div style="border-radius:20px 20px 0 0;padding:10px;min-height:300px;background:#F8F9F9 ;" v-if="user.animal_report.length>0">
<ion-list :inset="false" style="border-radius:20px;padding-bottom:20px;">
    <ion-item  v-for="(r,key) in user.animal_report" :key="r.id">

      <ion-label>{{ r.item }}<br/>


        <ion-note color="medium">{{ r.created_at.substring(0,10).split('-').reverse().join('-') }} </ion-note></ion-label>

      <ion-note slot="end" style="font-size:16px;">{{ r.description }} </ion-note>

    </ion-item>

  </ion-list>

</div>


</div>
<div v-else style="text-align:center;padding:30px;">
<loader-component/>
</div>























</ion-content>









<div style="border:solid thin silver;height:60%;position:fixed;background:white;bottom:0;width:100%;border-radius: 10px 10px 0 0;box-shadow: 10px 10px 10px 10px;" v-if="show==true">
<div style="padding:10px;padding-top:0;">
<h4>
Animal report
<ion-button style="float:right;" fill="clear" size="small" @click="show=false">Cancel</ion-button>
</h4>
</div>
<form @submit.prevent="submit">
<div v-if="error!=null" style="color:red;padding:5px;text-align:center;">
{{ error }}
</div>


<ion-item>
<ion-select label="Activity" placeholder="--Select--" v-model="form.item">
<ion-select-option :value="n.name" v-for="(n,key) in select" :key="key">{{ n.name }} </ion-select-option>
</ion-select>
</ion-item>

<ion-item>
<ion-input placeholder="Enter report item" v-model="form.description"></ion-input>
</ion-item>
<div style="margin:10px;">
<ion-button size="medum" type="submit" expand="block" color="success">Save</ion-button>
</div>


</form>




</div>








</ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSpinner,IonIcon,
IonButton, IonButtons,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
IonItem,
IonLabel,
IonList,
IonNote,
IonText,
IonInput,
IonSelect, IonSelectOption

} from '@ionic/vue';
import { arrowBack, person } from 'ionicons/icons';
import database from '@/models/database';
import LoaderComponent from '@/components/LoaderComponent.vue';
export default{
components:{
IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonSpinner,IonButton, IonButtons,
IonIcon,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,LoaderComponent,
IonItem,
IonLabel,
IonList,
IonNote,
IonText,
IonInput,
IonSelect, IonSelectOption

},
data(){return{
is_loading:false,
user:null,
show:false,
error:null,
tag:null,
//
select:[
{name:'Feeding'},
{name:'Immunized'},
{name:'Gestation'},
{name:'Offsprings'},
{name:'Disease'},
{name:'Dewormed'},
{name:'Bought'},
{name:'Sold'},
{name:'Slaughtered'},
{name:'Dehorned'},
{name:'Castrated'}

],
form:{
item:'',
description:'',
animal_id:null,

}



}},


methods:{
async get_user(){
console.log(this.$route.params.id);
const data=database();
await data.from('animal')
.select('*,animal_report(*)')
.order('created_at', { foreignTable: 'animal_report', ascending: false })
.match({ id: this.$route.params.id})
.then(response=>{
if(response.status=200){
response.data.forEach(element=>{
this.user=element;
this.form.animal_id=element.id;
this.tag=element.tag;
});
}else{
    console.log(response);
}
}).catch(error=>{console.log(error)});

},

//
submit(){
this.error=null;
if(this.form.item!='' && this.form.description!=''){
const data=database();
data.from('animal_report').insert({animal_id:this.form.animal_id,item:this.form.item,description:this.form.description})
.select()
.then(response=>{
if(response.status==201){
//send to report
data.from('report').insert({title:this.form.item,
description:this.form.description,
user_role:this.$store.state.user.role,
tag:this.tag,
user_id:this.$store.state.id
})
.then(res=>{
console.log(res)
}).catch(c=>{console.log(c)});
response.data.forEach(element=>{
this.show=false;
this.form={};
this.$router.push('/animal/profile/'+element.animal_id);
});
}else{
this.error=response.status;
}

})
.catch(err=>{console.log(err)});

}else{
this.error='Fill in all fields';
}
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
<style scoped>
p{text-transform: capitalize;}
</style>