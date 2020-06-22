<template>
  <v-container>
    <v-card class="mx-auto px-3" id="content">
      <v-row class="text-center">
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
            <v-btn v-if="value!==''" @click="uploadFile" class="primary">upload</v-btn>
          </form>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn class="success" @click="uploadPDFtoSpaces">Upload PDF to Spaces</v-btn>
        <v-btn class="warning ml-2" @click="generatePDFwithQRcode">Generate QR-PDF</v-btn>
        <v-btn class="primary ml-2" @click="generatePDFwithHtml2Canvas">Generate PDF with html2canvas</v-btn>
      </v-row>
      <div style="width: 595px; height: 841px" class="primary mx-auto" id="mainContent">
        <h1 class="red--text">Test text!!</h1>
        <p>
          Miusov, ໃນຖານະເປັນຜູ້ຊາຍໃນການປັບປຸງພັນແລະຄວາມເສີຍເມີຍ, ບໍ່ສາມາດຮູ້ສຶກເຖິງຄຸນນະວຸດທິບາງຢ່າງ, ໃນເວລາທີ່ລາວໄດ້ເຂົ້າຫາພໍ່ຂອງຊັ້ນສູງກັບ Ivan: ລາວຮູ້ສຶກວ່າຜີຂອງຄວາມຫຼົງໄຫຼຈະສູນເສຍຄວາມໃຈຮ້າຍ. ລາວຮູ້ສຶກວ່າລາວຄວນຈະປະຕິເສດການດູຖູກທີ່ ໜ້າ ກຽດຊັງ, Fyodor Pavlovitch, ຫຼາຍເກີນໄປທີ່ຈະເຮັດໃຫ້ລາວເສີຍເມີຍໃນຫ້ອງຂອງພໍ່ Zossima, ແລະດັ່ງນັ້ນຈິ່ງລືມຕົວເອງ. "ກ່າວເຖິງພະສົງສາມະເນນ, ບໍ່ແມ່ນການ ຕຳ ນິ, ໃນກໍລະນີໃດກໍ່ຕາມ," ລາວກ່າວປະນາມໃນຂັ້ນຕອນ. "ແລະຖ້າພວກເຂົາເປັນຄົນທີ່ມີກຽດຢູ່ທີ່ນີ້ (ແລະພໍ່ຂອງຂ້ອຍດີກວ່າ, ຂ້ອຍເຂົ້າໃຈວ່າເປັນຄົນສູງສົ່ງ) ເປັນຫຍັງບໍ່ເປັນມິດແລະສຸພາບກັບຂ້ອຍ? ຂ້ອຍຈະບໍ່ໂຕ້ຖຽງ, ຂ້ອຍຈະຕົກຢູ່ໃນທຸກສິ່ງທຸກຢ່າງ, ຂ້ອຍຈະຊະນະພວກເຂົາໂດຍ. ການເມືອງ, ແລະສະແດງໃຫ້ພວກເຂົາເຫັນວ່າຂ້ອຍບໍ່ມີຫຍັງກ່ຽວຂ້ອງກັບ Aesop, buffta thta, ວ່າ Pierrot, ແລະໄດ້ຮັບຄວາມສົນໃຈໃນເລື່ອງນີ້, ຄືກັບທີ່ພວກເຂົາມີ. "
        </p>
        <p>
          ລາວຕັ້ງໃຈທີ່ຈະປະຕິເສດຄະດີຂອງຕົນກັບພະລາຊະວັງ, ແລະແກ້ໄຂ ຄຳ ຮຽກຮ້ອງຂອງລາວຕໍ່ການຕັດໄມ້ແລະການປະມົງໃນເວລາດຽວກັນ. ລາວມີຄວາມພ້ອມຫຼາຍທີ່ຈະເຮັດສິ່ງນີ້ເພາະວ່າສິດທິຕ່າງໆໄດ້ກາຍເປັນສິ່ງທີ່ມີຄ່າ ໜ້ອຍ ກວ່າເກົ່າ, ແລະລາວມີຄວາມຄິດທີ່ບໍ່ແນ່ນອນທີ່ໄມ້ແລະແມ່ນ້ ຳ ໃນການອ້າງ.
        </p>
        <v-row>
          <v-img :src="value"></v-img>
        </v-row>
      </div>
    </v-card>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import jsPDF from 'jspdf'
  import VanillaQR from "vanillaqr"
  import html2canvas from 'html2canvas'

  export default {
    name: 'HelloWorld',

    data: () => ({
      value: '',
      QRvalue: '',
      size: 150,
      base64: '',
      file: '',
      qrUrl: 'https://photoims.sgp1.digitaloceanspaces.com/photoims/H_laos%20logo.png'
    }),
    methods: {
      initialFile () {
        this.file = this.$refs.file.files[0]
        const imageType = ["image/jpeg", "image/jpg", "image/png"]
        if (this.file.size > 500000) {
          alert("Too large, max size allowed is 500kb")
          document.getElementById('file').value = ''
          this.value = ''
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
          this.qrUrl = res.data
          this.generateQRcode()
        })
        .catch(err => {
          console.log(err)
        })
      },
      uploadPDFtoSpaces () {
        const doc = new jsPDF('p','pt','a4')
        const elementHTML = document.getElementById('content')
        const specialElementHandlers = {
          '#elementH' : function () {
            return true
          }
        }
        doc.fromHTML(elementHTML, 15, 15, {
          'width': 550,
          'elementHandlers': specialElementHandlers
        })
        
        // upload generate to pdf and upload to server
        const pdfFile = new File([doc.output("blob")], "filename.pdf", {  type: "pdf" }) // แปลงให้เป็น blob ก่อนแล้วส่งค่าไปให้ backend เซฟ
        const formData = new FormData()
        formData.append("file", pdfFile)
        axios.post('/upload', formData, {
          baseURL: 'http://localhost:5000'
        })
        .then(res => {
          console.log(res)
          this.qrUrl = res.data
          this.generateQRcode()
        })
        .catch(err => {
          console.log(err)
        })
      },
      generatePDFwithQRcode () {
        var qr = new VanillaQR({ // create QRcode
          url: this.qrUrl
        })
        const imageElement = qr.toImage("jpg") // convert QRcode to image
        this.QRvalue = imageElement.src
        
        const doc = new jsPDF('p','pt','a4')
        const width = doc.internal.pageSize.getWidth()
        const elementHTML = document.getElementById('content')
        const specialElementHandlers = {
          '#elementH' : function () {
            return true
          }
        }
        doc.fromHTML(elementHTML, 10, 10, {
          'width': width,
          'elementHandlers': specialElementHandlers
        })
        doc.addImage(imageElement.src, 'JPEG', (width/2)-80, 350, 150, 150) // import รูปเข้าไปใน pdf
        doc.save('test.pdf')
      },
      generatePDFwithHtml2Canvas () {
        html2canvas(document.getElementById('mainContent')).then(canvas => {
          const img = canvas.toDataURL('image/png')
          const doc = new jsPDF('p','pt','a4')
          const width = doc.internal.pageSize.getWidth()
          const height = doc.internal.pageSize.getHeight()
          doc.addImage(img, 'PNG', 0, 10, width, height)
          doc.save('test-test.pdf')
          console.log(`width = ${width} px, height =${height} px`)
          // console.log(img)
        })
        // const doc = new jsPDF('p','pt','a4')
        // const width = doc.internal.pageSize.getWidth()
        // const elementHTML = document.getElementById('mainContent')
        // const specialElementHandlers = {
        //   '#elementH' : function () {
        //     return true
        //   }
        // }
        // doc.fromHTML(elementHTML, 10, 10, {
        //   'width': width,
        //   'elementHandlers': specialElementHandlers
        // })
        // doc.text('ສະບາຍດີ!', 10, 10)
        // doc.save('test.pdf')
      },
      generateQRcode () {
        var qr = new VanillaQR({ // create QRcode
          url: this.qrUrl
        })
        const imageElement = qr.toImage("jpg") // convert QRcode to image
        this.QRvalue = imageElement.src
      }
    }
  }
</script>
