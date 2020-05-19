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

        <form method="post"  enctype="multipart/form-data" action="http://localhost:5000/upload">
          <label for="file">Upload a file</label>
          <input type="file" name="upload">
          <input type="submit" class="button">
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import QrcodeVue from 'qrcode.vue'
  import axios from 'axios'

  export default {
    name: 'HelloWorld',

    data: () => ({
      value: 'https://photoims.sgp1.digitaloceanspaces.com/photoims/vehicle.jpg',
      size: 150,
      fileData: null
    }),
    components: {
      QrcodeVue
    },
    methods: {
      initialFile (e) {
        const data = e.target.files[0]
        this.fileData = data
        console.log(this.fileData)
      },
      uploadFile () {
        axios({
          method:'post',
          url:'/upload',
          baseURL: 'http://localhost:5000',
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        });
      }
    }
  }
</script>
