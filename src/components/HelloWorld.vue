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

        <div class="subheading font-weight-regular">
          <img :src="QRvalue">
        </div>

        <form id="myForm" method="post" action="http://localhost:5000/upload" enctype="multipart/form-data">
          <!-- <label for="file">Upload a file</label>
          <input class="mx-2" type="file" name="upload">
          <v-btn type="submit" class="primary">upload</v-btn> -->
          <input type="file" id="file" ref="file" name="upload" @change="initialFile">
          <v-btn @click="uploadFile" class="primary">upload</v-btn>
        </form>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-btn class="success" @click="generatePDF">Generate PDF</v-btn>
      <v-btn class="warning ml-2" @click="testQRcode">Generate QR-PDF</v-btn>
    </v-row>
    <div id="mainContent">
      <h1 class="red--text">Test text!!</h1>
      <p>
        Miusov, as a man man of breeding and deilcacy, could not but feel some inwrd qualms, when he reached the Father Superior's with Ivan: he felt ashamed of havin lost his temper. He felt that he ought to have disdaimed that despicable wretch, Fyodor Pavlovitch, too much to have been upset by him in Father Zossima's cell, and so to have forgotten himself. "Teh monks were not to blame, in any case," he reflceted, on the steps. "And if they're decent people here (and the Father Superior, I understand, is a nobleman) why not be friendly and courteous withthem? I won't argue, I'll fall in with everything, I'll win them by politness, and show them that I've nothing to do with that Aesop, thta buffoon, that Pierrot, and have merely been takken in over this affair, just as they have."
      </p>
      <p>
        He determined to drop his litigation with the monastry, and relinguish his claims to the wood-cuting and fishery rihgts at once. He was the more ready to do this becuase the rights had becom much less valuable, and he had indeed the vaguest idea where the wood and river in quedtion were.
      </p>
      <v-row>
        <v-img :src="value"></v-img>
      </v-row>
    </div>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import jsPDF from 'jspdf'
  import VanillaQR from "vanillaqr"

  export default {
    name: 'HelloWorld',

    data: () => ({
      value: '',
      QRvalue: '',
      size: 150,
      base64: '',
      file: '',
    }),
    methods: {
      initialFile () {
        this.file = this.$refs.file.files[0]
        const imageType = ["image/jpeg", "image/jpg", "image/png"]
        if (this.file.size > 500000) {
          alert("Too large, max size allowed is 500kb")
        } else if (imageType.includes(this.file.type)) {
          const reader = new FileReader()
          reader.onload = e => {
            this.value = e.target.result // แปลงเป็น base64 ใช้แสดงใน <img> และ เพิ่มรูปลงในไฟล์ pdf
          }
          reader.readAsDataURL(this.file)
        }
      },
      uploadFile () {
        const formData = new FormData()
        formData.append('file', this.file)
        axios.post('http://localhost:5000/upload', formData)
        .then(res => {
          console.log(res)
          this.testQRcode(res.data)
        })
        .catch(err => {
          console.log(err)
        })
      },
      generatePDF () {
        const doc = new jsPDF('p','pt','a4')
        const elementHTML = document.getElementById('mainContent')
        const specialElementHandlers = {
          '#elementH' : function () {
            return true
          }
        }
        doc.fromHTML(elementHTML, 15, 15, {
          'width': 170,
          'elementHandlers': specialElementHandlers
        })
        doc.addImage(this.value, 'JPEG', 15, 40, 180, 160) // import รูปเข้าไปใน pdf
        const pdfFile = new File([doc.output("blob")], "filename.pdf", {  type: "pdf" }) // แปลงให้เป็น blob ก่อนแล้วส่งค่าไปให้ backend เซฟ
        const formData = new FormData()
        formData.append("file", pdfFile)

        axios.post('/upload', formData, {
          baseURL: 'http://localhost:5000'
        })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      },
      testQRcode (dataURL) {
        // const data = document.getElementById('qq')
        // console.log(data)
        var qr = new VanillaQR({ // create QRcode
          url: dataURL,
        })
        const imageElement = qr.toImage("jpg") // convert QRcode to image
        this.QRvalue = imageElement.src
      }
    }
  }
</script>
