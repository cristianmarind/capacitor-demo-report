<template>
  <section class="pt-4 px-3">
    <div @click="$router.go(-1)" class="text-left">
      <b-icon icon="arrow-left"></b-icon>
    </div>
    <div>
      <div class="form-group">
        <label for="inputTitle">Titulo del reporte</label>
        <input
          v-model="title"
          id="inputTitle"
          type="text"
          class="form-control"
        />
      </div>
      <div class="container-fluid">
        <div class="row">
          <span class="col">Capturas</span>
        </div>
        <div class="row">
          <div class="col-12">
            <img ref="image" :src="this.image" class="w-100 h-auto" />
          </div>
        </div>
      </div>
    </div>
    <div class="position-fixed icon">
      <b-dropdown
        id="dropdownCreateReport"
        size="lg"
        variant="link"
        toggle-class="text-decoration-none"
        rigth
        top
        no-caret
      >
        <template v-slot:button-content>
          <div class="bg-success p-4 rounded-circle">
            <b-icon class="text-light" icon="three-dots-vertical" />
          </div>
        </template>
        <b-dropdown-item @click="requestPicture">
          Nueva imagen
        </b-dropdown-item>
        <b-dropdown-item @click="createReport"> Guardar </b-dropdown-item>
      </b-dropdown>
    </div>
  </section>
</template>

<script>
import {
  Capacitor,
  Plugins,
  FilesystemDirectory,
  CameraResultType,
  Storage 
} from "@capacitor/core";

const { Filesystem, Camera, Toast } = Plugins;

export default {
  data() {
    return {
      title: "",
      image: ""
    };
  },
  methods: {
    async requestPicture() {
      const path = `${Date.now()}.jpeg`;
      try {
        const originalPhoto = await Camera.getPhoto({
          allowEditing: false,
          saveToGallery: false,
          resultType: CameraResultType.DataUrl,
        });
        const img = originalPhoto.dataUrl;
        let savedPhotoFile;
        if (Capacitor.getPlatform() === "web") {
          savedPhotoFile = img;
        } else {
          await Filesystem.appendFile({
            path: path,
            data: img,
            directory: FilesystemDirectory.Documents,
          });
          const res = await Filesystem.getUri({
            path: path,
            directory: FilesystemDirectory.Documents,
          });
          savedPhotoFile = Capacitor.convertFileSrc(res.uri);
        }
        this.image = savedPhotoFile;
      } catch (error) {
        console.log(error);
      }
    },
    async createReport() {
      const IMG_WIDTH = 800,
        IMG_HEIGHT = (this.$refs.image.height * IMG_WIDTH)/this.$refs.image.width;
      let canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 1000
      canvas.height = 1500
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "50px Georgia";
      ctx.fillStyle = "#000";
      ctx.fillText(this.title, 50, 50);
      ctx.drawImage(this.$refs.image, 0, 200, IMG_WIDTH, IMG_HEIGHT);
      let newImg = canvas.toDataURL("image/jpeg", 100);
      const path = `${Date.now()}.jpeg`;
      if (Capacitor.getPlatform() === "web") {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = window.URL.createObjectURL(
          this.b64toBlob(newImg)
        );
        a.download = path;
        a.click();
      } else {
        await Filesystem.appendFile({
          path: path,
          data: newImg,
          directory: FilesystemDirectory.Documents,
        });
        await Toast.show({
          text: `Archivo guardado en el directorio ${FilesystemDirectory.Documents}`
        });
      }
      this.saveReport(this.title,  this.image)
      this.title = ''
      this.image = ''
    },
    async saveReport(title, image){
      const ret = await Storage.get({ key: 'reports' });
      const reports = JSON.parse(ret.value)
      const newReport = {
        title: title,
        image: image
      }
      const newReports = Array.isArray(reports)?reports.concat(newReport):[newReport]
      await Storage.set({
        key: 'reports',
        value: JSON.stringify(newReports)
      });
    },
    //https://stackoverflow.com/questions/27980612/converting-base64-to-blob-in-javascript/27980815
    b64toBlob(dataURI) {
      var byteString = atob(dataURI.split(",")[1]);
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: "image/jpeg" });
    },
  },
};
</script>

<style>
.icon {
  bottom: 1em;
  right: 1em;
}
#dropdownCreateReport .dropdown-menu.show {
  position: absolute !important;
  right: 0 !important;
  left: auto !important;
}
</style>