<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Test QR-Code
        </h1>

        <p class="subheading font-weight-regular">
          <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import QrcodeVue from 'qrcode.vue'
  export default {
    name: 'HelloWorld',

    data: () => ({
      value: 'https://firebasestorage.googleapis.com/v0/b/vtil-lao.appspot.com/o/10000095__ironman_1920xip_list-wallpaper-1920x1080.jpg.webp?alt=media&token=b86a5197-e6a2-48eb-81f5-1af1d383d226',
      size: 150
    }),
    components: {
      QrcodeVue
    }
  }
</script>
