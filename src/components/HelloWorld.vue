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

        <form id="myForm" method="post" action="http://localhost:5000/upload" enctype="multipart/form-data">
          <label for="file">Upload a file</label>
          <!-- <input type="file" name="upload">
          <v-btn type="submit" class="primary">upload</v-btn> -->
          <input type="file" id="file" ref="file" name="file" @change="initialFile">
          <v-btn @click="uploadFile" class="primary">upload</v-btn>
        </form>

        <v-img src="https://photoims.sgp1.digitaloceanspaces.com/photoims/vehicle.jpg"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import QrcodeVue from 'qrcode.vue'
  // import axios from 'axios'

  export default {
    name: 'HelloWorld',

    data: () => ({
      value: 'https://photoims.sgp1.digitaloceanspaces.com/photoims/vehicle.jpg',
      size: 150,
      file: ''
    }),
    components: {
      QrcodeVue
    },
    methods: {
      initialFile () {
        this.file = this.$refs.file.files[0]
        console.log(this.file)
      },
      uploadFile () {
        const myForm = document.getElementById('myForm')
        const formData = new FormData(myForm)
        // formData.append('file', this.file)
        console.log(formData)
      //   axios.post('/upload', formData, {
      //     baseURL: 'http://localhost:5000'
      //   })
      //   .then(res => {
      //     console.log(res)
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
      }
    }
  }
</script>
