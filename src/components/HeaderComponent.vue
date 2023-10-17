<template>
<ion-toolbar>
<ion-buttons slot="secondary">
<ion-button fill="outline">
<ion-icon slot="start" :icon="star"></ion-icon>
Star
</ion-button>
</ion-buttons>
<ion-buttons slot="primary">
<ion-button fill="outline">
Edit
<ion-icon slot="end" :icon="create"></ion-icon>
</ion-button>
</ion-buttons>
<ion-title>Outline Buttons</ion-title>
</ion-toolbar>
</template>

<script>
import { IonButton, IonButtons, IonIcon, IonTitle, IonToolbar } from '@ionic/vue';
import { create, ellipsisHorizontal, ellipsisVertical, helpCircle, search, personCircle, star } from 'ionicons/icons';
export default {
components:{
IonButton, IonButtons, IonIcon, IonTitle, IonToolbar
},
setup() {
return { create, ellipsisHorizontal, ellipsisVertical, helpCircle, search, personCircle, star };
}

}
</script>